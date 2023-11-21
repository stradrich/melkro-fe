<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable';
import '@mdi/font/css/materialdesignicons.css'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiPencil, mdiDelete, mdiAccount} from '@mdi/js';

import { ref, watchEffect, onMounted } from 'vue';
import Navbar from '../../components/Navbar.vue';
import Footer from '../../components/Footer.vue';
import DropdownMenu2 from '../../components/DropdownMenu2.vue';
import Button from '../../components/Button.vue';
// import { mdiAccount } from '@mdi/js'
// import { aliases, mdi } from 'vuetify/iconsets/mdi'
// import UserIcon from '../../components/icons/UserIcon'


import { useAuthStores } from '../../stores/auth';
import { useUserStores } from '../../stores/user';
import { useListingStores } from '../../stores/listing';
import { useBookingStores } from '../../stores/booking';
import { usePaymentStores } from '../../stores/payment'
import { useAdminStores } from '../../stores/admin'

import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

import axios from 'axios';

const authStore = useAuthStores();
const userStore = useUserStores();
const listingStore = useListingStores();
const bookingStore = useBookingStores();
const paymentStore = usePaymentStores();
const adminStore = useAdminStores();

const userMajor = ref('');
const generalData = ref([]);


onMounted(async () => {
  
  try {
    const count = await countBookingsByLoggedInUser();
    numberOfBookings.value = count;
    console.log(`The logged-in user has ${count} bookings.`);

    const usersData = await getAllUsers();
    const listingsData = await getAllListings();
    const bookingsData = await getAllBookings();
    const timeslotsData = await getAllTimeslots();
    const paymentsData = await getAllPayments();

    console.log(`User Data`, usersData);
    console.log(`Listing Data`, listingsData);
    console.log(`Booking Data`, bookingsData);
    console.log(`Timeslot Data`, timeslotsData);
    console.log(`Payment Data`, paymentsData);


    const userId = authStore.currentUser?.id;
    console.log('User ID:', userId);
    userMajor.value = await getUserMajor(userId);
    console.log('User Major:', userMajor.value);

    // Fetch user major
    userMajor.value = await getUserMajor(authStore.currentUser?.id, usersData);
    console.log(userMajor);
    

    let filteredBookingsData = [];

    const userRole = authStore.currentUser?.role;
    const userCurrentID = authStore.currentUser?.id;
 

    if (userRole === 'musician') {
      // If the user is a musician, filter bookings by their user_id
      filteredBookingsData = bookingsData.filter(b => b.user_id === userCurrentID);
    } else {
      // If the user is an admin or provider, fetch all bookings
      filteredBookingsData = [...bookingsData];
    }


    const generalDataPromises = filteredBookingsData.map(async (booking) => {
      const listing = listingsData.find(l => l.listing_id === booking.listing_id);

      const userProviderId = getuserIDbyListingID(listing.listing_id, listingsData);
      console.log('Listing ID:', listing.listing_id);
      console.log('Provider ID:', userProviderId);

      console.log('All Users:', usersData);

      let providerName;
      try {
        // Assuming you want to get the username using userProviderId
        providerName = await getUserNameByUserId(userProviderId);
        console.log('Provider ID:', userProviderId);
        console.log('Provider name:', providerName);
      } catch (error) {
        console.error(error);
      }

      const paymentID = getPaymentIDByBookingID(booking.booking_id, paymentsData);
      console.log('Payment ID:', paymentID);
      const payment = paymentID !== 'N/A' ? await getPaymentByID(paymentID, paymentsData) : {};
      console.log('Payment details:', payment);


      const paymentStatus = getPaymentStatus(booking.booking_id, paymentsData);
      

      return {
        paymentID: payment.payment_id || 'N/A',
        paymentStatus: paymentStatus,
        bookingID: booking.booking_id,
        listingID: booking.listing_id,
        listing: listing ? listing.name : 'N/A',
        check_in: new Date(booking.check_in).toLocaleString(),
        check_out: new Date(booking.check_out).toLocaleString(),
        ownerID: listing.user_id,
        owner: providerName || 'N/A',
        bookingStatus: booking.status,
        edit: 'mdiPencil',
        delete: 'mdiDelete',
      };
    });

    generalData.value = await Promise.all(generalDataPromises);

    console.log(`General Data`, generalData);
    console.log(authStore.currentUser);
    console.log(numberOfBookings.value);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});


// onMounted(async () => {
//   try {
//     const count = await  countBookingsByLoggedInUser();
//     numberOfBookings.value = count;
//     console.log(`The logged-in user has ${count} bookings.`);


//     const usersData = await getAllUsers();
//     const listingsData = await getAllListings();
//     const bookingsData = await getAllBookings();
//     const timeslotsData = await getAllTimeslots();
//     const paymentsData = await getAllPayments();

//     console.log(`User Data`, usersData);
//     console.log(`Listing Data`,listingsData);
//     console.log(`Booking Data`, bookingsData);
//     console.log(`Timeslot Data`, timeslotsData);
//     console.log(`Payment Data`, paymentsData);

//     let filteredBookingsData = [];

//     // Check the role of the logged-in user
//     const userRole = authStore.currentUser?.role;

//     if (userRole === 'musician') {
//       // If the user is a musician, filter bookings by their user_id
//       const musicianBookings = bookingsData.filter(b => b.user_id === authStore.currentUser?.id);
//       filteredBookingsData = [...musicianBookings];
//     } else {
//       // If the user is an admin or provider, fetch all bookings
//       filteredBookingsData = [...bookingsData];
//     }

 
//   generalData.value = filteredBookingsData.map(booking => {
//   // const user = usersData.find(u => u.user_id === booking.user_id);
//      const listing = listingsData.find(l => l.listing_id === booking.listing_id);
     
//      const userMusicianId = getuserIDbyListingID(listing.listing_id, bookingsData);
//       console.log('Listing ID:', listing.listing_id);
//       console.log('Musician ID:', userMusicianId);
      
//       const userProviderId = getuserIDbyListingID(listing.listing_id, listingsData);
//       console.log('Listing ID:', listing.listing_id);
//       console.log('Provider ID:', userProviderId);

//       console.log('All Users:', usersData);
      
//       let providerName;
//       try {
//         // Assuming you want to get the username using userMusicianId
//         providerName = getUserNameByUserId(userProviderId);
//         console.log('Provider name:', providerName);
//       } catch (error) {
//         console.error(error);
//         // Handle the error as needed...
//       }

      
//       // const userMusician = usersData.find(u => u.userMusicianId  === userMusicianId);
//       // const userProvider= usersData.find(u => u.userProviderId === userProviderId);
      


//       // Use getPaymentIDByBookingID to get the paymentID
//       const paymentID = getPaymentIDByBookingID(booking.booking_id, paymentsData);

//       // Use the paymentID to get payment details
//       const payment = paymentID !== 'N/A' ? getPaymentByID(paymentID, paymentsData) : {};

//       const paymentStatus = getPaymentStatus(booking.booking_id, paymentsData);
//   // const timeslot = timeslotsData.find(t => t.timeslot_id === booking.timeslot_id);


//   return {
//     paymentID: payment.payment_id || 'N/A',
//     paymentStatus: paymentStatus,
//     bookingID: booking.booking_id,
//     listing: listing ? listing.name : 'N/A',
//     check_in: booking.check_in,
//     check_out: booking.check_out,
//     // ownerID: user ? user.user_id : 'N/A',
//     ownerID: listing.user_id,
//     // owner: user ? user.username : 'N/A',
//     owner: userProviderId,
//     bookingStatus: paymentStatus,
//     edit: 'mdiPencil',
//     delete: 'mdiDelete',
//   };
// });



//     console.log(`General Data`, generalData);
//     console.log(authStore.currentUser);
//     console.log(numberOfBookings.value);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// });

const headers = [
  { title: 'Payment_ID', key: 'paymentID' },
  { title: 'Payment Status', key: 'paymentStatus'},
  { title: 'Booking_ID', key: 'bookingID' },
  { title: 'Listing_ID', key: 'listingID' },
  { title: 'Listing Name', align: 'start', sortable: false, key: 'listing' },
  { title: 'check_in', key: 'check_in' },
  { title: 'check_out', key: 'check_out' },
  { title: 'OwnerID', key: 'ownerID' },
  { title: 'Owner', key: 'owner' },
  { title: 'Confirmation Status', key: 'bookingStatus' },
  { title: 'Edit', key: 'edit' },
  { title: 'Delete', key: 'delete' },
  // { title: 'Edit', key: 'edit', slot: 'editColumn' },
];

// Dummy Data, keep it here!
const dummyData = [
  {
    paymentID: 'not found',
    paymentStatus: 'incomplete',
    bookingID: 1,
    listing: `Melkro TEST`,
    check_in: '00:00',
    check_out: '00:00',
    owner: 'test',
    ownerID: 1,
    bookingStatus: 'pending',
    edit: 'mdiPencil',
    delete: 'mdiDelete'
  },
];



function editItem(item) {
      // Handle edit action
      console.log('Edit item:', item);
      adminStore.setSelectedItem(item);
      
      if (router) {
        router.push({ name: 'Musician Multiple Edit' });
      } else {
        console.error('Router instance is not available.');
      }
    }
    
    async function deleteItem(item) {
  try {
    const bookingID = item.bookingID;
    
    // const response = await axios.delete(`http://localhost:8080/bookings/bookings/${bookingID}`);
    const response = await axios.delete(`https://melkro-api-dev-pbcxdasz4q-as.a.run.app/bookings/bookings/${bookingID}`);
    
    if (response.status === 204) {
      console.log('Booking deleted successfully.');
      // Optionally, you can update the local state to reflect the deletion
      const updatedGeneralData = generalData.value.filter(booking => booking.bookingID !== item.bookingID);
      generalData.value = updatedGeneralData;
    } else {
      console.error('Failed to delete booking:', response.statusText);
    }
  } catch (error) {
    console.error('Error deleting booking:', error);
  }
}

const getUserName = (userId, usersData) => {
const user = usersData.find(item => item.user_id === userId);
return user ? user.username : 'N/A';
};



const getProviderNameByListingId = async (listingId) => {
  try {
    const allListings = await getAllListings();
    const listing = allListings.find(listing => listing.listing_id === listingId);
    return listing ? listing.providerName : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getListingInfo = (listingId, listingsData) => {
const listing = listingsData.find(item => item.listing_id === listingId);
return listing || {}; // Return an empty object if not found
};




const getPaymentID = (paymentData) => {
// Assuming paymentData is an array of payments
const paymentIDs = paymentData.map(payment => payment.payment_id);
return paymentIDs.length > 0 ? paymentIDs : ['N/A'];
};

const getPaymentByID = async (paymentId, paymentData) => {
// Implement logic to fetch payment details from paymentData
// You should replace this with your actual implementation
const payment = paymentData.find(payment => payment.payment_id === paymentId);
return payment || {}; // Return an empty object if not found
};

const getPaymentIDByBookingID = (bookingID, paymentsData) => {
  console.log('Input Parameters - Booking ID:', bookingID, 'Payments Data:', paymentsData);
  const payment = paymentsData.find(payment => payment.booking_id === bookingID);
  console.log('Found Payment:', payment);
  return payment ? payment.payment_id : 'N/A';
};



const getPaymentStatus = (bookingId, paymentData) => {
// Assuming bookingId is used to filter payments for a specific booking
const paymentsForBooking = paymentData.filter(payment => payment.booking_id === bookingId);

// Check if there are payments for the booking
if (paymentsForBooking.length > 0) {
  // Get the status from the first payment
  return paymentsForBooking[0].status;
} else {
  return 'N/A';
}
};

const getuserIDbyListingID = (listingId, bookingsData) => {
  const booking = bookingsData.find(b => b.listing_id === listingId);
  return booking ? booking.user_id : null;
  
};


const getUserNameByUserId = async (userProviderId) => {
  try {
    const allUsers = await getAllUsers();
    console.log('All Users:', allUsers);

    const user = allUsers.find(user => {
      console.log('Accessing User Data:', user);
      console.log('User ID:', user.user_id); // access user_id
      console.log('Requested ID:', userProviderId);
      const isMatch = Number(user.user_id) === Number(userProviderId);
      console.log('Match:', isMatch);
      return isMatch;
    });

    console.log('Final User:', user);

    return user ? user.username : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};


const getAllUsers = async () => {
  try {
    
    // const response = await axios.get(`http://localhost:8080/users/users`);
    const response = await axios.get(`https://melkro-api-dev-pbcxdasz4q-as.a.run.app/users/users`);
    console.log('Get All Users Response Status:', response.status);
    console.log('Get All Users Response Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching all users:', error);
    return [];
  }
};


const getUserMajor = async (userId) => {
  try {
    const userData = await getAllUsers();
    const user = userData.find(user => user.user_id === userId);
    console.log('User:', user);
    return user ? user.major : 'N/A';
  } catch (error) {
    console.error('Error fetching user major:', error);
    return 'N/A';
  }
};






const getAllListings = async () => {
  try {
    
    // const response = await axios.get(`http://localhost:8080/listings/`);
    const response = await axios.get(`https://melkro-api-dev-pbcxdasz4q-as.a.run.app/listings/`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getAllBookings = async () => {
  try {
    
    // const response = await axios.get(`http://localhost:8080/bookings/bookings`);
    const response = await axios.get(`https://melkro-api-dev-pbcxdasz4q-as.a.run.app/bookings/bookings`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getAllTimeslots = async () => {
  try {
    
    // const response = await axios.get(`http://localhost:8080/timeslot/timeslot`);
    const response = await axios.get(`https://melkro-api-dev-pbcxdasz4q-as.a.run.app/timeslot/timeslot`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getAllPayments = async () => {
  try {
    
    // const response = await axios.get(`http://localhost:8080/payment/payment/`);
    const response = await axios.get(`https://melkro-api-dev-pbcxdasz4q-as.a.run.app/payment/payment/`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};



const getPaymentStatuses = (paymentStatus) => {
if (paymentStatus === 'completed') return 'green';
else if (paymentStatus === 'incomplete') return 'orange';
else return 'red';
};

const getBookingStatus = (bookingStatus) => {
if (bookingStatus === 'pending') return 'orange';
else if (bookingStatus === 'confirmed') return 'green';
else return 'red';
};

const numberOfBookings = ref(0);

async function countBookingsByLoggedInUser() {
  try {
    const currentUser = await authStore.getCurrentUser();
    const loggedInUserId = currentUser.id;
    console.log(loggedInUserId);

    // Get the vookings from pinia store
    const allBookings = await bookingStore.getAllBookings();
    console.log(allBookings);

    // Use filter to get listings that match the logged-in user's ID
    const userBookings = allBookings.filter(booking => booking.user_id === loggedInUserId);

    // Return the count of listings for the logged-in user
    return userBookings.length;

  } catch (error) {
    console.error(error);
    return 0; // Return 0 in case of an error
  }
}

// onMounted(async () => {
//   try {
//     const count = await  countBookingsByLoggedInUser();
//     numberOfBookings.value = count;
//     console.log(`The logged-in user has ${count} bookings.`);
//   } catch (error) {
//     console.error(error);
//   }
// });

function deleteMe() {
  console.log('Deleting account...');
  router.push('/thankyouPage')
}

async function deleteAccount() {
  console.log('Deleting account...');
  const currentUser = await authStore.getCurrentUser()
  const userID = currentUser.id
  
  try {
    // Get the access token from localStorage
    const accessToken = localStorage.getItem('access_token');
    
    // Make an API call with the authorization header
    
    // await axios.delete(`http://localhost:8080/users/${userID}`, {
      await axios.delete(`https://melkro-api-dev-pbcxdasz4q-as.a.run.app/users/${userID}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Update the local data or perform other necessary actions
    console.log('Account deleted successfully.');
    authStore.logout()
    router.push('/thankyouPage');
  } catch (error) {
    console.error('Error deleting account:', error);
    // Handle error appropriately, show a message, etc.
  }
}
</script>

<!-- ProviderDashboard.vue -->
<template>
  <div>
      <Navbar/>
      <DropdownMenu2/>

      <!-- {{ generalData }} -->
    
      <div class="mt-10 flex border">
         <!-- <UserIcon/> -->
        <div class="mt-5 ml-5">
          <svg-icon class="custom-icon mb-5" type="mdi" :path="mdiAccount"></svg-icon>
            <span class="mr-2">Name:</span>
            <span>{{  authStore.currentUser?.username}}</span>
         </div>
        <div class="mt-2 ml-5">
            <span class="mr-2">Email:</span>
            <span>{{  authStore.currentUser?.email}}</span>
        </div>
        <div class="mt-2 ml-5 mb-5">
            <span class="mr-2">Role:</span>
            <span>{{  authStore.currentUser?.role}}</span>
        </div>
        <div class="mt-2 ml-5 mb-5">
            <span class="mr-2">Major:</span>
            <span>{{ userMajor  }}</span>
           
             {{ console.log('User Major:', userMajor) }}
        </div>

        <div class="mt-10 mb-5 ml-5">
          <v-btn to='/updateProfile' class="mx-2">Edit Profile</v-btn>
          <v-btn @click="deleteAccount" class="mx-2">Delete Account</v-btn>
        </div>

        </div>
      
      <div class="mt-10">
         
        <div style="flex: 1; display: flex; justify-content: center; margin-top: 10px;">
            <img :src="'https://live.staticflickr.com/8653/28605337445_ffac139894_b.jpg'" alt="">
        </div>
        
        <div>
            <div>
            <!-- <div style="display: flex; justify-content: center;">
            <RouterLink to="/" style="flex: 1; text-align: center;">You have 0 listing</RouterLink>
            </div> -->
            
            <div style="display: flex; justify-content: center;">
            <RouterLink to="#" style="flex: 1; text-align: center;">
            You have {{ numberOfBookings }} booking(s)
          </RouterLink>
            </div>
            
            <div class="mt-10 mb-10" style="flex: 1; display: flex; justify-content: center; margin-top: 5px; margin-bottom: 5px;">
            <RouterLink to="listingCard" style="text-decoration: none;">
                <Button text="Get a room, now!" style="margin: 5px; padding: 10px; background-color: black; color: #ffffff; border: none; border-radius: 5px; cursor: pointer; margin-bottom: 5rem;" />
            </RouterLink>

      
            </div>
            
            <div style="flex: 1; display: flex; justify-content: center; margin-top: 20px;">
              <img :src="'/src/assets/atomic-music.png'" alt="">
            </div>

            <!-- <div style="flex: 1; display: flex; justify-content: center; margin-top: 5rem; margin-bottom: 5px;">
            <RouterLink  to="#" style="text-decoration: none;">
                <Button text="Edit booking" style="margin: 5px; padding: 10px; background-color: black; color: #ffffff; border: none; border-radius: 5px; cursor: pointer;" />
            </RouterLink>
            </div> -->
          </div>
        </div>
      </div>
      
    
     
    <!-- <v-data-table :headers="headers" :items="bookingData" class="elevation-1 mt-10"> -->
      <!-- <template v-slot:item.status="{ value }"> -->
        <!-- <v-chip :color="getStatus(value)"> -->
          <!-- {{ value }} -->
        <!-- </v-chip> -->
        
        <!-- <v-btn class="mt-8 mb-8 ml-8">Hello</v-btn> -->
      <!-- </template> -->

      <!-- <template v-slot:item.editColumn="{ item }">
        <v-icon>{{ item.edit }}</v-icon>
      </template> -->

      
      
    <!-- </v-data-table> -->
    
    <!-- Testing for MDI icons -->
    <!-- <v-icon @click="editItem(item)" style="color: red;">{{ mdiPencil }}</v-icon> -->
    <!-- <v-icon @click="deleteItem(item)" style="color: blue;">{{ mdiDelete }}</v-icon> -->

    <v-data-table v-if="generalData && generalData.length" :headers="headers" :items="generalData" class="elevation-1 mt-10">
  <!-- <v-data-table :headers="headers" :items="dummyData" class="elevation-1 mt-10"> -->
    <template v-slot:item.paymentStatus="{ value }">
      <v-chip :color="getPaymentStatuses(value)">
        {{ value }}
      </v-chip>
    </template>

    <template v-slot:item.bookingStatus="{ value }">
      <v-chip :color="getBookingStatus(value)">
        {{ value }}
      </v-chip>
    </template>

    <template v-slot:item.edit="{ item }">
      <v-icon class="custom-icon" @click="editItem(item)" style="color: black">{{ mdiPencil }}</v-icon>
    </template>

    <template v-slot:item.delete="{ item }">
      <v-icon class="custom-icon" @click="deleteItem(item)" style="color: black;">{{ mdiDelete }}</v-icon>
    </template>
  </v-data-table>

    <Footer/>
  </div>
</template>


<style scoped>
.custom-icon {
  color: black;
}
</style>
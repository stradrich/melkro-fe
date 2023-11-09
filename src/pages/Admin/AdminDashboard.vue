<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable';
import '@mdi/font/css/materialdesignicons.css'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiPencil, mdiDelete, mdiAccount} from '@mdi/js';

import { ref, watch, onMounted, computed } from 'vue';
import Navbar from '../../components/Navbar.vue';
import Footer from '../../components/Footer.vue';
import DropdownMenu2Vue from '../../components/DropdownMenu2.vue';
import Button from '../../components/Button.vue';
// import UserIcon from '../../components/icons/UserIcon'

import { useAuthStores } from '../../stores/auth';
import { useUserStores } from '../../stores/user';
import { useListingStores } from '../../stores/listing';
import { useBookingStores } from '../../stores/booking';
import { usePaymentStores } from '../../stores/payment'
import { useAdminStores } from '../../stores/admin'

const authStore = useAuthStores();
const userStore = useUserStores();
const listingStore = useListingStores();
const bookingStore = useBookingStores();
const paymentStore = usePaymentStores();
const adminStore = useAdminStores();

import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

import axios from 'axios';

const numberOfProviders = ref(0);
const numberOfMusicians = ref(0);
const numberOfListings = ref(0);
const numberOfBookings = ref(0);

const userData = ref([]);
// console.log(`User Data:`,userData);
const listingsData = ref([]);
// console.log(`Listing Data`,listingsData);
const bookingData = ref([]); 
// console.log(`Booking Data`, bookingData);
const timeslotData = ref([]);
// console.log(`Timeslot Data`,timeslotData);
const paymentData = ref([]);
// console.log(`Payment Data`, paymentData);

const generalData = ref([]);

const fetchData = async () => {
  const [userDataResponse, listingsDataResponse, bookingDataResponse, timeslotDataResponse, paymentDataResponse] = await Promise.all([
    axios.get('http://localhost:8080/users/users'),
    axios.get('http://localhost:8080/listings/'),
    axios.get('http://localhost:8080/bookings/bookings'),
    axios.get('http://localhost:8080/timeslot/timeslot'),
    axios.get('http://localhost:8080/timeslot/timeslot'),
    axios.get('http://localhost:8080/payment/payment/'),
  ]);

  userData.value = userDataResponse.data;
  listingsData.value = listingsDataResponse.data;
  bookingData.value = bookingDataResponse.data;
  timeslotData.value = timeslotDataResponse.data;
  paymentData.value = paymentDataResponse.data;

  console.log('Fetched users data:', userData.value);
  console.log('Fetched space listings data:', listingsData.value);
  console.log('Fetched bookings data:', bookingData.value);
  console.log('Fetched timeslots data:', timeslotData.value);
  console.log('Fetched payments data:', paymentData.value);
};

// onMounted(async () => {
//   try {
//     const providerCount = await countProviders();
//     numberOfProviders.value = providerCount;

//     const musicianCount = await countMusicians();
//     numberOfMusicians.value = musicianCount;

//     const listingCount = await countListings();
//     numberOfListings.value = listingCount;

//     const bookingCount = await countBookings();
//     numberOfBookings.value = bookingCount;

//     const usersData = await getAllUsers();
//     const listingsData = await getAllListings();
//     const bookingsData = await getAllBookings();
//     const timeslotsData = await getAllTimeslots();
//     const paymentsData = await getAllPayments();

//     console.log(`User Data`, usersData);
//     console.log(`Listing Data`, listingsData);
//     console.log(`Booking Data`, bookingsData);
//     console.log(`Timeslot Data`, timeslotsData);
//     console.log(`Payment Data`, paymentsData);

//     // Populate generalData after fetching all necessary data
//     generalData.value = await getPaymentData();

//     console.log('General Data:', generalData.value);
//   } catch (error) {
//     console.error(error);
//   }
// });

// const getPaymentData = async () => {
//   return Promise.all(bookingData.value.map(async booking => {
//     const listingID = await getListingName(booking.listing_id);
//     const listing = await getListingInfo(booking.listing_id)
//     const musician = await getUserName(booking.user_id);
//     const provider = await getUserName(listing.user_id);
//     // const payment = await getPaymentID(booking.payment_id);
//     // const paymentID = await getPaymentByID(booking.payment_id);
//     const paymentStatus = await getPaymentStatus(booking.payment_id);

//     console.log('Booking:', booking);
//     console.log('ListingID:', listingID);
//     console.log('Listing:', listing);
//     console.log('ProviderID:', provider);
//     console.log('Musician:', musician);
//     // console.log('Payment:', payment);
//     // console.log('PaymentID:', paymentID);

//     const paymentID = getPaymentIDByBookingID(booking.booking_id, paymentsData);
//     console.log('Payment ID:', paymentID);
//     const payment = paymentID !== 'N/A' ? await getPaymentByID(paymentID, paymentsData) : {};
//     console.log('Payment details:', payment);
//     console.log('Payment Status:', paymentStatus);
    
//     // Extracting paymentID and paymentStatus for the specific booking
//     const paymentIDsAndStatus = paymentID.map(payment => ({
//     paymentID: payment.payment_id,
//     paymentStatus: payment.status
//     }));

//     console.log('Payment IDs and Status:', paymentIDsAndStatus);
//     console.log('Payment IDs and Status:', paymentIDsAndStatus.value);
//     console.log('Payment IDs and Status:', paymentIDsAndStatus.data);
//     console.log('Payment IDs:', paymentIDsAndStatus.paymentID);
//     console.log('Payment Status:', paymentIDsAndStatus.paymentStatus);

//     // Able to extract paymentID and paymentStatus from DB, but can't manage to put into the headers: value object
//     // Take the first payment for the booking
//     const firstPayment = paymentIDsAndStatus[0];
//     console.log(firstPayment);
//     // Take the second payment for the booking
//     const secondPayment = paymentIDsAndStatus[1];
//     console.log(secondPayment);

//     paymentIDsAndStatus.forEach(entry => {
//     console.log('Processing payment:');
//     console.log('Payment ID:', entry.paymentID);
//     console.log('Payment Status:', entry.paymentStatus);
//     });

//     const processedPayment = paymentIDsAndStatus.map(entry => entry.paymentStatus)
//     console.log(processedPayment);

  
    
//     return {
//       // PaymentID still not very convincing 
//       paymentID: booking.booking_id,
//       // PaymentStatus hard coded, not from DB
//       // Flatten the paymentStatus array into a comma-separated string
//       paymentStatus: booking.status,   
//       bookingID: booking.booking_id,
//       bookingStatus: booking.status,
//       listingID: booking.listing_id,
//       listing: listing.name,
//       providerID: listing.user_id,
//       provider: provider,
//       check_in: booking.check_in,
//       check_out: booking.check_out,
//       musicianID: booking.user_id,
//       musician: musician,
//       edit: mdiPencil,
//       delete: mdiDelete,
//     };
//   }));
// };

onMounted(async () => {
  try {
    const providerCount = await countProviders();
    numberOfProviders.value = providerCount;

    const musicianCount = await countMusicians();
    numberOfMusicians.value = musicianCount;

    const listingCount = await countListings();
    numberOfListings.value = listingCount;

    const bookingCount = await countBookings();
    numberOfBookings.value = bookingCount;

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

    const userRole = authStore.currentUser?.role;
    const userCurrentID = authStore.currentUser?.id;

    const generalDataPromises = bookingsData.map(async (booking) => {
      const listing = listingsData.find(l => l.listing_id === booking.listing_id);

      // Step 1: Populate bookingID
      const bookingID = booking.booking_id;

      // Step 2: Use user_id as musicianID and status as bookingStatus
      const musicianID = booking.user_id;
      const bookingStatus = booking.status;

      // Step 3: Use booking_id to find payment_id and payment status
      const paymentID = getPaymentIDByBookingID(bookingID, paymentsData);
      const paymentDetails = paymentID !== 'N/A' ? await getPaymentByID(paymentID, paymentsData) : null;
      const paymentStatuses = paymentDetails ? paymentDetails.map(payment => payment.status) : [];

      // Log all payment statuses
      console.log("Booking Status:", bookingStatus);
      console.log("Payment Statuses:", paymentStatuses);
      console.log(paymentStatuses);
      
      // Use a default status if there are no payment statuses
      
      const defaultStatus = 'N/A';
      const uniquePaymentStatuses = [...new Set(paymentStatuses)];
      
      // Filter out 'declined' statuses and use 'completed' or 'incomplete'
      const filteredPaymentStatuses = uniquePaymentStatuses.filter(status => status !== 'declined');
      const paymentStatus = filteredPaymentStatuses.length > 0 ? filteredPaymentStatuses[0] : defaultStatus;
      console.log("Final Payment Status:", paymentStatus);
      
      // Step 4: Use listing_id to find listing name and ownerID
      const listingName = listing ? listing.name : 'N/A';
      const ownerID = listing ? listing.user_id : 'N/A';

      // Step 5: Access user data to get usernames
      const owner = usersData.find(user => user.user_id === ownerID);
      const musician = usersData.find(user => user.user_id === musicianID);

      return {
        paymentID: paymentID || 'N/A',
        paymentStatus: paymentStatus,
        bookingID: bookingID,
        bookingStatus: bookingStatus,
        listingID: booking.listing_id,
        listing: listingName,
        providerID: ownerID,
        provider: owner ? owner.username : 'N/A',
        check_in: new Date(booking.check_in).toLocaleString(),
        check_out: new Date(booking.check_out).toLocaleString(),
        musicianID: musicianID,
        musician: musician ? musician.username : 'N/A',
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






// return {
     
//       paymentID: '',
//       paymentStatus: '',   
//       bookingID: '',
//       bookingStatus: '',
//       listingID: '',
//       listing: '',
//       providerID: '',
//       provider: '',
//       check_in: '',
//       check_out: '',
//       musicianID: '',
//       musician: '',
//       edit: mdiPencil,
//       delete: mdiDelete,
//     };



const headers = [
  { title: 'Payment_ID', key: 'paymentID' },
  { title: 'Payment Status', key: 'paymentStatus' },
  { title: 'Booking_ID', key: 'bookingID' },
  { title: 'Booking Status', key: 'bookingStatus' },
  { title: 'Listing_ID', key: 'listingID' },
  { title: 'Listing', align: 'start', sortable: false, key: 'listing' },
  { title: 'Provider_ID', key: 'providerID' },
  { title: 'Provider', key: 'provider' },
  { title: 'check_in', key: 'check_in' },
  { title: 'check_out', key: 'check_out' },
  { title: 'Musician_ID', key: 'musicianID' },
  { title: 'Musician', key: 'musician' },
  { title: 'Edit', key: 'edit' },
  { title: 'Delete', key: 'delete' },
];

const dummyData = [
          {
            paymentID: 'not found', 
            bookingID: 1,
            // confirmed (green), pending (yellow), declined (red)
            status: 'confirmed',
            listing: `Melkro Centrum`,
            listingID: 1,
            provider: 'stradrich', 
            providerID: 1,
            bookingID: 1,
            check_in: '00:00',
            check_out: '00:00',
            musician: 'stradrich',
              musicianID: 1,
            edit: 'mdiPencil',
            delete: 'mdiDelete'
            
          },
          {
            paymentID: 'not found', 
            bookingID: 1,
            // confirmed (green), pending (yellow), declined (red)
            status: 'pending',
            listing: `Melkro 888`,
            listingID: 1,
            provider: 'stradrich', 
            providerID: 1,
            bookingID: 1,
            check_in: '00:00',
            check_out: '00:00',
            musician: 'stradrich',
            musicianID: 1,
            edit: 'mdiPencil',
            delete: 'mdiDelete'
          },
          {
            paymentID: 'not found', 
            bookingID: 1,
            // confirmed (green), pending (yellow), declined (red)
            status: 'declined',
            listing: `Melkro Beach View`,
            listingID: 1,
            provider: 'stradrich', 
            providerID: 1,
            bookingID: 1,
            check_in: '00:00',
            check_out: '00:00',
            musician: 'stradrich',
            musicianID: 1,
            edit: 'mdiPencil',
            delete: 'mdiDelete'
            
          },
 ];


 const getAllUsers = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/users/users`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getAllListings = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/listings/`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getAllBookings = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/bookings/bookings`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getAllTimeslots = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/timeslot/timeslot`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getAllPayments = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/payment/payment/`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getuserIDbyListingID = (listingId, bookingsData) => {
  const booking = bookingsData.find(b => b.listing_id === listingId);
  return booking ? booking.user_id : null;
  
};

const getListingName = async (listingId) => {
  const listing = listingsData.value.find(item => item.listing_id === listingId);
  return listing ? listing.name : 'N/A';
};

const getUserName = async (userId) => {
  const user = userData.value.find(item => item.user_id === userId);
  return user ? user.username : 'N/A';
};

const getListingInfo = async (listingId) => {
  const listing = listingsData.value.find(item => item.listing_id === listingId);
  return listing || {}; // Return an empty object if not found
};

const getPaymentID = async () => {
  // Implement logic to fetch payment IDs
  // For example, if payment IDs are stored in paymentData
  // You can modify this based on your actual data structure

  // Assuming paymentData is an array of payments
  const paymentIDs = paymentData.value.map(payment => payment.payment_id);

  // Return an array of payment IDs
  return paymentIDs.length > 0 ? paymentIDs : ['N/A'];
};

const getPaymentByID = async (paymentId) => {
  // Implement logic to fetch payment details from paymentStore
  // You should replace this with your actual implementation
  const payment = await paymentStore.getAllPayments(paymentId);
  return payment || {}; // Return an empty object if not found
};

const getPaymentStatus = async (bookingId) => {
  // Assuming bookingId is used to filter payments for a specific booking
  const paymentsForBooking = paymentData.value.filter(payment => payment.booking_id === bookingId);

  // Check if there are payments for the booking
  if (paymentsForBooking.length > 0) {
    // Get the status from the first payment
    return paymentsForBooking[0].status;
  } else {
    return 'N/A';
  }
};

const getPaymentIDByBookingID = (bookingID, paymentsData) => {
  console.log('Input Parameters - Booking ID:', bookingID, 'Payments Data:', paymentsData);
  const payment = paymentsData.find(payment => payment.booking_id === bookingID);
  console.log('Found Payment:', payment);
  return payment ? payment.payment_id : 'N/A';
};



function editItem(item) {
      // Handle edit action
      console.log('Edit item:', item);
      adminStore.setSelectedItem(item);
      
      if (router) {
        router.push({ name: 'Admin Multiple Edit' });
      } else {
        console.error('Router instance is not available.');
      }
    }
    

async function deleteItem(item) {
  try {
    const bookingID = item.bookingID;
    const response = await axios.delete(`http://localhost:8080/bookings/bookings/${bookingID}`);
    
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





async function countProviders() {
  try {
    const response = await axios.get('http://localhost:8080/users/users');
    const providerCount = response.data.filter(user => user.role === 'provider').length;
    return providerCount;
  } catch (error) {
    console.error(error);
    return 0;
  }
}

async function countMusicians() {
  try {
    const response = await axios.get('http://localhost:8080/users/users');
    const musicianCount = response.data.filter(user => user.role === 'musician').length;
    return musicianCount;
  } catch (error) {
    console.error(error);
    return 0;
  }
}

async function countListings() {
  try {
    const response = await axios.get('http://localhost:8080/listings/');
    return response.data.length;
  } catch (error) {
    console.error(error);
    return 0;
  }
}

async function countBookings() {
  try {
    const response = await axios.get('http://localhost:8080/bookings/bookings');
    return response.data.length;
  } catch (error) {
    console.error(error);
    return 0;
  }
}

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
    console.log(accessToken);
    
    // Make an API call with the authorization header
    await axios.delete(`http://localhost:8080/users/${userID}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Update the local data or perform other necessary actions
    console.log('Account deleted successfully.');
    router.push('/thankyouPage');
  } catch (error) {
    console.error('Error deleting account:', error);
    // Handle error appropriately, show a message, etc.
  }
}


</script>

<!-- ProviderDashboard.vue -->
<template>
    <Navbar/>
    <DropdownMenu2Vue/>

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

        <div class="mt-10 mb-5 ml-5">
          <v-btn to='/updateProfile' class="mx-2">Edit Profile</v-btn>
          <v-btn @click="deleteAccount" class="mx-2">Delete Account</v-btn>
        </div>
       
    </div>

    <div class="mt-10">
         
         <div class="mb-10" style="flex: 1; display: flex; justify-content: center; margin-top: 10px;">
             <img :src="'/src/assets/bermuda-114.png'" alt="">
         </div>
         
         <div>
             <div>
             <div style="display: flex; justify-content: center; margin-top: 1rem; margin-bottom: 1rem; ">
             <RouterLink to="/" style="flex: 1; text-align: center;">You have {{ numberOfProviders }} provider(s)</RouterLink>
             </div>

             <div style="display: flex; justify-content: center; margin-bottom: 1rem;">
             <RouterLink to="/" style="flex: 1; text-align: center;">You have {{ numberOfMusicians }} musician(s)</RouterLink>
             </div>

             <div style="display: flex; justify-content: center; margin-bottom: 1rem;">
             <RouterLink to="/listingCard" style="flex: 1; text-align: center;">You have {{ numberOfListings }}  listing(s)</RouterLink>
             </div>
             
             <div style="display: flex; justify-content: center; margin-bottom: 1rem;">
             <RouterLink to="/" style="flex: 1; text-align: center;">You have {{ numberOfBookings }} booking(s) </RouterLink>
             </div>
             
             <div class="mt-10 mb-5" style="flex: 1; display: flex; justify-content: center; margin-top: 5px; margin-bottom: 5px;">
              <RouterLink to="underconstruction" style="text-decoration: none;">
              <!-- <RouterLink to="/createListingAdmin" style="text-decoration: none;"> -->
                 <Button class="mr-5" text="Create Listing" style="margin: 5px; padding: 10px; background-color: black; color: #ffffff; border: none; border-radius: 5px; cursor: pointer;" />
             </RouterLink>

             <RouterLink to="underconstruction" style="text-decoration: none;">
             <!-- <RouterLink to="/listingCard" style="text-decoration: none;"> -->
                 <Button class="ml-5" text="Create Booking" style="margin: 5px; padding: 10px; background-color: black; color: #ffffff; border: none; border-radius: 5px; cursor: pointer;" />
             </RouterLink>
             </div>

             <div style="flex: 1; display: flex; justify-content: center; margin-top: 20px;">
             <img :src="'/src/assets/atomic-music.png'" alt="">
             </div>
             </div>
         </div>
     </div>   
<!-- 
     <div style="flex: 1; display: flex; justify-content: center; margin-top: 2rem; margin-bottom: 2rem;">
       <RouterLink to="/" style="text-decoration: none;">
           <Button text="Edit Data" style="margin: 5px; padding: 10px; background-color: black; color: #ffffff; border: none; border-radius: 5px; cursor: pointer; margin-bottom: 5rem;" />
       </RouterLink>
     </div> -->

    <!-- <v-data-table :headers="headers" :items="bookingData" class="elevation-1 mt-10">
      <template v-slot:item.status="{ value }" >
        <v-chip :color="getStatus(value)">
          {{ value }}
        </v-chip>
      </template>

    
    </v-data-table> -->
    <!-- <v-data-table :headers="headers" :items="dummyData" class="elevation-1 mt-10"> -->
    <v-data-table v-if="generalData && generalData.length" :headers="headers" :items="generalData" class="elevation-1 mt-10">
    
    
    <template v-slot:item.paymentStatus="{ item }">
        <v-chip :color="getBookingStatus(item.bookingStatus)">
      <!-- <v-chip :color="getPaymentStatuses(item.paymentStatus)"> -->
        <!-- {{ item.paymentStatus }} -->
        {{ item.bookingStatus }}
      </v-chip>
    </template>

    <template v-slot:item.bookingStatus="{ item }">
      <v-chip :color="getBookingStatus(item.bookingStatus)">
        {{ item.bookingStatus }}
      </v-chip>
    </template>

    <template v-slot:item.check_in="{ item }">
      <td class="v-data-table__td v-data-table-column--align-start">
        {{ new Date(item.check_in).toLocaleString() }}
      </td>
    </template>

    <template v-slot:item.check_out="{ item }">
      <td class="v-data-table__td v-data-table-column--align-start">
      {{ new Date(item.check_out).toLocaleString() }}
      </td>
    </template>

    <template v-slot:item.edit="{ item }">
      <v-icon class="custom-icon" @click="editItem(item)" style="color: black">{{ mdiPencil }}</v-icon>
    </template>

    <template v-slot:item.delete="{ item }">
      <v-icon class="custom-icon" @click="deleteItem(item)" style="color: black;">{{ mdiDelete }}</v-icon>
    </template>

  </v-data-table>

    <Footer/>
  </template>

<style scoped>
.custom-icon {
  color: black;
}
</style>
  
 
  
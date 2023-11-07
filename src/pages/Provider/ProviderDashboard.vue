<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable';
import '@mdi/font/css/materialdesignicons.css'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiPencil, mdiDelete, mdiAccount} from '@mdi/js';


import { ref, watch, onMounted } from 'vue';
import Navbar from '../../components/Navbar.vue';
import Footer from '../../components/Footer.vue';
import DropdownMenu2 from '../../components/DropdownMenu2.vue';
import Button from '../../components/Button.vue';
// import CreateListingForm from '../../pages/Provider/CreateListingForm.vue'
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

// const userData = ref([]);
// console.log(`User Data:`,userData);
// const listingsData = ref([]);
// console.log(`Listing Data`,listingsData);
// const bookingData = ref([]); 
// console.log(`Booking Data`, bookingData);
// const timeslotData = ref([]);
// console.log(`Timeslot Data`,timeslotData);
// const paymentData = ref([]);
// console.log(`Payment Data`, paymentData);

const generalData = ref([]);


// const fetchData = async () => {
//   const [userDataResponse, listingsDataResponse, bookingDataResponse, timeslotDataResponse, paymentDataResponse] = await Promise.all([
//     axios.get('http://localhost:8080/users/users'),
//     axios.get('http://localhost:8080/listings/'),
//     axios.get('http://localhost:8080/bookings/bookings'),
//     axios.get('http://localhost:8080/timeslot/timeslot'),
//     axios.get('http://localhost:8080/payment/payment/'),
//   ]);

//   userData.value = userDataResponse.data;
//   listingsData.value = listingsDataResponse.data;
//   bookingData.value = bookingDataResponse.data;
//   timeslotData.value = timeslotDataResponse.data;
//   paymentData.value = paymentDataResponse.data;

// };

onMounted(async () => {
  try {
    const usersData = await getAllUsers();
    const listingsData = await getAllListings();
    const bookingsData = await getAllBookings();
    const timeslotsData = await getAllTimeslots();
    const paymentsData = await getAllPayments();

    console.log('User Data', usersData);
    console.log('Listing Data', listingsData);
    console.log('Booking Data', bookingsData);
    console.log('Timeslot Data', timeslotsData);
    console.log('Payment Data', paymentsData);

    let filteredBookingsData = [];

    const userRole = authStore.currentUser?.role;
    const userCurrentID = authStore.currentUser?.id;

    console.log('User Role:', userRole);
    console.log('User Current ID:', userCurrentID);
    console.log('Original Bookings Data:', bookingsData);

    // Collect all listing_ids from bookingsData
    const listingIds = Array.from(new Set(bookingsData.map((booking) => booking.listing_id)));

    // Use Promise.all to wait for all async operations to complete
    const generalDataArray = await Promise.all(
      listingIds.map(async (listingId) => {
        // Find the listing based on listing_id
        const listing = listingsData.find((l) => l.listing_id === listingId);
        if (!listing) return null;

        // Check if the user_id of the listing matches the current user
        const isMatch = listing.user_id === userCurrentID;

        if (isMatch) {
          // Use listing data to populate the fields
          const listingName = listing.name;
          const user_id = listing.user_id;

          // Use user_id to find username in user data
          const musician = usersData.find((user) => user.user_id === user_id)?.username || 'N/A';

          // Use listing_id to find all bookings for this listing
          const bookingsForListing = bookingsData.filter((booking) => booking.listing_id === listingId);

          // Use booking_id to get all payment_Id and status from payment data
          const paymentID = getPaymentIDByBookingID(bookingsForListing[0].booking_id, paymentsData);
          const paymentStatus = getPaymentStatus(bookingsForListing[0].booking_id, paymentsData);

          return {
            paymentID: paymentID,
            paymentStatus: paymentStatus,
            bookingID: bookingsForListing[0].booking_id,
            listing: listingName,
            check_in: bookingsForListing[0].check_in,
            check_out: bookingsForListing[0].check_out,
            musicianID: user_id,
            musician: musician,
            bookingStatus: bookingsForListing[0].status,
            edit: 'mdiPencil',
            delete: 'mdiDelete',
          };
        }

        return null;
      })
    );

    // Remove null values (listings that don't match the current user)
    generalData.value = generalDataArray.filter((item) => item !== null);

    console.log('General Data', generalData.value);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});










// onMounted(async () => {
 
  
//   try {
//     // Fetch data and populate generalData
//     await fetchData();

//       // Populate generalData after fetching all necessary data
//   generalData.value = await getGeneralData();
//   console.log('Type of generalData.value:', typeof generalData.value);
//   console.log('General Data:', generalData.value);
    

//    // Fetch specific data for rendering into v-data-table
//   const updatedBookings = await Promise.all(generalData.value.bookingData.map(async (item) => {
//   const paymentID = await getPaymentIdByBookingId(item.booking_id);
//   console.log(`PaymentID:`,paymentID);
//   const listing = await getProviderNameByListingId(item.listing_id);
//   console.log(`Provider Name:`,listing);
//   const musician = await getUserNameByUserId(item.user_id);
//   console.log(`Musician Name:`,musician);

//   return {
//     paymentID: paymentID,
//     paymentStatus: item.booking_id,
//     bookingID: item.booking_id,
//     listing: listing,
//     check_in: item.check_in,
//     check_out: item.check_out,
//     musician,
//     musicianID: item.user_id,
//     edit: mdiPencil,
//     delete: mdiDelete,
//   };
// }));

//     // Update bookingData with the fetched data
//     bookingData.value = updatedBookings;
//     console.log(updatedBookings)
//   } catch (error) {
//     console.error(error);
//   }
// });

// const getAllPayments = async () => {
//   try {
//     const response = await axios.get(`http://localhost:8080/payment/payment/`);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

// const getPaymentIdByBookingId = async (bookingId) => {
//   try {
//     const allPayments = await getAllPayments();
//     const payment = allPayments.find(payment => payment.booking_id === bookingId);
//     return payment ? payment.paymentId : null;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

// const getAllListings = async () => {
//   try {
//     const response = await axios.get(`http://localhost:8080/listings/`);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

// const getProviderNameByListingId = async (listingId) => {
//   try {
//     const allListings = await getAllListings();
//     const listing = allListings.find(listing => listing.listing_id === listingId);
//     return listing ? listing.providerName : null;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

// const getAllUsers = async () => {
//   try {
//     const response = await axios.get(`http://localhost:8080/users/users`);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

// const getUserNameByUserId = async (userId) => {
//   try {
//     const allUsers = await getAllUsers();
//     const user = allUsers.find(user => user.userId === userId);
//     return user ? user.userName : null;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

// const getGeneralData = async () => {
//   try {
//     await fetchData();

//     console.log('Fetched users data:', userData.value);
//     console.log('Fetched space listings data:', listingsData.value);
//     console.log('Fetched bookings data:', bookingData.value);
//     console.log('Fetched timeslots data:', timeslotData.value);
//     console.log('Fetched payments data:', paymentData.value);

//     const combinedData = {
//       userData: userData.value,
//       listingsData: listingsData.value,
//       bookingData: bookingData.value,
//       timeslotData: timeslotData.value,
//       paymentData: paymentData.value,
//     };

//     return combinedData;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };


const headers = [
  { title: 'Payment_ID', key: 'paymentID' },
  { title: 'Payment Status', key: 'paymentStatus'},
  { title: 'Booking_ID', key: 'bookingID' },
  { title: 'Listing Name', align: 'start', sortable: false, key: 'listing' },
  { title: 'check_in', key: 'check_in' },
  { title: 'check_out', key: 'check_out' },
  { title: 'Musician_ID', key: 'musicianID'},
  { title: 'Musician', key: 'musician' },
  { title: 'Booking Status', key: 'bookingStatus'},
  { title: 'Edit', key: 'edit' },
  { title: 'Delete', key: 'delete' },
];


const dummyData = [
  {
    paymentID: 'not found',
    paymentStatus: 'pending',
    bookingID: 1,
    listing: `Melkro TEST`,
    check_in: '00:00',
    check_out: '00:00',
    musician: 'test',
    musicianID: 1,
    edit: 'mdiPencil',
    delete: 'mdiDelete'
  },
];

function editItem(item) {
      // Handle edit action
      console.log('Edit item:', item);
    }
    
function  deleteItem(item) {
      // Handle delete action
      console.log('Delete item:', item);
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
  const payment = paymentsData.find(payment => payment.booking_id === bookingID);
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
    const response = await axios.get(`http://localhost:8080/users/users`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getUserMajor = async (userId) => {
  try {
    const userData = await getAllUsers();
    const user = userData.find(user => user.user_id === userId);
    return user ? user.major : 'N/A';
  } catch (error) {
    console.error('Error fetching user major:', error);
    return 'N/A';
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


const numberOfListings = ref(0);
const numberOfBookings = ref(0);

async function countListingsByLoggedInUser() {
  try {
    // Get the user ID from the authentication store
    const currentUser = await authStore.getCurrentUser();
    const loggedInUserId = currentUser.id;
    console.log(loggedInUserId);

    // Get the listings from your store
    const allListings = await listingStore.getAllListings();
    console.log(allListings);

    // Use filter to get listings that match the logged-in user's ID
    const userlistings = allListings.filter(listing => listing.user_id === loggedInUserId);

    // Return the count of listings for the logged-in user
    return userlistings.length;
     // Update the ref directly instead of returning the count
    //  numberOfListings.value = userlistings.length;
  } catch (error) {
    console.error(error);
    return 0; // Return 0 in case of an error
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

async function countBookingsByLoggedInUser() {
  try {
    const currentUser = await authStore.getCurrentUser();
    const loggedInUserId = currentUser.id;
    console.log(loggedInUserId);

    const allBookings = await countBookings();
    console.log(allBookings);

    // Fetch all listings
    const allListings = await getAllListings();

    // Use filter to get bookings that match the logged-in user's ID in the listings table
    const userBookings = allListings.filter(listing => listing.user_id === loggedInUserId);

    // Return the count of bookings for the logged-in user
    return userBookings.length;

  } catch (error) {
    console.error(error);
    return 0; // Return 0 in case of an error
  }
}


onMounted(async () => {
  try {
    const count = await countListingsByLoggedInUser();
    const countBooking = await countBookingsByLoggedInUser()
    numberOfListings.value = count;
    numberOfBookings.value = countBooking;
    console.log(`The logged-in user has ${count} listings.`);
    console.log(`The logged-in user has ${countBooking} listings.`);
  } catch (error) {
    console.error(error);
  }
});

function deleteMe() {
  console.log('Deleting account...');
}

async function deleteAccount() {
  console.log('Deleting account...');
  try {
    const userId = currentUser.id

    // Make an API call or perform any necessary actions to delete the item
    await axios.delete(`http://localhost:8080/bookings/${userId}`);

    // Update the local bookingData array to reflect the deletion
    // bookingData.value = bookingData.value.filter((booking) => booking.bookingID !== bookingId);

    console.log('Item deleted successfully:', item);
  } catch (error) {
    console.error('Error deleting item:', error);
    // Handle error appropriately, show a message, etc.
  }
}



</script>

<!-- ProviderDashboard.vue -->
<template>
  <div>
      <Navbar/>
      <DropdownMenu2/>

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
          <v-btn to='#' class="mx-2">Edit Profile</v-btn>
          <v-btn @click="deleteMe" class="mx-2">Delete Account</v-btn>
        </div>
        
      </div>
      
      <div class="mt-10">
         
        <div style="flex: 1; display: flex; justify-content: center; margin-top: 10px;">
            <img :src="'/src/assets/IMG_1276.jpg'" alt="">
        </div>
        
        <div>
            <div>
            <!-- <div style="display: flex; justify-content: center;">
            <RouterLink to="listingCard" style="flex: 1; text-align: center;">You have 0 listing(s)</RouterLink>
            </div> -->
            
            <div style="display: flex; justify-content: center;">
              <RouterLink to="listingCard" style="flex: 1; text-align: center;">
                You have {{ numberOfListings }} listing(s)
              </RouterLink>
            </div>
            
            <!-- <div style="display: flex; justify-content: center;">
              <RouterLink :to="{ name: 'listingCard', params: { users: authStore.currentUser?.id } }" style="flex: 1; text-align: center;">
                You have {{ dynamicListings.length }} listing(s)
              </RouterLink>
          </div> -->
            
            <div style="display: flex; justify-content: center;">
            <RouterLink to="/" style="flex: 1; text-align: center;">You have {{ numberOfBookings }} booking(s)</RouterLink>
            </div>
            
            <div style="flex: 1; display: flex; justify-content: center; margin-top: 2rem; margin-bottom: 5px;">
            <RouterLink to="/createListingForm" style="text-decoration: none;">
                <Button text="Create Listings" style="margin: 5px; padding: 10px; background-color: black; color: #ffffff; border: none; border-radius: 5px; cursor: pointer;" />
            </RouterLink>
            </div>

            <div style="flex: 1; display: flex; justify-content: center; margin-top: 5rem;">
             <img :src="'/src/assets/atomic-music.png'" alt="">
            </div>

            <!-- <div style="flex: 1; display: flex; justify-content: center; margin-top: 5rem; margin-bottom: 10px;">
            <RouterLink to="/" style="text-decoration: none;">
                <Button text="Edit Listing" style="margin: 5px; padding: 10px; background-color: black; color: #ffffff; border: none; border-radius: 5px; cursor: pointer; margin-bottom: 5rem;" />
            </RouterLink>
            <RouterLink to="/" style="text-decoration: none;">
                <Button text="Edit Booking" style="margin: 5px; padding: 10px; background-color: black; color: #ffffff; border: none; border-radius: 5px; cursor: pointer; margin-bottom: 5rem;" />
            </RouterLink>
            </div> -->

            </div>
        </div>
    </div>
   
    <!-- <v-data-table :headers="headers" :items="bookingData" class="elevation-1 mt-10">
      <template v-slot:item.status="{ value }">
        <v-chip :color="getStatus(value)">
          {{ value }}
        </v-chip>
      </template>
    </v-data-table> -->

    <v-data-table :headers="headers" :items="generalData" class="elevation-1 mt-10">
    <!-- <v-data-table :headers="headers" :items="dummyData" class="elevation-1 mt-10"> -->
    <!-- <template v-slot:item.status="{ value }">
      <v-chip :color="getStatus(value)">
        {{ value }}
      </v-chip>
    </template> -->  
  
    <!-- <template v-slot:item.paymentID="{ item }">
      <td class="v-data-table__td v-data-table-column--align-start">
        {{ item.payment_id}}
      </td>
    </template> -->

    <template v-slot:item.paymentStatus="{ value }">
      <v-chip :color="getPaymentStatuses(value)">
        {{ value }}
      </v-chip>
    </template>

    <!-- <template v-slot:item.bookingID="{ item }">
      <td class="v-data-table__td v-data-table-column--align-start">
        {{ item.bookingID }}
      </td>
    </template> -->
<!-- 
    <template v-slot:item.listing="{ item }">
      <td class="v-data-table__td v-data-table-column--align-start">
        {{ item.listing }}
      </td>
    </template> -->

    <!-- <template v-slot:item.check_in="{ item }">
      <td class="v-data-table__td v-data-table-column--align-start">
        {{ item.check_in }}
        {{ new Date(it  em.check_in).toLocaleString() }}
      </td>
    </template> -->

    <!-- <template v-slot:item.check_out="{ item }">
      <td class="v-data-table__td v-data-table-column--align-start">
        {{ item.check_out }}
        {{ new Date(item.check_out).toLocaleString() }}
      </td>
    </template> -->

    <!-- <template v-slot:item.musician="{ item }">
      <td class="v-data-table__td v-data-table-column--align-start">
        {{ item.musician }}
      </td>
    </template> -->

    <!-- <template v-slot:item.musicianID="{ item }">
      <td class="v-data-table__td v-data-table-column--align-start">
        {{ item.musicianID }}
      </td>
    </template> -->

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




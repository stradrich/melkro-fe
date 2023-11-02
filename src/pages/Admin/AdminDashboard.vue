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
const timeslotData = ref([]);
// console.log(`Timeslot Data`,timeslotData);
const bookingData = ref([]); 
// console.log(`Booking Data`, bookingData);
const paymentData = ref([]);
// console.log(`Payment Data`, paymentData);

const generalData = ref([]);

const fetchData = async () => {
  const [userDataResponse, listingsDataResponse, bookingDataResponse, timeslotDataResponse, paymentDataResponse] = await Promise.all([
    axios.get('http://localhost:8080/users/users'),
    axios.get('http://localhost:8080/listings/'),
    axios.get('http://localhost:8080/bookings/bookings'),
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

    await fetchData();

    // Populate generalData after fetching all necessary data
    generalData.value = await getPaymentData();

    console.log('General Data:', generalData.value);
  } catch (error) {
    console.error(error);
  }
});

const getPaymentData = async () => {
  return Promise.all(bookingData.value.map(async booking => {
    const listingID = await getListingName(booking.listing_id);
    const listing = await getListingInfo(booking.listing_id)
    const musician = await getUserName(booking.user_id);
    const provider = await getUserName(listing.user_id);
    const payment = await getPaymentID(booking.payment_id);
    const paymentID = await getPaymentByID(booking.payment_id);
    // const paymentStatus = await getPaymentStatus(payment.status);
    const paymentsForBooking = paymentData.value.filter(payment => payment.booking_id === booking.booking_id);
    const paymentStatus = paymentsForBooking.length > 0 ? paymentsForBooking[0].status : 'N/A';

    console.log('Booking:', booking);
    console.log('ListingID:', listingID);
    console.log('Listing:', listing);
    console.log('ProviderID:', provider);
    console.log('Musician:', musician);
    console.log('Payment:', payment);
    console.log('PaymentID:', paymentID);
    console.log('Payment Status:', paymentStatus);

    const Payment = paymentData.value.find((payment) => payment.booking_id === booking.booking_id);

    return {
      paymentID: Payment ? Payment.payment_id : 'N/A',
      paymentStatus: paymentStatus,
      bookingID: booking.booking_id,
      bookingStatus: booking.status,
      listing: listing.name,
      listingID: booking.listing_id,
      provider: provider,
      providerID: listing.user_id,
      check_in: booking.check_in,
      check_out: booking.check_out,
      musician: musician,
      musicianID: booking.user_id,
      edit: mdiPencil,
      delete: mdiDelete,
    };
  }));
};


// const generalData = ref([]);

// onMounted(async () => {
//   try {
//     const fetchData = async (url, targetRef, targetName) => {
//       const response = await axios.get(url);
//       targetRef.value = response.data;
//       console.log(`Fetched ${targetName} data:`, targetRef.value);
//     };

//     // Fetch data from different tables
//     await Promise.all([
//       fetchData('http://localhost:8080/users/users', userData, 'users'),
//       fetchData('http://localhost:8080/listings/', listingsData, 'space listings'),
//       fetchData('http://localhost:8080/bookings/bookings', bookingData, 'bookings'),
//       fetchData('http://localhost:8080/timeslot/timeslot', timeslotData, 'timeslots'),
//       fetchData('http://localhost:8080/payment/payment/', paymentData, 'payments'),
//     ]);

//     // Populate generalData after fetching all necessary data
//     const dataPromises = bookingData.value.map(async booking => {
//       const listing = await getListingName(booking.listing_id);
//       const provider = await getUserName(booking.user_id);
//       const musician = await getUserName(booking.musician_id);
//       const paymentStatus = await getPaymentStatus(booking.payment_id);

//       return {
//         bookingID: booking.booking_id,
//         paymentID: booking.payment_id,
//         status: paymentStatus,
//         listing: listing,
//         listingID: booking.listing_id,
//         provider: provider,
//         providerID: booking.user_id,
//         check_in: booking.check_in,
//         check_out: booking.check_out,
//         musician: musician,
//         musicianID: booking.musician_id,
//         edit: mdiPencil,
//         delete: mdiDelete,
//       };
//     });

//     // Wait for all promises to resolve
//     generalData.value = await Promise.all(dataPromises);

//     console.log('General Data:', generalData.value);

//   } catch (error) {
//     console.error(error);
//   }
// });

// onMounted(async () => {
//   try {
//     const fetchData = async (url, targetRef, targetName) => {
//       const response = await axios.get(url);
//       targetRef.value = response.data;
//       console.log(`Fetched ${targetName} data:`, targetRef.value);
//     };

//     // Fetch data from different tables
//     await Promise.all([
//       fetchData('http://localhost:8080/users/users', userData, 'users'),
//       fetchData('http://localhost:8080/listings/', listingsData, 'space listings'),
//       fetchData('http://localhost:8080/bookings/bookings', bookingData, 'bookings'),
//       fetchData('http://localhost:8080/timeslot/timeslot', timeslotData, 'timeslots'),
//       fetchData('http://localhost:8080/payment/payment/', paymentData, 'payments'),
//     ]);

//   } catch (error) {
//     console.error(error);
//   }
// });

const headers = [
  { title: 'Payment_ID', key: 'paymentID' },
  { title: 'Payment Status', key: 'paymentStatus' },
  { title: 'Booking_ID', key: 'bookingID' },
  { title: 'Booking Status', key: 'bookingStatus' },
  { title: 'Listing', align: 'start', sortable: false, key: 'listing' },
  { title: 'Listing_ID', key: 'listingID' },
  { title: 'Provider', key: 'provider' },
  { title: 'Provider_ID', key: 'providerID' },
  { title: 'check_in', key: 'check_in' },
  { title: 'check_out', key: 'check_out' },
  { title: 'Musician', key: 'musician' },
  { title: 'Musician_ID', key: 'musicianID' },
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

//  const generalData = computed(() => {
//   return bookingData.value.map(async booking => {
//     const listing = await getListingName(booking.listing_id);
//     const provider = await getUserName(booking.user_id);
//     const musician = await getUserName(booking.musician_id);
//     const paymentStatus = await getPaymentStatus(booking.payment_id);

//     return {
//       bookingID: booking.booking_id,
//       paymentID: booking.payment_id,
//       status: paymentStatus,
//       listing: listing,
//       listingID: booking.listing_id,
//       provider: provider,
//       providerID: booking.user_id,
//       check_in: booking.check_in,
//       check_out: booking.check_out,
//       musician: musician,
//       musicianID: booking.musician_id,
//       edit: mdiPencil,
//       delete: mdiDelete,
//     };
//   });
// });

// console.log('General Data:', generalData.value);


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
    
function  deleteItem(item) {
      // Handle delete action
      console.log('Delete item:', item);
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








// onMounted(async () => {
//   try {
//     //fetch data from user sql table
//     //fetch data from space_listings sql table
//     //fetch data from bookings sql table
//     //fetch data from timeslot sql table
//     //fetch data from payment sql table
  
   

    
//   } catch (error) {
//     console.error(error);
//   }
// })
// const getCounts = async () => {
//   try {
//     const [userData, listingsData, bookingData, timeslotData, paymentData] = await Promise.all([
//       axios.get('http://localhost:8080/users/users'),
//       axios.get('http://localhost:8080/listings/'),
//       axios.get('http://localhost:8080/bookings/bookings'),
//       axios.get('http://localhost:8080/timeslot/timeslot'),
//       axios.get('http://localhost:8080/payment/payment/'),
//     ]);

//     console.log('Fetched users data:', userData.data);
//     console.log('Fetched space listings data:', listingsData.data);
//     console.log('Fetched bookings data:', bookingData.data);
//     console.log('Fetched timeslots data:', timeslotData.data);
//     console.log('Fetched payments data:', paymentData.data);

// const providerCount = userData.data.filter(item => item.status === 'provider').length;
// const musicianCount = userData.data.filter(item => item.status === 'musician').length;
// const listingCount = listingsData.data.filter(item => item.status === 'listing').length;
// const bookingCount = bookingData.data.filter(item => item.status === 'booking').length;


//     console.log('Provider Count:', providerCount);
//     console.log('Musician Count:', musicianCount);
//     console.log('Listing Count:', listingCount);
//     console.log('Booking Count:', bookingCount);

//     return {
//       providerCount,
//       musicianCount,
//       listingCount,
//       bookingCount,
//     };
//   } catch (error) {
//     console.error(error);
//     throw error; // Handle the error as needed
//   }
// };

// // Example usage
// const counts = await getCounts();


// const getCounts = () => {
// console.log('Fetched users data:', userDataResponse.data);
// console.log('Fetched space listings data:', listingsDataResponse.data);
// console.log('Fetched bookings data:', bookingDataResponse.data);
// console.log('Fetched timeslots data:', timeslotDataResponse.data);
// console.log('Fetched payments data:', paymentDataResponse.data);

//   const providerCount = generalData.value.filter(item => item.status === 'provider').length;
//   const musicianCount = generalData.value.filter(item => item.status === 'musician').length;
//   const listingCount = generalData.value.filter(item => item.status === 'listing').length;
//   const bookingCount = generalData.value.filter(item => item.status === 'booking').length;

//   console.log(providerCount);
//   console.log(musicianCount);
//   console.log(listingCount);
//   console.log(bookingCount);

//   return {
//     providerCount,
//     musicianCount,
//     listingCount,
//     bookingCount,
//   };
// };
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
          <v-btn class="mx-2">Edit Profile</v-btn>
          <v-btn class="mx-2">Delete Account</v-btn>
        </div>
       
    </div>

    <div class="mt-10">
         
         <div style="flex: 1; display: flex; justify-content: center; margin-top: 10px;">
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
             
             <div style="flex: 1; display: flex; justify-content: center; margin-top: 5px; margin-bottom: 5px;">
             <RouterLink to="/createListingAdmin" style="text-decoration: none;">
                 <Button text="Create Listing" style="margin: 5px; padding: 10px; background-color: black; color: #ffffff; border: none; border-radius: 5px; cursor: pointer;" />
             </RouterLink>

             <RouterLink to="/listingCard" style="text-decoration: none;">
                 <Button text="Create Booking" style="margin: 5px; padding: 10px; background-color: black; color: #ffffff; border: none; border-radius: 5px; cursor: pointer;" />
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
      <v-chip :color="getPaymentStatuses(item.paymentStatus)">
        {{ item.paymentStatus }}
      </v-chip>
    </template>

    <template v-slot:item.bookingStatus="{ item }">
      <v-chip :color="getBookingStatus(item.bookingStatus)">
        {{ item.bookingStatus }}
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
  </template>

<style scoped>
.custom-icon {
  color: black;
}
</style>
  
 
  
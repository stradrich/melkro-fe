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

const authStore = useAuthStores();
const userStore = useUserStores();
const listingStore = useListingStores();
const bookingStore = useBookingStores();
const paymentStore = usePaymentStores();

import axios from 'axios';

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

onMounted(async () => {
  try {
    const fetchData = async (url, targetRef, targetName) => {
      const response = await axios.get(url);
      targetRef.value = response.data;
      console.log(`Fetched ${targetName} data:`, targetRef.value);
    };

    // Fetch data from different tables
    await Promise.all([
      fetchData('http://localhost:8080/users/users', userData, 'users'),
      fetchData('http://localhost:8080/listings/', listingsData, 'space listings'),
      fetchData('http://localhost:8080/bookings/bookings', bookingData, 'bookings'),
      fetchData('http://localhost:8080/timeslot/timeslot', timeslotData, 'timeslots'),
      fetchData('http://localhost:8080/payment/payment/', paymentData, 'payments'),
    ]);

    // Populate generalData after fetching all necessary data
    const dataPromises = bookingData.value.map(async booking => {
      const listing = await getListingName(booking.listing_id);
      const provider = await getUserName(booking.user_id);
      const musician = await getUserName(booking.musician_id);
      const paymentStatus = await getPaymentStatus(booking.payment_id);

      return {
        bookingID: booking.booking_id,
        paymentID: booking.payment_id,
        status: paymentStatus,
        listing: listing,
        listingID: booking.listing_id,
        provider: provider,
        providerID: booking.user_id,
        check_in: booking.check_in,
        check_out: booking.check_out,
        musician: musician,
        musicianID: booking.musician_id,
        edit: mdiPencil,
        delete: mdiDelete,
      };
    });

    // Wait for all promises to resolve
    generalData.value = await Promise.all(dataPromises);

    console.log('General Data:', generalData.value);

  } catch (error) {
    console.error(error);
  }
});

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
  { title: 'Booking_ID', key: 'bookingID' },
  { title: 'Payment_ID', key: 'paymentID' },
  { title: 'Status', key: 'status' },
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
            bookingID: 1,
            paymentID: 'not found', 
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
            bookingID: 1,
            paymentID: 'not found', 
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
            bookingID: 1,
            paymentID: 'not found', 
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

const getPaymentStatus = async (paymentId) => {
  const payment = paymentData.value.find(item => item.payment_id === paymentId);
  return payment ? payment.status : 'N/A';
};



function editItem(item) {
      // Handle edit action
      console.log('Edit item:', item);
    }
    
function  deleteItem(item) {
      // Handle delete action
      console.log('Delete item:', item);
    }

const getStatus = (status) => {
  if (status === 'declined') return 'red';
  else if (status === 'pending') return 'orange';
  else return 'green';
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
             <RouterLink to="/" style="flex: 1; text-align: center;">You have 0 provider(s)</RouterLink>
             </div>

             <div style="display: flex; justify-content: center; margin-bottom: 1rem;">
             <RouterLink to="/" style="flex: 1; text-align: center;">You have 0 musician(s)</RouterLink>
             </div>

             <div style="display: flex; justify-content: center; margin-bottom: 1rem;">
             <RouterLink to="/" style="flex: 1; text-align: center;">You have 0 listing(s)</RouterLink>
             </div>
             
             <div style="display: flex; justify-content: center; margin-bottom: 1rem;">
             <RouterLink to="/" style="flex: 1; text-align: center;">You have 0 booking(s)</RouterLink>
             </div>
             
             <div style="flex: 1; display: flex; justify-content: center; margin-top: 5px; margin-bottom: 5px;">
             <RouterLink to="/" style="text-decoration: none;">
                 <Button text="Create Listing" style="margin: 5px; padding: 10px; background-color: black; color: #ffffff; border: none; border-radius: 5px; cursor: pointer;" />
             </RouterLink>

             <RouterLink to="/" style="text-decoration: none;">
                 <Button text="Create Booking" style="margin: 5px; padding: 10px; background-color: black; color: #ffffff; border: none; border-radius: 5px; cursor: pointer;" />
             </RouterLink>
             </div>

             <div style="flex: 1; display: flex; justify-content: center; margin-top: 20px;">
             <img :src="'/src/assets/atomic-music.png'" alt="">
             </div>
             </div>
         </div>
     </div>   

     <div style="flex: 1; display: flex; justify-content: center; margin-top: 2rem; margin-bottom: 2rem;">
       <RouterLink to="/" style="text-decoration: none;">
           <Button text="Edit Data" style="margin: 5px; padding: 10px; background-color: black; color: #ffffff; border: none; border-radius: 5px; cursor: pointer; margin-bottom: 5rem;" />
       </RouterLink>
     </div>

    <!-- <v-data-table :headers="headers" :items="bookingData" class="elevation-1 mt-10">
      <template v-slot:item.status="{ value }" >
        <v-chip :color="getStatus(value)">
          {{ value }}
        </v-chip>
      </template>

    
    </v-data-table> -->
    <!-- <v-data-table :headers="headers" :items="dummyData" class="elevation-1 mt-10"> -->
    <v-data-table v-if="generalData && generalData.length" :headers="headers" :items="generalData" class="elevation-1 mt-10">
    <template v-slot:item.status="{ value }">
      <v-chip :color="getStatus(value)">
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
  </template>

<style scoped>
.custom-icon {
  color: black;
}
</style>
  
 
  
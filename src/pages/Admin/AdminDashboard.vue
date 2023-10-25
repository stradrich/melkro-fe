<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable';
import '@mdi/font/css/materialdesignicons.css'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiPencil, mdiDelete, mdiAccount} from '@mdi/js';

import { ref, watch } from 'vue';
import Navbar from '../../components/Navbar.vue';
import Footer from '../../components/Footer.vue';
import DropdownMenu2Vue from '../../components/DropdownMenu2.vue';
import Button from '../../components/Button.vue';
// import UserIcon from '../../components/icons/UserIcon'
import { useAuthStores } from '../../stores/auth';

const authStore = useAuthStores();

const headers = [
  { title: 'Listing', align: 'start', sortable: false, key: 'listing' },
  { title: 'Listing_ID', key: 'listingID' },
  { title: 'Provider', key: 'provider' },
  { title: 'Booking_ID', key: 'bookingID' },
  { title: 'Timeslot', key: 'timeslot' },
  { title: 'Musician', key: 'musician' },
  { title: 'Payment_ID', key: 'paymentID' },
  { title: 'Status', key: 'status' },
  { title: 'Edit', key: 'edit' },
  { title: 'Delete', key: 'delete' },
];

const bookingData = [
        {
            listing: `Melkro Centrum`,
            listingID: 1,
            provider: 'stradrich',
            bookingID: 1,
            bookingID: 1,
            timeslot: '23:59',
            musician: 'stradrich',
            paymentID: 'not found', 
            status: 'pending',
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

const getStatus = (status) => {
  if (status === 'declined') return 'red';
  else if (status === 'pending') return 'orange';
  else return 'green';
};
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
    <v-data-table :headers="headers" :items="bookingData" class="elevation-1 mt-10">
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
  
 
  
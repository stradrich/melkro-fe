<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable';
import { ref, watch } from 'vue';
import Navbar from '../../components/Navbar.vue';
import Footer from '../../components/Footer.vue';
import Button from '../../components/Button.vue';
import { mdiAccount } from '@mdi/js'
// import { aliases, mdi } from 'vuetify/iconsets/mdi'
// import UserIcon from '../../components/icons/UserIcon'
import { useAuthStores } from '../../stores/auth';

const authStore = useAuthStores();

const headers = [
  { title: 'Listing', align: 'start', sortable: false, key: 'listing' },
  { title: 'Booking_ID', key: 'bookingID' },
  { title: 'Timeslot', key: 'timeslot' },
  { title: 'Provider', key: 'provider' },
  { title: 'Payment_ID', key: 'paymentID' },
  { title: 'Status', key: 'status' },
  // { title: 'Edit', key: 'edit', slot: 'editColumn' },
];

const bookingData = [
  {
    listing: `Melkro TEST`,
    bookingID: 1,
    timeslot: '00:00',
    provider: 'test',
    paymentID: 'not found',
    status: 'pending',
    // edit: 'mdi-pencil'

  },
];

const getStatus = (status) => {
  if (status === 'declined') return 'red';
  else if (status === 'pending') return 'orange';
  else return 'green';
};

const currentUserEmail = ref('');

// Watch for changes in authStore.currentUser
// watch(() => authStore.currentUser, async (newUser) => {
//   try {
//     await authStore.getCurrentUser(); // Assuming getCurrentUser is an async method
//     currentUserEmail.value = authStore.currentUser.email;
//   } catch (error) {
//     console.error(error);
//   }
// });
</script>

<!-- ProviderDashboard.vue -->
<template>
  <div>
      <Navbar/>

      <div class="mt-10 flex border">
         <!-- <UserIcon/> -->
        <div class="mt-5 ml-5">
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
            <!-- <span>{{  authStore.currentUser?.role}}</span> -->
        </div>

        <div class="mt-10 mb-5 ml-5">
          <v-btn class="mx-2">Edit Profile</v-btn>
          <v-btn class="mx-2">Delete Account</v-btn>
        </div>

        </div>
      
      <div class="mt-10">
         
        <div style="flex: 1; display: flex; justify-content: center; margin-top: 10px;">
            <img :src="'/src/assets/IMG_1277.jpg'" alt="">
        </div>
        
        <div>
            <div>
            <!-- <div style="display: flex; justify-content: center;">
            <RouterLink to="/" style="flex: 1; text-align: center;">You have 0 listing</RouterLink>
            </div> -->
            
            <div style="display: flex; justify-content: center;">
            <RouterLink to="/" style="flex: 1; text-align: center;">You have 0 booking(s)</RouterLink>
            </div>
            
            <div style="flex: 1; display: flex; justify-content: center; margin-top: 5px; margin-bottom: 5px;">
            <RouterLink to="/" style="text-decoration: none;">
                <Button text="Get a room, now!" style="margin: 5px; padding: 10px; background-color: black; color: #ffffff; border: none; border-radius: 5px; cursor: pointer; margin-bottom: 5rem;" />
            </RouterLink>
            </div>
            
            <div style="flex: 1; display: flex; justify-content: center; margin-top: 20px;">
              <img :src="'/src/assets/atomic-music.png'" alt="">
            </div>

            <div style="flex: 1; display: flex; justify-content: center; margin-top: 5rem; margin-bottom: 5px;">
            <RouterLink to="/" style="text-decoration: none;">
                <Button text="Edit booking" style="margin: 5px; padding: 10px; background-color: black; color: #ffffff; border: none; border-radius: 5px; cursor: pointer;" />
            </RouterLink>
            </div>
          </div>
        </div>
      </div>
      
    
     
    <v-data-table :headers="headers" :items="bookingData" class="elevation-1 mt-10">
      <template v-slot:item.status="{ value }">
        <v-chip :color="getStatus(value)">
          {{ value }}
        </v-chip>
        
        <!-- <v-btn class="mt-8 mb-8 ml-8">Hello</v-btn> -->
      </template>

      <!-- <template v-slot:item.editColumn="{ item }">
        <v-icon>{{ item.edit }}</v-icon>
      </template> -->

      
      
    </v-data-table>
    
 
    

    <Footer/>
  </div>
</template>

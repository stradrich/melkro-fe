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
// import { mdiAccount } from '@mdi/js'
// import { aliases, mdi } from 'vuetify/iconsets/mdi'
// import UserIcon from '../../components/icons/UserIcon'
import { useAuthStores } from '../../stores/auth';
import { useBookingStores } from '../../stores/booking';

const authStore = useAuthStores();
const bookingStore = useBookingStores();

import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const action = route.query.action;

const headers = [
  { title: 'Listing', align: 'start', sortable: false, key: 'listing' },
  { title: 'Booking_ID', key: 'bookingID' },
  { title: 'check_in', key: 'check_in' },
  { title: 'check_out', key: 'check_out' },
  { title: 'Owner', key: 'owner' },
  { title: 'Payment_ID', key: 'paymentID' },
  { title: 'Status', key: 'status' },
  { title: 'Edit', key: 'edit' },
  { title: 'Delete', key: 'delete' },
  // { title: 'Edit', key: 'edit', slot: 'editColumn' },
];

// Dummy Data, keep it here!
const bookingData = [
  {
    listing: `Melkro TEST`,
    bookingID: 1,
    check_in: '00:00',
    check_out: '00:00',
    owner: 'test',
    paymentID: 'not found',
    status: 'pending',
    edit: 'mdiPencil',
    delete: 'mdiDelete'
    // edit: 'mdi-pencil'

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

onMounted(async () => {
  try {
    const count = await  countBookingsByLoggedInUser();
    numberOfBookings.value = count;
    console.log(`The logged-in user has ${count} bookings.`);
  } catch (error) {
    console.error(error);
  }
});
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
            <RouterLink to="#" style="flex: 1; text-align: center;">
            You have {{ numberOfBookings }} booking(s)
          </RouterLink>
            </div>
            
            <div style="flex: 1; display: flex; justify-content: center; margin-top: 5px; margin-bottom: 5px;">
            <RouterLink to="listingCard" style="text-decoration: none;">
                <Button text="Get a room, now!" style="margin: 5px; padding: 10px; background-color: black; color: #ffffff; border: none; border-radius: 5px; cursor: pointer; margin-bottom: 5rem;" />
            </RouterLink>

      
            </div>
            
            <div style="flex: 1; display: flex; justify-content: center; margin-top: 20px;">
              <img :src="'/src/assets/atomic-music.png'" alt="">
            </div>

            <div style="flex: 1; display: flex; justify-content: center; margin-top: 5rem; margin-bottom: 5px;">
            <RouterLink  to="/UpdateBookingForm" style="text-decoration: none;">
                <Button text="Edit booking" style="margin: 5px; padding: 10px; background-color: black; color: #ffffff; border: none; border-radius: 5px; cursor: pointer;" />
            </RouterLink>
            </div>
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
  </div>
</template>


<style scoped>
.custom-icon {
  color: black;
}
</style>
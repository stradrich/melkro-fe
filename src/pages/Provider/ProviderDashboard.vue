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
import { useListingStores } from '../../stores/listing';


import { useRouter } from 'vue-router';
const router = useRouter();

const authStore = useAuthStores();
const listingStore = useListingStores();

const headers = [
  { title: 'Listing Name', align: 'start', sortable: false, key: 'listing' },
  { title: 'Booking_ID', key: 'bookingID' },
  { title: 'check_in', key: 'check_in' },
  { title: 'check_out', key: 'check_out' },
  { title: 'Musician', key: 'musician' },
  { title: 'Payment_ID', key: 'paymentID' },
  { title: 'Status', key: 'status' },
  { title: 'Edit', key: 'edit' },
  { title: 'Delete', key: 'delete' },
];

const bookingData = [
  {
    listing: `Melkro TEST`,
    bookingID: 1,
    check_in: '00:00',
    check_out: '00:00',
    musician: 'test',
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

const currentUserEmail = ref('');


const numberOfListings = ref(0);

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



// countListingsByLoggedInUser().then(numberOfListings => {
//   console.log(`The logged-in user has ${numberOfListings} listings.`);
// });

onMounted(async () => {
  try {
    const count = await countListingsByLoggedInUser();
    numberOfListings.value = count;
    console.log(`The logged-in user has ${count} listings.`);
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

        <div class="mt-10 mb-5 ml-5">
          <v-btn class="mx-2">Edit Profile</v-btn>
          <v-btn class="mx-2">Delete Account</v-btn>
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
            <RouterLink to="/" style="flex: 1; text-align: center;">You have 0 booking(s)</RouterLink>
            </div>
            
            <div style="flex: 1; display: flex; justify-content: center; margin-top: 2rem; margin-bottom: 5px;">
            <RouterLink to="/createListingForm" style="text-decoration: none;">
                <Button text="Create Listings" style="margin: 5px; padding: 10px; background-color: black; color: #ffffff; border: none; border-radius: 5px; cursor: pointer;" />
            </RouterLink>
            </div>

            <div style="flex: 1; display: flex; justify-content: center; margin-top: 5rem;">
             <img :src="'/src/assets/atomic-music.png'" alt="">
            </div>

            <div style="flex: 1; display: flex; justify-content: center; margin-top: 5rem; margin-bottom: 10px;">
            <RouterLink to="/" style="text-decoration: none;">
                <Button text="Edit Listing" style="margin: 5px; padding: 10px; background-color: black; color: #ffffff; border: none; border-radius: 5px; cursor: pointer; margin-bottom: 5rem;" />
            </RouterLink>
            <RouterLink to="/" style="text-decoration: none;">
                <Button text="Edit Booking" style="margin: 5px; padding: 10px; background-color: black; color: #ffffff; border: none; border-radius: 5px; cursor: pointer; margin-bottom: 5rem;" />
            </RouterLink>
            </div>

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




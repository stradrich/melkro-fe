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
    axios.get('http://localhost:8080/payment/payment/'),
  ]);

  userData.value = userDataResponse.data;
  listingsData.value = listingsDataResponse.data;
  bookingData.value = bookingDataResponse.data;
  timeslotData.value = timeslotDataResponse.data;
  paymentData.value = paymentDataResponse.data;

  // console.log('Fetched users data:', userData.value);
  // console.log('Fetched space listings data:', listingsData.value);
  // console.log('Fetched bookings data:', bookingData.value);
  // console.log('Fetched timeslots data:', timeslotData.value);
  // console.log('Fetched payments data:', paymentData.value);
};

const realData = ref([]);

// onMounted(async () => {
//   try {

//     // await fetchData();

//     // Populate generalData after fetching all necessary data
//     generalData.value = await getGeneralData();

//     console.log('General Data:', generalData.value);
//   } catch (error) {
//     console.error(error);
//   }
// });
onMounted(async () => {
  try {
    // Fetch data and populate generalData
    await fetchData();

    // Populate generalData after fetching all necessary data
    generalData.value = await getGeneralData();
    console.log('Type of generalData.value:', typeof generalData.value);
    console.log('General Data:', generalData.value);

   

    // Manipulate the data as needed and update realData
    realData.value = generalData.value.bookingData.map(item => ({
    paymentID: item.paymentData,
    paymentStatus: item.paymentStatus,
    bookingID: item.booking_id,
    listing: item.listing,
    // check_in: new Date(item.check_in).toLocaleString(),
    // check_out: new Date(item.check_out).toLocaleString(),
    check_in: item.check_in,
    check_out: item.check_out,
    musician: item.musician,
    musicianID: item.musicianID,
    edit: mdiPencil,
    delete: mdiDelete,
  }));


    console.log('Real Data:', realData.value);
  } catch (error) {
    console.error(error);
  }
});

const getGeneralData = async () => {
  try {
    await fetchData();

    console.log('Fetched users data:', userData.value);
    console.log('Fetched space listings data:', listingsData.value);
    console.log('Fetched bookings data:', bookingData.value);
    console.log('Fetched timeslots data:', timeslotData.value);
    console.log('Fetched payments data:', paymentData.value);

    // Additional data fetching or actions
    // const additionalData1 = await axios.get('http://localhost:8080/additionalData1');
    // const additionalData2 = await axios.get('http://localhost:8080/additionalData2');

    // console.log('Fetched additional data 1:', additionalData1.data);
    // console.log('Fetched additional data 2:', additionalData2.data);

    // Perform additional actions with the data if needed

    // Combine all data into a single object if needed
    const combinedData = {
      userData: userData.value,
      listingsData: listingsData.value,
      bookingData: bookingData.value,
      timeslotData: timeslotData.value,
      paymentData: paymentData.value,
    };

    return combinedData;
  } catch (error) {
    console.error(error);
    return null;
  }
};


const headers = [
  { title: 'Payment_ID', key: 'paymentID' },
  { title: 'Payment Status', key: 'paymentStatus'},
  { title: 'Booking_ID', key: 'bookingID' },
  { title: 'Listing Name', align: 'start', sortable: false, key: 'listing' },
  { title: 'check_in', key: 'check_in' },
  { title: 'check_out', key: 'check_out' },
  { title: 'Musician_ID', key: 'musicianID'},
  { title: 'Musician', key: 'musician' },
  { title: 'Edit', key: 'edit' },
  { title: 'Delete', key: 'delete' },
];

// template for realData
// const realData = [
//   {
//     paymentID: '',
//     paymentStatus: '',
//     bookingID: '',
//     listing: '',
//     check_in: '00:00',
//     check_out: '00:00',
//     musician: '',
//     musicianID: '',
//     edit: 'mdiPencil',
//     delete: 'mdiDelete'
//   },
// ];

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
          <v-btn to='/updateProfile' class="mx-2">Edit Profile</v-btn>
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

    <v-data-table :headers="headers" :items="realData" class="elevation-1 mt-10">
    <!-- <v-data-table :headers="headers" :items="dummyData" class="elevation-1 mt-10"> -->
    <!-- <template v-slot:item.status="{ value }">
      <v-chip :color="getStatus(value)">
        {{ value }}
      </v-chip>
    </template> -->
    <template v-slot:item.paymentID="{ item }">
      <td class="v-data-table__td v-data-table-column--align-start">
        {{ item.payment_id }}
      </td>
    </template>

    <template v-slot:item.paymentStatus="{ item }">
      <td class="v-data-table__td v-data-table-column--align-start">
        {{ item.paymentStatus }}
      </td>
    </template>

    <template v-slot:item.bookingID="{ item }">
      <td class="v-data-table__td v-data-table-column--align-start">
        {{ item.bookingID }}
      </td>
    </template>

    <template v-slot:item.listing="{ item }">
      <td class="v-data-table__td v-data-table-column--align-start">
        {{ item.listing }}
      </td>
    </template>

    <template v-slot:item.check_in="{ item }">
      <td class="v-data-table__td v-data-table-column--align-start">
        {{ item.check_in }}
        <!-- {{ new Date(it  em.check_in).toLocaleString() }} -->
      </td>
    </template>

    <template v-slot:item.check_out="{ item }">
      <td class="v-data-table__td v-data-table-column--align-start">
        {{ item.check_out }}
        <!-- {{ new Date(item.check_out).toLocaleString() }} -->
      </td>
    </template>

    <template v-slot:item.musician="{ item }">
      <td class="v-data-table__td v-data-table-column--align-start">
        {{ item.musician }}
      </td>
    </template>

    <template v-slot:item.musicianID="{ item }">
      <td class="v-data-table__td v-data-table-column--align-start">
        {{ item.musicianID }}
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
  </div>
</template>

<style scoped>
.custom-icon {
  color: black;
}
</style>




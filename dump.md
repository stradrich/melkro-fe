<script setup>
import Logo from './Logo.vue'
import NavMenu from './Navbar.vue'
import Button from './Button.vue';

import { useAuthStores } from '../stores/auth';
import { useUserStores } from '../stores/user'

const getUserData = async () => {
    // const user = await authStore.getCurrentUser()

    userData.id = user.id
    userData.role = user.role
}
</script>

<template>
    <div>
        This is NAVBAR
        <div>
            <Logo/>
            <label> Melkro </label>
        </div>

        <div>
            <!-- Logged in: Admin -->
            <template>
                <NavbarMenu nav-title="All Data" @click="goToAdminDashboard"/>
                                
                <DropdownMenu :user="getUserData()"/>
            </template>

            <!-- Logged in: Provider -->
            <template>
                <NavMenu nav-title="Listings" @click="goToListings"/>
                <NavMenu nav-title="Bookings" @click="goToBookings"/>
                                
                <DropdownMenu :user="getUserData()"/>
            </template>
            
            <!-- Logged in: Musician -->
            <template>
                <NavMenu nav-title="Bookings" @click="goToBookings"/>
                                
                <DropdownMenu :user="getUserData()"/>
            </template>
            
        </div>
    </div>
</template>









<!-- One listing can have many bookings (but...) -->
<!-- One booking can have many timeslots (but can't be overlapped)-->
<!-- One timeslot can ONLY have one booking -->


<!-- CREATE booking POST http://localhost:8080/bookings/bookings -->

<!-- Need to create a form -->
<!-- Json payload -->
<!-- { 
	"user_id": 1,
	"price_per_hour": 100.00,
	"address_link": "test",
	"pictures": "test",
	"availability": "test",
	"name": "test",
	"description": "test",
	"capacity": 1
} -->

<script setup>
import Navbar from '../../components/Navbar.vue'
import Footer from '../../components/Footer.vue'
import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.css';
import { ref, onMounted, watch } from 'vue';
import { useListingStores } from '../../stores/listing';
import { useAuthStores } from '../../stores/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const listingStore = useListingStores();
const authStore = useAuthStores();

const selectedDateTime = ref(null);

const flatpickrConfig = {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
};



const userId = ref(authStore.currentUser?.id || ''); // Initial value

watch(() => authStore.currentUser?.id, (newValue) => {
  userId.value = newValue || '';
});

const formData = ref({
  user_id: '',
  stripeProductId: '',
  price_per_hour: '',
  address_link: '',
  pictures: '',
  availability: '',
  name: '',
  description: '',
  capacity: '',
});



const createListing = async () => {
       
  try {
        // Ensure we have the user data
        if (!authStore.currentUser) {
        console.error('User data is not available.');
        return;
        }

           // Validate that required fields are not empty
        if (!authStore.currentUser.id || !formData.value.price_per_hour) {
        console.error('User ID and Price per Hour are required.');
        return;
        }

        console.log('CurrentUser:', authStore.currentUser?.username);
        console.log('UserID:', authStore.currentUser?.id);
        console.log('Price per Hour:', formData.value.price_per_hour);

        // Set the user ID in the form data
        formData.value.user_id = authStore.currentUser.id || authStore.currentUser?.value.id;
    
        console.log('Request Payload:', formData.value);
        
        // Wait for authStore.currentUser to be available
        await authStore.getCurrentUser();
        // console.log('authStore.currentUser after getCurrentUser:', authStore.getCurrentUser);

        // Validate that required fields are not empty
        if (!formData.value.price_per_hour) {
        console.error('Price per Hour is required.');
        return;
        }
        // await listingStore.createListing({ ...formData.value });

         // Set the user ID in the form data
        // formData.value.user_id = authStore.currentUser.value.id;

        await listingStore.createListing(formData.value);


    // Optionally, you can handle the response or perform other actions
    console.log('Listing created', listingStore.currentListings);

    // Optionally, you can reset the form fields after successful creation
    resetForm();
    router.push('/providerDashboard');
  } catch (error) {
    console.error('Listing creation error:', error);
    // Optionally, you can display an error message to the user
  }
};


const resetForm = () => {
//   userId.value = '';
  formData.value.stripeProductId = '';
  formData.value.price_per_hour = '';
  formData.value.address_link = '';
  formData.value.pictures = '';
  formData.value.availability = '';
  formData.value.name = '';
  formData.value.description = '';
  formData.value.capacity = '';
};

</script>

<template>

    <Navbar/>

      
    
    
    <v-sheet class="mt-2" width="300" style="margin: auto; margin-top: auto; margin-bottom: auto;">
     <img
      class="mx-auto mt-10 mb-10"
      width="300"
      height="300"
      src="/src/assets/fabulous-live-music-band-1.png"
      alt="live band"
      loading="lazy"
    />

    <div class="mb-10">CREATE BOOKING PAGE (for musician)</div>
     
      <v-form>
        <v-text-field v-model="listingId" label="Listing ID"></v-text-field>
        <!-- Provider ID -->
        <v-text-field v-model="userId" label="Provider ID" :readonly="true"></v-text-field>
        <!-- Musician ID -->
        <v-text-field v-model="userId" label="Musician ID" :readonly="true"></v-text-field>

        <!-- <v-date-picker></v-date-picker> -->

        <div>
            <label>Date and Time:</label>
            <flat-pickr v-model="selectedDateTime" :config="flatpickrConfig"></flat-pickr>
        </div>
      

        <div class="d-flex flex-column">
          <v-btn color="success" class="mt-4" block @click="createListing">
            Create Listing
          </v-btn>

          <v-btn color="warning" class="mt-4" block @click="updateListing">
            Update Listing
          </v-btn>
  
          <!-- <v-btn
            color="warning"
            class="mt-4"
            block
            @click="updateListing"
          >
            Update Listing
          </v-btn> -->
  
          <!-- <v-btn color="error" class="mt-4" block @click="deleteListing">
            Delete Listing
          </v-btn> -->
        </div>
      </v-form>
  
    </v-sheet>

    <Footer/>

   
  </template>



  <template>
    <flat-pickr v-model="date"/>
</template>

<script setup>
    import {ref} from 'vue';
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';

    const date = ref(null);
</script>



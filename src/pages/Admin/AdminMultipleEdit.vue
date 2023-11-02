<script setup>
import Navbar from '../../components/Navbar.vue';
import Footer from '../../components/Footer.vue';
import { ref, onMounted, watch, nextTick} from 'vue';
import flatpickr from "flatpickr";
import 'flatpickr/dist/themes/light.css';

import { useAuthStores } from '../../stores/auth';
import { useUserStores } from '../../stores/user';
import { useListingStores } from '../../stores/listing';
import { useBookingStores } from '../../stores/booking';
import { usePaymentStores } from '../../stores/payment'
import { useAdminStores } from '../../stores/admin'

import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

const authStore = useAuthStores();
const userStore = useUserStores();
const listingStore = useListingStores();
const bookingStore = useBookingStores();
const paymentStore = usePaymentStores();
const adminStore = useAdminStores();

const selectedPaymentStatus = ['incomplete','complete']; // Define the available roles
// const paymentStatus = ref(null); 

const selectedBookingStatus = ['pending', 'confirmed', 'cancelled', 'declined']
// const bookingStatus = ref(null); 

const rules = {
  required: v => !!v || 'This field is required',
};

const startDateContainer = ref(null);
const datetime = ref(null);

const flatpickrOptions = {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  defaultDate: 'today', // Set default date to today
  minDate: 'today', // Minimum date allowed
  minTime: '06:00', // Minimum time allowed
  maxTime: '23:00', // Maximum time allowed
};

const paymentID = ref(null);
const paymentStatus = ref(null);
const bookingID = ref(null);
const bookingStatus = ref(null);
const listing = ref(null);
const listingID = ref(null)
const provider = ref(null)
const providerID = ref(null)
const check_in = ref(null);
const check_out = ref(null);
const musician = ref(null);
const musicianID = ref(null);

onMounted(async () => {
    await nextTick();

    const startDateInput = startDateContainer.value.querySelector('#start-datetime');
    const endDateInput = startDateContainer.value.querySelector('#end-datetime');

    flatpickr(startDateInput, { ...flatpickrOptions });
    flatpickr(endDateInput, { ...flatpickrOptions });
  try {
    const selectedItem = adminStore.selectedItem;
    console.log('Selected Item (to be edited) from Dashboard', selectedItem);

        // Set initial values for v-model properties
        paymentID.value = selectedItem.paymentID;
        paymentStatus.value = selectedItem.paymentStatus;
        bookingID.value = selectedItem.bookingID;
        bookingStatus.value = selectedItem.bookingStatus;
        listing.value = selectedItem.listing;
        listingID.value = selectedItem.listingID;
        provider.value = selectedItem.provider;
        providerID.value = selectedItem.providerID;
        check_in.value = selectedItem.check_in;
        check_out.value = selectedItem.check_out;
        musician.value = selectedItem.musician;
        musicianID.value = selectedItem.musicianID;



  } catch (error) {
    console.error(error);
  }
});



</script>

<template>
  <Navbar />


  <v-sheet class="mt-2" width="300" style="margin: auto; margin-top: auto; margin-bottom: auto;">
    <img
      class="mx-auto mt-10 mb-10"
      width="800"
      height="800"
      src="/src/assets/polar-musical-trumpet.gif"
      alt="space"
      loading="lazy"
    />

    <div class="mx-16 mb-3">
        <div>Edit Multiple Tables</div>
    </div>
    <div class="mx-auto mb-10">users, listings, bookings, timeslot, payment</div>

<!-- 
        bookingID
        : 
        1
        bookingStatus
        : 
        "confirmed"
        check_in
        : 
        "2023-10-20T02:00:00.000Z"
        check_out
        : 
        "2023-10-21T06:00:00.000Z"
        delete
        : 
        "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
        edit
        : 
        "M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"
        listing
        : 
        "Space 0"
        listingID
        : 
        1
        musician
        : 
        "test2"
        musicianID
        : 
        3
        paymentID
        : 
        1
        paymentStatus
        : 
        "completed"
        provider
        : 
        "test1"
        providerID
        : 
        2 -->
    <v-form>
        <p class="mb-2">Update Payment Table</p>
        <v-text-field v-model="paymentID" label="Payment ID"></v-text-field>
        <!-- <v-text-field v-model="paymentStatus" label="Payment Status"></v-text-field> -->
        <v-select
        v-model="paymentStatus"
        :items="selectedPaymentStatus"
        label="Select Payment Status"
        :rules="[rules.required]"
        variant="filled"
        color="deep-purple"
        ></v-select>

        <p class="mb-2">Update Booking Table</p>
        <v-text-field v-model="bookingID" label="Booking ID"></v-text-field>
        <!-- <v-text-field v-model="bookingStatus" label="Booking Status"></v-text-field> -->
        <v-select
        v-model="bookingStatus"
        :items="selectedBookingStatus"
        label="Select Booking Status"
        :rules="[rules.required]"
        variant="filled"
        color="deep-purple"
        ></v-select>

        <p class="mb-2">Update Listing Table</p>
        <v-text-field v-model="listing" label="Listing Name"></v-text-field>
        <v-text-field v-model="listingID" label="Listing ID"></v-text-field>

        <p class="mb-2">Update Booking & Timeslot Table</p>
        <v-text-field v-model="check_in" label="Check In"></v-text-field>
        <v-text-field v-model="check_out"  label="Check Out"></v-text-field>

        <div ref="startDateContainer" class="row border-b mb-10">
          <div class="col-md-6">
            <div class="form-group">
              <div>
                <label for="date" class="mr-5">Check in:</label>
                <input ref="datetime" type="text" class="form-control flatpickr" id="start-datetime"/>
                
                <!-- <input type="date" class="form-control flatpickr" id="date"/> -->
              </div>
            </div>
          </div>


          <div class="col-md-6">
            <div class="form-group">
              <div>
                <label for="time" class="mr-3">Check out:</label>
                <input type="text" class="form-control flatpickr" id="end-datetime" />
                <!-- <input type="time" class="form-control flatpickr" id="time" /> -->
              </div> 
            </div>  
          </div>
        </div>

        <p class="mb-2">Update User Table</p>
        <v-text-field v-model="provider" label="Provider Name"></v-text-field>
        <v-text-field v-model="providerID" label="Provider ID"></v-text-field>
        <v-text-field v-model="musician" label="Musician Name"></v-text-field>
        <v-text-field v-model="musicianID" label="Musician ID"></v-text-field>
  

        <div class="d-flex flex-column">
          <!-- <v-btn color="success" class="mt-4" block @click="createListing">
            Create Listing
          </v-btn> -->
  
          <v-btn
            color="warning"
            class="mt-4"
            block
            @click="() => listingStore.updateListing(formData)"
              >
              <router-link to='/adminDashboard'>
                Update Listing
              </router-link>
          </v-btn>
  
          <!-- <v-btn color="error" class="mt-4" block @click="deleteListing">
            Delete Listing
          </v-btn> -->
        </div>
      </v-form>

  </v-sheet>

  <Footer />
</template>








<!-- <template> -->

    <!-- <Navbar/> -->

    <!-- <div>{{ JSON.stringify(listingStore.currentListings) }}</div> -->
   
  

    <!-- <div>{{ formData.listing_id }}</div> -->

    <!-- <div>{{ userId }}</div> -->

    <!-- <div>{{ console.log('Listing ID in template:',  listingStore.currentListings?.listing_id) }}</div> -->




    
    <!-- <v-sheet class="mt-2" width="300" style="margin: auto; margin-top: auto; margin-bottom: auto;"> -->
     <!-- <img
      class="mx-auto mt-10 mb-10"
      width="100"
      height="100"
      src="/src/assets/IMG_0912.JPG"
      alt="space"
      loading="lazy"
    /> -->

    <!-- <div class="mb-10">CREATE LISTING PAGE (for space provider)</div> -->
   

      <!-- <v-form> -->
        <!-- <v-text-field v-model="userId" label="User ID" :readonly="true"></v-text-field> -->
        
        <!-- <v-text-field v-model="formData.listing_id" label="Listing ID"></v-text-field> -->

        <!-- <v-text-field v-model="listingId" label="Listing ID"></v-text-field> -->
        <!-- <v-text-field v-model="computedListingId" label="Listing ID" :readonly="true"></v-text-field> -->
        <!-- <v-text-field label="Lisitng ID" :readonly="true">{{ console.log('Listing ID in template:', listingId) }}</v-text-field> -->
        <!-- <v-text-field v-model="listingId" label="Listing ID"></v-text-field> -->


        <!-- <v-text-field v-model="formData.name" label="Name for your space"></v-text-field> -->
  
        <!-- <v-text-field v-model="formData.description" label="Description"></v-text-field> -->
  
        <!-- <v-text-field
          v-model="formData.capacity"
          label="Number of people preferred"
        ></v-text-field> -->
  
        <!-- GOOGLE MAP API? -->
        <!-- <v-text-field v-model="formData.address_link" label="Location"></v-text-field> -->
  
        <!-- <v-text-field v-model="formData.price_per_hour" label="Rate per hour"></v-text-field> -->
  
        <!-- Add v-model bindings for the remaining fields -->
        <!-- <v-text-field v-model="formData.user_id" label="User ID"></v-text-field> -->
        

        <!-- Add v-model bindings for the other fields similarly -->
        <!-- v-model="createStripeProductId.field_name" label="Field Label" -->
  
      

        <!-- <div>
          <v-file-input chips multiple label="Upload listing photo"></v-file-input>
          <v-file-input
            small-chips
            multiple
            label="Upload listing photo"
          ></v-file-input>
        </div> -->
  
        <!-- <div class="d-flex flex-column"> -->
          <!-- <v-btn color="success" class="mt-4" block @click="createListing">
            Create Listing
          </v-btn> -->
  
          <!-- <v-btn
            color="warning"
            class="mt-4"
            block
            @click="updateListing()"
          >
            Update Listing
          </v-btn> -->
  
          <!-- <v-btn color="error" class="mt-4" block @click="deleteListing">
            Delete Listing
          </v-btn> -->
        <!-- </div> -->
      <!-- </v-form> -->
  
    <!-- </v-sheet> -->

    <!-- <Footer/> -->

   
  <!-- </template> -->
  
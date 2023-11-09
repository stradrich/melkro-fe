<script setup>
import Navbar from '../../components/Navbar.vue'
import Footer from '../../components/Footer.vue'
import flatpickr from "flatpickr";
import 'flatpickr/dist/themes/light.css';
import axios from 'axios';

import { ref, onMounted, watch, nextTick, reactive,  toRefs, computed } from 'vue';
import { useListingStores } from '../../stores/listing';
import { useAuthStores } from '../../stores/auth';
import { useBookingStores } from '../../stores/booking';
import { useTimeslotStores } from '../../stores/timeslot';
import { usePaymentStores } from '../../stores/payment'

import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

// console.log('Current Route Path:', router.currentRoute.value.path);
// const isCreateBookingRoute = router.currentRoute.value.path === '/createBookingForm';
// const isCreateBookingRoute = router.currentRoute.value.path === '/listingCard';
// console.log('isCreateBookingRoute:', isCreateBookingRoute);

// const isUpdateBookingRoute = route.path.includes('/createBookingForm');
// const isUpdateBookingRoute = route.path.includes('/musicianDashboard');




const listingStore = useListingStores();
const authStore = useAuthStores();
const bookingStore = useBookingStores();
const timeslotStore = useTimeslotStores();
const paymentStore = usePaymentStores();

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




const datetimeRef = ref(null);

// onMounted(async () => {
//   await nextTick();

//   const { clickedListingId, ownerId, musicianId, check_in, check_out } = bookingStore;
//   // const { clickedListingId, ownerId, musicianId } = toRefs(bookingStore);
//   console.log('Booking Info from store:', clickedListingId, ownerId, musicianId, check_in, check_out);     

//   try {
//     const flatpickrInstance = datetimeRef.value?.flatpickrRef;

//     if (flatpickrInstance) {
//       console.log('Flatpickr version:', flatpickr.version);
//       // You can do additional configuration or operations with flatpickrInstance if needed
//     } else {
//       console.error('Flatpickr instance not available.');

//       const startDateInput = startDateContainer.value.querySelector('#start-datetime');
//       const timeInput = startDateContainer.value.querySelector('#end-datetime');

//       flatpickr(startDateInput, { ...flatpickrOptions }); 
//       flatpickr(timeInput, { ...flatpickrOptions }); 
//     }
//   } catch (error) {
//     console.error('Error initializing Flatpickr:', error);
//   }
// });
onMounted(async () => {
  const getAllTimeslot = await axios.get(`http://localhost:8080/timeslot/timeslot`);
        const timeslotData = getAllTimeslot.data
        console.log(`Timeslot Data`, timeslotData);

  await nextTick();

  const startDateInput = startDateContainer.value.querySelector('#start-datetime');
  const endDateInput = startDateContainer.value.querySelector('#end-datetime');

  flatpickr(startDateInput, { ...flatpickrOptions });
  flatpickr(endDateInput, { ...flatpickrOptions });
});


const formData = reactive({
  listingId: bookingStore.clickedListingId,
  ownerId: bookingStore.ownerId,
  musicianId: bookingStore.musicianId,
  check_in: bookingStore.check_in,
  check_out: bookingStore.check_out,
  // check_in: bookingStore.check_in,
  // check_out: bookingStore.check_out,
  status:  bookingStore.status,
  reminder:  '',
  required_equipments: '',
  other_remark:  '',
  purpose: '',
  first_instrument:  '',
});

function logFormData() {
  console.log('Listing ID:', bookingStore.clickedListingId.value);
  console.log('Owner ID:', bookingStore.ownerId.value);
  console.log('Musician ID:', bookingStore.musicianId.value);
  console.log('Form Data:', formData);
  };

async function createTimeslot() {
   await timeslotStore.createTimeslot(formData)
}


async function createBooking() {
   // Wait for the next tick to ensure formData values are updated by flatpickr
   await nextTick();

  console.log('Inside createBooking:', formData);

  // call create booking in pinia
  console.log('Creating booking');
  console.log('Booking data needed: listing ID, provider ID, musician ID, Check In, Check Out');
 // call create timeslot in pinia
  console.log('Create Timeslot');
  console.log('You will be redirected to Payment page, if you wish to confirm your Booking, please click on the Stripe Payment Link');

// console.log(formData.value.listingId);
// console.log(formData.value.ownerId);
// console.log(formData.value.musicianId);
// console.log(formData.value.check_in);
// console.log(formData.value.check_out);

  console.log('Listing ID:', formData.listingId);
  console.log('Owner ID:', formData.ownerId);
  console.log('Musician ID:', formData.musicianId);
  console.log('Check In:', formData.check_in);
  console.log('Check Out:', formData.check_out);


  if (!formData.check_in && !formData.check_out) {
        console.error('Check in and Check out, date and time required!');
        return;
        }

  try {
    // NEED TO CHECK FOR OVERLAPPING TIMESLOT
    // Create Timeslot
    // await timeslotStore.createTimeslot(formData)
    // await createTimeslot();

    await bookingStore.createBooking(formData);

      // Call createBooking and log the auto-generated booking_id
    //  const createdBooking = await bookingStore.createBooking(formData);

  console.log('Auto-generated Booking ID:', bookingStore.booking_id);

  console.log('Booking created successfully!');

  router.push('/stripePaymentLink')
  // resetForm();
  } catch (error) {
  console.log('Error creating booking', error);
  }

}

const resetForm = () => {
  formData.value.listingId = '',
  formData.value.ownerId = '',
  formData.value.musicianId = '',
  formData.value.check_in = '',
  formData.value.check_out = ''
};






</script>

<template>

    <Navbar/>

      
    
    
    <v-sheet class="mx-auto mt-2" width="300" style="margin: auto; margin-top: auto; margin-bottom: auto;">
     <img
      class="mx-auto mt-10 mb-10"
      width="300"
      height="300"
      src="/src/assets/fabulous-live-music-band-1.png"
      alt="live band"
      loading="lazy"
    />

    <div class="mb-10">CREATE BOOKING PAGE (for musician)</div>
     
    <!-- Test -->
    <!-- <p>ClickedListingId: {{ bookingStore.clickedListingId }}</p> -->
    <!-- <p>OwnerUserId: {{ bookingStore.ownerId }}</p> -->
    <!-- <p>MusicianId: {{ bookingStore.musicianId }}</p> -->



      <v-form>
        <!-- Listing ID -->
        <v-text-field  @input="logFormData" v-model="bookingStore.clickedListingId" label="Listing ID"></v-text-field>
        <!-- Provider ID -->
        <v-text-field @input="logFormData" v-model="bookingStore.ownerId" label="Provider ID"></v-text-field>
        <!-- Musician ID -->
        <v-text-field @input="logFormData" v-model="bookingStore.musicianId" label="Musician or Admin ID"></v-text-field>
        <!-- Listing ID -->
        <!-- <p>{{bookingStore.clickedListingId}}</p> -->
        <!-- <v-text-field  v-model="formData.listingId" label="Listing ID"></v-text-field> -->
        <!-- Provider ID -->
        <!-- <p>{{ bookingStore.ownerId }}</p> -->
        <!-- <v-text-field  v-model="formData.ownerId" label="Provider ID"></v-text-field> -->
        <!-- Musician ID -->
        <!-- <p>{{ bookingStore.musicianId }}</p> -->
        <!-- <v-text-field  v-model="formData.musicianId" label="Musician ID"></v-text-field> -->

         <!-- Booking ID -->
         <!-- <v-text-field label="Booking ID" :readonly="true"></v-text-field> -->
         <!-- Booking Status -->
         <!-- <v-text-field label="Booking Status" :readonly="true"></v-text-field> -->
         <!-- Payment ID -->
         <!-- <v-text-field label="Payment ID" :readonly="true"></v-text-field> -->
         <!-- Payment Status -->
         <!-- <v-text-field label="Payment Status" :readonly="true"></v-text-field> -->


        <!-- <v-date-picker></v-date-picker> -->

        <div ref="startDateContainer" class="row border-b">
          <div class="col-md-6">
            <div class="form-group">
              <div>
                <label for="date" class="mr-5">Check in:</label>
                <input v-model="formData.check_in" ref="datetime" type="text" class="form-control flatpickr" id="start-datetime"/>
                
                <!-- <input type="date" class="form-control flatpickr" id="date"/> -->
              </div>
            </div>
          </div>


          <div class="col-md-6">
            <div class="form-group">
              <div>
                <label for="time" class="mr-3">Check out:</label>
                <input v-model="formData.check_out" type="text" class="form-control flatpickr" id="end-datetime" />
                <!-- <input type="time" class="form-control flatpickr" id="time" /> -->
              </div> 
            </div>  
          </div>
        </div>


  


        <div class="d-flex flex-column">
          <!-- <v-btn color="success" class="mt-4" block > -->
          <v-btn color="success" class="mt-4" block @click="createBooking">
            Create Booking
          </v-btn>

          <!-- <v-btn v-else-if="route.path === '/CreateBookingForm'" color="warning" class="mt-4" block> -->
          <!-- <v-btn color="warning" class="mt-4" block> -->
          <!-- <v-btn color="warning" class="mt-4" block @click="updateBooking"> -->
            <!-- Update Booking -->
          <!-- </v-btn> -->
  
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
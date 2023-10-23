<script setup>
import Navbar from '../../components/Navbar.vue'
import Footer from '../../components/Footer.vue'
import flatpickr from "flatpickr";
import 'flatpickr/dist/themes/light.css';


import { ref, onMounted, watch, nextTick } from 'vue';
import { useListingStores } from '../../stores/listing';
import { useAuthStores } from '../../stores/auth';
import { useBookingStores } from '../../stores/booking';
import { useRouter } from 'vue-router';

const route = useRouter();
const listingStore = useListingStores();
const authStore = useAuthStores();
const bookingStore = useBookingStores();

const startDateContainer = ref(null);
const datetime = ref(null);

const flatpickrOptions = {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
};




const datetimeRef = ref(null);

onMounted(async () => {
  await nextTick();

  const { clickedListingId, ownerId, musicianId } = bookingStore;
  console.log('Booking Info from store:', clickedListingId, ownerId, musicianId);

  try {
    const flatpickrInstance = datetimeRef.value?.flatpickrRef;

    if (flatpickrInstance) {
      console.log('Flatpickr version:', flatpickr.version);
      // You can do additional configuration or operations with flatpickrInstance if needed
    } else {
      console.error('Flatpickr instance not available.');

      const startDateInput = startDateContainer.value.querySelector('#start-datetime');
      const timeInput = startDateContainer.value.querySelector('#end-datetime');

      flatpickr(startDateInput, { ...flatpickrOptions }); 
      flatpickr(timeInput, { ...flatpickrOptions }); 
    }
  } catch (error) {
    console.error('Error initializing Flatpickr:', error);
  }
});










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
     
    <!-- Test -->
    <!-- <p>ClickedListingId: {{ bookingStore.clickedListingId }}</p> -->
    <!-- <p>OwnerUserId: {{ bookingStore.ownerId }}</p> -->
    <!-- <p>MusicianId: {{ bookingStore.musicianId }}</p> -->



      <v-form>
        <!-- Listing ID -->
        <v-text-field v-model="bookingStore.clickedListingId" label="Listing ID"></v-text-field>
        <!-- Provider ID -->
        <v-text-field v-model="bookingStore.ownerId" label="Provider ID" :readonly="true"></v-text-field>
        <!-- Musician ID -->
        <v-text-field v-model="bookingStore.musicianId" label="Musician ID" :readonly="true"></v-text-field>
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
                <label for="date" class="mr-5">Start:</label>
                <input ref="datetime" type="text" class="form-control flatpickr" id="start-datetime"/>
                
                <!-- <input type="date" class="form-control flatpickr" id="date"/> -->
              </div>
            </div>
          </div>


          <div class="col-md-6">
            <div class="form-group">
              <div>
                <label for="time" class="mr-7">End:</label>
                <input type="text" class="form-control flatpickr" id="end-datetime" />
                <!-- <input type="time" class="form-control flatpickr" id="time" /> -->
              </div> 
            </div>  
          </div>
        </div>


 
      

        <div class="d-flex flex-column">
          <v-btn color="success" class="mt-4" block >
          <!-- <v-btn color="success" class="mt-4" block @click="createBooking"> -->
            Create Listing
          </v-btn>

          <v-btn color="warning" class="mt-4" block>
          <!-- <v-btn color="warning" class="mt-4" block @click="updateBooking"> -->
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
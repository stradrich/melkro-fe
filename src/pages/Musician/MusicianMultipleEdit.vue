// one user, can have 3 roles
// Admin can do all CRUD
// Authorized users can have many listings
// One listing can have many bookings
// One booking can have many timeslot 
// One booking can have one payment 

<script setup>
import Navbar from '../../components/Navbar.vue';
import Footer from '../../components/Footer.vue';
import DropdownMenu2 from '../../components/DropdownMenu2.vue';
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

const selectedPaymentStatus = ['incomplete','completed']; // Define the available roles
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
    // Fetch the current user details
    // const currentUser = await authStore.getCurrentUser();
    // console.log('Current User:', currentUser);
    // console.log('Access Token:', currentUser.accessToken);
    console.log('Fetching current user... ');
    const accessToken = localStorage.getItem('access_token');
    console.log(accessToken, 'by Admin Mutliple Edit Page');

 

  const currentUser = await authStore.getCurrentUser();
  const userID = currentUser.id;
  const userName = currentUser.username;
  const userEmail = currentUser.email;
  const password = currentUser.password;
  const userRole = currentUser.userRole;
  console.log(userID);
  console.log(userName);
  console.log(userEmail);
  console.log(password);
  console.log(userRole);

   // Get BOOKING's data (target: status) prep for update
   
//  const userResponse = await axios.get(`http://localhost:8080/users/${userID}`)
const userResponse = await axios.get(`https://melkro-api-dev-pbcxdasz4q-as.a.run.app/users/${userID}`)
 console.log(userResponse.data.id);
 console.log(userResponse.data.username);
 console.log(userResponse.data.email);
 console.log(userResponse.data.password);
console.log(userResponse.data.role);
  
  

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
        provider.value = selectedItem.owner;
        providerID.value = selectedItem.ownerID;
        check_in.value = selectedItem.check_in;
        check_out.value = selectedItem.check_out;

        musician.value = userName
        musicianID.value = userID

        // musician.value = selectedItem.musician;
        // musicianID.value = selectedItem.musicianID;



  } catch (error) {
    console.error(error);
  }
});

import axios from 'axios'; 

const updateData = async () => {
  // Log out the data from v-text-field and input fields
  console.log('Payment ID:', paymentID.value); // ✅
  console.log('Payment Status:', paymentStatus.value); // ✅
  console.log('Booking ID:', bookingID.value); // ✅
  console.log('Booking Status:', bookingStatus.value); // ✅
  console.log('Listing:', listing.value); // ✅
  console.log('Listing ID:', listingID.value); // ✅
  console.log('Provider:', provider.value);// ✅
  console.log('Provider ID:', providerID.value);// ✅
  console.log('Check In:', check_in.value); // Use bookingID (timeslot DB logic is off)
  console.log('Check Out:', check_out.value); // Use bookingID (timeslot DB logic is off)

  console.log('Musician:', musician.value); // 
  console.log('Musician ID:', musicianID.value);// 

  const userProviderID =  providerID.value
  const userMusicianID =  musicianID.value
  const currentListingID = listingID.value
  const currentPaymentID = paymentID.value
  const currentBookingID = bookingID.value

  // By passing backend verifyToken
  console.log('Fetching current user for authorization... ');
  const accessToken = localStorage.getItem('access_token');
  console.log(accessToken, 'by Update Data Function');

  // Get MUSICIAN's data (target: username) prep for update
  
  // const userMusicianResponse = await axios.get(`http://localhost:8080/users/${userMusicianID}`, {
    const userMusicianResponse = await axios.get(`https://melkro-api-dev-pbcxdasz4q-as.a.run.app/users/${userMusicianID}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  // Musician data, used for auto filling up email and password field, only then we match the JSON payload
  const userMusician = userMusicianResponse.data;


  // Get PROVIDER's data (target: username) prep for update
  
  // const userProviderResponse = await axios.get(`http://localhost:8080/users/${userProviderID}`, {
    const userProviderResponse = await axios.get(`https://melkro-api-dev-pbcxdasz4q-as.a.run.app/users/${userProviderID}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  // Provider data, used for auto filling up email and password field, only then we match the JSON payload
  const userProvider = userProviderResponse.data;


  // Get LISTING's data (target: name) prep for update
  
  // const listingResponse = await axios.get(`http://localhost:8080/listings/listing/${currentListingID}`);
  const listingResponse = await axios.get(`https://melkro-api-dev-pbcxdasz4q-as.a.run.app/listings/listing/${currentListingID}`);
  // Listing data, used for auto filling up listing_id, user_id, price_per_hour, address_link, pictures, availability, description, capacity, stripeProductId field, only then we match the JSON payload
  const listingDatabyID = listingResponse.data
  console.log(`Listing Data from DB`,listingDatabyID);

  
  // Get PAYMENT's data (target: status) prep for update
 
  // const paymentResponse = await axios.get(`http://localhost:8080/payment/payment/${currentPaymentID}`)
  const paymentResponse = await axios.get(`https://melkro-api-dev-pbcxdasz4q-as.a.run.app/payment/payment/${currentPaymentID}`)
  // Payment data, used for auto filling up listing_id, user_id, price_per_hour, address_link, pictures, availability, description, capacity, stripeProductId field, only then we match the JSON payload
  const paymentDatabyID = paymentResponse.data
  console.log(`Payment Data from DB`, paymentDatabyID);

  // Get BOOKING's data (target: status) prep for update
  
  // const bookingResponse = await axios.get(`http://localhost:8080/bookings/bookings/${currentBookingID}`)
  const bookingResponse = await axios.get(`https://melkro-api-dev-pbcxdasz4q-as.a.run.app/bookings/bookings/${currentBookingID}`)
  // Booking data, used for auto filling up email and password field, only then we match the JSON payload
  const bookingDatabyID = bookingResponse.data
  console.log(`Booking Data from DB`, bookingDatabyID);

  // Get TIMESLOT's data (target: check_in and check out) prep for update
  // Booking data, used for auto filling up user_id and booking_id, only then we match the JSON payload
  // const timeslotResponse = await axios.get(`http://localhost:8080/timeslot/timeslot/${currentTimeslotID}`)

  const currentUser = await authStore.getCurrentUser();
  const userID = currentUser.id;
  const userName = currentUser.username;
  const userEmail = currentUser.email;
  const password = currentUser.password;
  const userRole = currentUser.userRole;


  console.log(userID);
  console.log(userName);
  console.log(userEmail);
  console.log(password);
  console.log(userRole);

 // Get BOOKING's data (target: status) prep for update
 
//  const userResponse = await axios.get(`http://localhost:8080/users/${userID}`)
const userResponse = await axios.get(`https://melkro-api-dev-pbcxdasz4q-as.a.run.app/users/${userID}`)
console.log(userResponse.data.role);

  try {
    // UPDATE Musician's username
    // Construct the data object to send to the server
    const userDataMusician = {
      user_id: userID, // AUTO FILLED but data depending who is logging in
      username: userName, // 𝌡
      email: userResponse.data.email, // AUTO FILLED but data depending who is logging in
      password: userResponse.data.password, // AUTO FULLED original but data depending who is logging in
      role: userResponse.data.role // AUTO FILLED but data depending who is logging in
    };

    // UPDATE Provider's username
    // Construct the data object to send to the server
    const userDataProvider = {
      user_id: musician.user_id, // AUTO FILLED original data from DB
      username: musician.value, // 𝌡
      email: userProvider.email, // AUTO FILLED original data from DB
      password: userProvider.password, // AUTO FULLED original data from DB
      role: 'musician' // AUTO FILLED original data from DB
    };

    // UPDATE Listing's name
     // Construct the data object to send to the server
    const newlistingData = {
      listing_id: listingDatabyID.listing_id, // AUTO FILLED original data from DB
      user_id: listingDatabyID.user_id,  // AUTO FILLED original data from DB
      price_per_hour: listingDatabyID.price_per_hour, // AUTO FILLED original data from DB
      address_link: listingDatabyID.address_link, // AUTO FILLED original data from DB
      pictures: listingDatabyID.pictures, // AUTO FILLED original data from DB
      availability: listingDatabyID.availability, // AUTO FILLED original data from DB
      name: listing.value, // 𝌡
      description: listingDatabyID.description, // AUTO FILLED original data from DB
      capacity: listingDatabyID.capacity, // AUTO FILLED original data from DB
      stripeProductId: listingDatabyID.stripeProductId // AUTO FILLED original data from DB
    };

    // UPDATE Payment's status
     // Construct the data object to send to the server
     const newPaymentData = {
    booking_id: paymentDatabyID.booking_id, // AUTO FILLED original data from DB
    amount: paymentDatabyID.amount, // AUTO FILLED original data from DB
    amount_total: paymentDatabyID.amount_total, // AUTO FILLED original data from DB
    payment_method: paymentDatabyID.payment_method, // AUTO FILLED original data from DB
    payment_method_types: paymentDatabyID.payment_method_types, // AUTO FILLED original data from DB
    status: paymentStatus.value // 𝌡
     }

     // UPDATE Booking's status
     // Construct the data object to send to the server
     const newBookingData = {
      listing_id: bookingDatabyID.listing_id, // AUTO FILLED original data from DB
      user_id: bookingDatabyID.user_id, // AUTO FILLED original data from DB
      status: bookingStatus.value, // 𝌡
      reminder: bookingDatabyID.reminder, // AUTO FILLED original data from DB
      check_in: check_in.value, // MUST BE IN SYNC WITH TIMESLOT
      check_out: check_out.value, // MUST BE IN SYNC WITH TIMESLOT
      required_equipments: bookingDatabyID.required_equipments, // AUTO FILLED original data from DB
      other_remarks: bookingDatabyID.other_remarks, // AUTO FILLED original data from DB
      purpose: bookingDatabyID.purpose, // AUTO FILLED original data from DB
      first_instrument: bookingDatabyID.first_instrument, // AUTO FILLED original data from DB
      capacity: bookingDatabyID.capacity // AUTO FILLED original data from DB
     }


   // Make PUT request to update the musician username
   
    // const responseMusician = await axios.put(`http://localhost:8080/users/${userID}`, userDataMusician, {
      const responseMusician = await axios.put(`https://melkro-api-dev-pbcxdasz4q-as.a.run.app/users/${userID}`, userDataMusician, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

     // Make PUT request to update the provider username
     
    //  const responseProvider = await axios.put(`http://localhost:8080/users/${userProviderID}`, userDataProvider, {
      const responseProvider = await axios.put(`https://melkro-api-dev-pbcxdasz4q-as.a.run.app/users/${userProviderID}`, userDataProvider, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Make PUT request to update lising's name
    
    // const responseListing = await axios.put(`http://localhost:8080/listings/listing/${currentListingID}`, newlistingData);
    const responseListing = await axios.put(`https://melkro-api-dev-pbcxdasz4q-as.a.run.app/listings/listing/${currentListingID}`, newlistingData);

    // Make PUT request to update payment's status
    
    // const responsePayment = await axios.put(`http://localhost:8080/payment/payment/${currentPaymentID}`, newPaymentData);
    const responsePayment = await axios.put(`https://melkro-api-dev-pbcxdasz4q-as.a.run.app/payment/payment/${currentPaymentID}`, newPaymentData);

    // Make PUT request to update booking's status
    
    // const responseBooking = await axios.put(`http://localhost:8080/bookings/bookings/${currentBookingID}`, newBookingData);
    const responseBooking = await axios.put(`https://melkro-api-dev-pbcxdasz4q-as.a.run.app/bookings/bookings/${currentBookingID}`, newBookingData);
    
      // Check if the update was successful
    if (responseMusician.status === 200 && responseProvider.status === 200 && responseListing.status === 200 && responsePayment.status === 200 && responseBooking.status === 200) { 
      console.log('User data updated successfully:', responseMusician.data, responseProvider.data);
      console.log('Listing data updated successfully:', responseListing.data);
      console.log('Payment data updated successfully:', responsePayment.data);
      console.log('Booking data updated successfully:', responseBooking.data);
      console.log('check in and check out updated on Booking DB, currently not in sync with Timeslot DB');
      router.push('/musicianDashboard')
      // Add any additional logic or notifications for a successful update
    } else {
      console.error('Failed to update user data:', responseMusician.data, responseProvider.data);
      console.log('Failed to update listing data', responseListing.data);
      console.log('Failed to update payment data', responsePayment.data);
      console.log('Failed to update booking data', responseBooking.data);
      // Handle the error, show a notification, or redirect the user
    }
  } catch (error) {
    console.error('Error updating user data:', error);
    console.error('Error updating listing data:', error);
    console.error('Error updating payment data:', error);
    console.error('Error updating booking data:', error);
    // Handle the error, show a notification, or redirect the user
     // Log the entire Axios error object
     if (error.isAxiosError) {
      console.error('Axios Error Details:', error.toJSON());
      // router.push('/generalErrorPage')
    }
}
  
};



</script>

<template>
  <Navbar />
  <DropdownMenu2/>


  <v-sheet class="mx-auto mt-2" width="350" style="margin: auto; margin-top: auto; margin-bottom: auto;">
    <div class="mx-16 mt-16 mb-5">
        <div style="font-size: 20px; display: none;">Edit Multiple DB Tables</div>
    </div>
    <!-- <div class="mx-auto mb-5">users, listings, bookings, timeslot, payment</div> -->
    <div class="mx-10"  style="display: none;">listings, bookings, timeslot, payment</div>
    
    <img
      class="mx-auto mt-5 mb-16"
      width="800"
      height="800"
      src="/src/assets/polar-musical-trumpet.gif"
      alt="space"
      loading="lazy"
    />


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
        <p class="mb-2 text-5xl" style="font-size: 20px; display: none;">Update Payment Table</p>
        <v-text-field style="display: none;" v-model="paymentID" label="Payment ID"></v-text-field>
        <!-- <v-text-field v-model="paymentStatus" label="Payment Status"></v-text-field> -->
        <v-select
        style="display: none;"
        v-model="paymentStatus"
        :items="selectedPaymentStatus"
        label="Select Payment Status"
        :rules="[rules.required]"
        variant="filled"
        color="deep-purple"
        :readonly="true"
        ></v-select>

        <p class="mb-2" style="font-size: 20px; display: none;">Update Booking Table</p>
        <v-text-field style="display: none;" v-model="bookingID" label="Booking ID"></v-text-field>
        <!-- <v-text-field v-model="bookingStatus" label="Booking Status"></v-text-field> -->
        <v-select
        style="display: none;"
        v-model="bookingStatus"
        :items="selectedBookingStatus"
        label="Select Booking Status"
        :rules="[rules.required]"
        variant="filled"
        color="deep-purple"
        :readonly="true"
        ></v-select>

        <p class="mb-2" style="font-size: 20px; display: none;">Update Listing Table</p>
        <v-text-field  style="display: none;" v-model="listing" label="Listing Name" :readonly="true"></v-text-field>
        <v-text-field style="display: none;" v-model="listingID" label="Listing ID"></v-text-field>

        <p class="mb-2" style="font-size: 20px;">Update Booking & Timeslot Table</p>
        <v-text-field v-model="check_in" label="previous check in selection" :readonly="true"></v-text-field>
        <v-text-field v-model="check_out"  label="previous check out selection" :readonly="true"></v-text-field>

        <div ref="startDateContainer" class="row border-b mb-10">
          <div class="col-md-6">
            <div class="form-group">
              <div>
                <label for="date" class="mr-5">New Check in:</label>
                <!-- <input ref="datetime" type="text" class="form-control flatpickr" id="start-datetime"/> -->
                <input v-model="check_in" type="text" class="form-control flatpickr" id="start-datetime"/>  
              
              </div>
            </div>
          </div>


          <div class="col-md-6">
            <div class="form-group">
              <div>
                <label for="time" class="mr-3">New Check out:</label>
                <!-- <input type="text" class="form-control flatpickr" id="end-datetime" /> -->
                <input v-model="check_out" type="text" class="form-control flatpickr" id="end-datetime" />
              </div> 
            </div>  
          </div>
        </div>

        <p class="mb-2" style="display: none; font-size: 20px;">Update User Table</p>
        <v-text-field style="display: none;" v-model="provider" label="Provider Name"></v-text-field>
        <v-text-field style="display: none;" v-model="providerID" label="Provider ID"></v-text-field>
        <v-text-field style="display: none;" v-model="musician" label="Musician Name"></v-text-field>
        <v-text-field style="display: none;" v-model="musicianID" label="Musician ID"></v-text-field>
  

        <div class="d-flex flex-column">
          <!-- <v-btn color="success" class="mt-4" block @click="createListing">
            Create Listing
          </v-btn> -->
  
          <v-btn
            color="warning"
            class="mt-4"
            block
            @click="updateData"
              >
              <router-link to='#'>
              <!-- <router-link to='/adminDashboard'> -->
                Update Data
              </router-link>
          </v-btn>
  
          <!-- <v-btn color="error" class="mt-4" block @click="deleteListing">
            Delete Listing
          </v-btn> -->
        </div>
      </v-form>

  </v-sheet>

  <Footer/>
</template>








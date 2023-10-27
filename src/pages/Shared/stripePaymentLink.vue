<script setup>
import Navbar from '../../components/Navbar.vue'
import Footer from '../../components/Footer.vue'
import DropdownMenu2 from '../../components/DropdownMenu2.vue';
import Button from '../../components/Button.vue';

import SvgIcon from '@jamescoyle/vue-icon';
import { mdiGoogle, mdiApple } from '@mdi/js';

import { ref, onMounted, watch, nextTick, reactive,  toRefs, computed } from 'vue';
import { useUserStores } from '../../stores/user';
import { useListingStores } from '../../stores/listing';
import { useAuthStores } from '../../stores/auth';
import { useBookingStores } from '../../stores/booking';
import { useTimeslotStores } from '../../stores/timeslot';
import { usePaymentStores } from '../../stores/payment'

import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

const userStore = useUserStores();
const listingStore = useListingStores();
const authStore = useAuthStores();
const bookingStore = useBookingStores();
const timeslotStore = useTimeslotStores();
const paymentStore = usePaymentStores();

const services = ['add on', 'no add on']; // Define the available roles
const selectedService = ref(null); 

// async function createPayment() {
//     console.log('Creating payment, you will receive a stripe payment link');
//     console.log('Complete booking with Stripe Payment, please click the provided link');
// }

const rules = {
  required: v => !!v || 'This field is required',
};

// async function createPayment() {
//     console.log('Creating payment, you will receive a stripe payment link');
//     console.log('Complete booking with Stripe Payment, please click the provided link');
    
//     try {
//         const data = {
//             bookingId: bookingStore.booking_id,
//             hourlyRate: listingStore.currentListings.price_per_hour,
//             totalCost: totalCost.value,
//             // add other necessary data as needed in the future
//         };

//         console.log('Creating payment with data:', data);
//         console.log('Complete booking with Stripe Payment, please click the provided link');

//         // Call the Pinia store action to create the payment
//         await paymentStore.createPayment(
//             bookingStore.booking_id,
//             listingStore.currentListings.price_per_hour,
//             totalCost.value
//             // Add other parameters as needed
//         );

//         // Add your logic to handle payment creation
//         // You can access the data properties like data.bookingId, data.hourlyRate, etc.
//         // For example, you can make an API call to create the payment
//         // const response = await somePaymentAPI.createPayment(data);

//         // Handle the response as needed
//         // console.log('Payment creation response:', response);

//         // ... (remaining logic)

//     } catch (error) {
//         console.error('Error creating payment:', error);
//     }
// }

async function createPayment() {
    console.log('Creating payment, you will receive a stripe payment link');
    console.log('Complete booking with Stripe Payment, please click the provided link');
    
    try {

        if (!selectedService.value) {
            // If no service is selected, show a message and return
            alert('Please select a service before proceeding with payment.');
            // You might also show a user-friendly message on the UI
            return;
        }
       

        const data = {
            bookingId: bookingStore.booking_id,
            hourlyRate: listingStore.currentListings.price_per_hour,
            totalCost: totalCost.value,
            // add other necessary data as needed in the future
        };

        console.log('Creating payment with data:', data);
        console.log('Complete booking with Stripe Payment, please click the provided link');

        let checkoutSessionUrl;

        // Check if "add on" is selected
        if (selectedService.value === 'add on') {
            const addonsData = {
                listingId: listingStore.currentListings.listing_id,
                hours: bookingHours.value,
                addons: [
                    // Add your addon details here
                    {
                        "priceId": "price_1Nk2V9GjGLAwb5UuoVWmX6BG",
                        "qty": 1
                    },
                    {
                        "priceId": "price_1NkNgSGjGLAwb5Uu7jvAfrdx",
                        "qty": 1
                    },
                    {
                        "priceId": "price_1NvB4ZGjGLAwb5UuaSTTXgEo",
                        "qty": 1
                    }
                ],
            };

            const response = await fetch('http://localhost:8080/stripe/create-checkout-session/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(addonsData),
            });

            const responseData = await response.json();
            checkoutSessionUrl = responseData.url;
        } else {
            // "no add on" scenario
            const noAddOnData = {
                listingId: listingStore.currentListings.listing_id,
                hours: bookingHours.value,
            };

            const response = await fetch('http://localhost:8080/stripe/create-checkout-session/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(noAddOnData),
            });

            const responseData = await response.json();
            checkoutSessionUrl = responseData.url;
        }

        // Open a new tab with the Stripe checkout session URL
        window.open(checkoutSessionUrl, '_blank');

        // ... (remaining logic)

    } catch (error) {
        console.error('Error creating payment:', error);
    }
}





// onMounted(async () => {
//     const { clickedListingId, ownerId, musicianId } = bookingStore;
//     console.log('Booking Info from store:', clickedListingId, ownerId, musicianId);

//         // Fetch listing details using the clickedListingId
//         await listingStore.getListingsByID(clickedListingId);

        
//         // Fetch owner details using the ownerId
//         await userStore.getUserByID(ownerId);

//         // Now you can access the details
//         const listing = listingStore.currentListings;
//         const owner = userStore.currentUser;

//     console.log('Listing name', listingStore.name)
//     console.log('Owner name', owner.username)
//     console.log('Hourly-rate', listing.price_per_hour)
//     console.log('Check-in:', bookingStore.check_in, 'Check-out:', bookingStore.check_out);
    

//     // Additional logic as needed
// });

// onMounted(async () => {
//     const { clickedListingId, ownerId, musicianId } = bookingStore;
//     console.log('Booking Info from store:', clickedListingId, ownerId, musicianId);

//     try {
//         // Fetch listing details using the clickedListingId
//         await listingStore.getListingsByID(clickedListingId);

//         // Fetch owner details using the ownerId
//         await userStore.getUserByID(ownerId);

//         // Now you can access the details
//         await nextTick(); // Wait for the next tick to ensure the DOM has been updated

//            // Log the entire listingStore.currentListings object
//            console.log('Current Listings:', listingStore.currentListings);

//         // Now you can access the details
//         const listing = listingStore.currentListings;
//         const owner = userStore.currentUser;
        
//         // Log the owner object
//         console.log('Owner Object:', owner);

//         console.log('Listing name', listingStore.currentListings);
//         console.log('Owner name', owner.username);
//         console.log('Hourly-rate', listing.price_per_hour);
//         console.log('Check-in:', bookingStore.check_in, 'Check-out:', bookingStore.check_out);
//     } catch (error) {
//         console.error(error);
//     }
// });

onMounted(async () => {
    const { clickedListingId, ownerId, musicianId } = bookingStore;
    console.log('Booking Info from store:', clickedListingId, ownerId, musicianId);
    console.log('BookingStore ClickedListingID:', clickedListingId);
    console.log('BookingStore OwnerId:', ownerId);
    console.log('BookingStore MusicianId:', musicianId);
    console.log('BookingStore:', bookingStore.booking_id);


    try {
        // Fetch listing details using the clickedListingId
        await listingStore.getListingsByID(clickedListingId);

        // Fetch owner details using the ownerId
        await userStore.getUserByID(ownerId);

        // Now you can access the details
        await nextTick(); // Wait for the next tick to ensure the DOM has been updated

        // Now you can access the details
        const listing = listingStore.currentListings;
        const owner = userStore.user;
        console.log(userStore.user);

        console.log('Hourly-rate', listing.price_per_hour);
        console.log('Check-in:', bookingStore.check_in, 'Check-out:', bookingStore.check_out);
        console.log('Owner name', owner.username);
        console.log('Booking ID', bookingStore.booking_id);
    } catch (error) {
        console.error(error);
    }
});

const bookingHours = computed(() => {
    const checkIn = new Date(bookingStore.check_in);
    const checkOut = new Date(bookingStore.check_out);
    const hoursDifference = (checkOut - checkIn) / (1000 * 60 * 60);
    return hoursDifference;
});

const totalCost = computed(() => {
    const rawTotal = listingStore.currentListings.price_per_hour * bookingHours.value;
    return rawTotal.toFixed(2);
});


</script>

<template>

    <Navbar/>
    <DropdownMenu2/>

    <div style="flex: 1; display: flex; justify-content: center; margin-top: 1rem;  margin-bottom: 2rem;">
             <img :src="'/src/assets/bao-meditation-in-garden-1.png'" alt="">
    </div>

    <div style="display: flex; justify-content: center; margin-bottom: 1rem;">
        <p>Dear {{ authStore.currentUser.username }}</p> 
    </div>

    <div style="display: flex; justify-content: center;">
        <p>You are booking {{ listingStore.currentListings.name }} provided by {{ userStore.user.username }} </p> 
    </div>

    <div style="display: flex; justify-content: center; margin-top: 2rem; margin-bottom: 2rem;">
        <div>
            <div style="display: flex; justify-content: center; margin-right; margin-right: 2rem;">
                <p>From:</p> 
            </div>
        
            <div style="display: flex; justify-content: center; margin-right: 2rem;">
                {{ bookingStore.check_in }} 
            </div>
        </div>
    
        <div>
            <div style="display: flex; justify-content: center; margin-left: 2rem;">
                To:
            </div>
        
            <div style="display: flex; justify-content: center; margin-left: 2rem;">
                {{ bookingStore.check_out  }}
            </div>
        </div>

    </div>

    <div style="flex: 1; display: flex; justify-content: center; margin-top: 1rem;  margin-bottom: 1rem;">
             <img src="../../assets/bonbon-line-hands-playing-the-violin-as-a-hobby.png" alt="">
    </div>


    <div style="display: flex; justify-content: center;">
        <p>Your current booking is {{ bookingHours }} hour(s) long</p> 
    </div>

    <div style="display: flex; justify-content: center; margin-bottom: 2rem;">
        <p>Which amounts to ${{ totalCost }}</p> 
    </div>

    <!-- <div style="display: flex; justify-content: center;">
        <p>To reduce clunky commute, you are encouraged to rent our instruments</p> 
    </div> -->

    <!-- <div style="flex: 1; display: flex; justify-content: center; margin-top: 1rem;  margin-bottom: 1rem;">
             <img src="../../assets/abstract-902.gif" alt="">
    </div> -->

    <div style="display: flex; justify-content: center; margin-bottom: 3rem;">
        <p>Please complete payment to secure your booking timeslot </p> 
    </div>


    <div v-show="false" style="display: flex; justify-content: center; margin-top: 2rem; margin-bottom: 2rem;">
        <div style="display: none;">
            <!-- Testing data flow, DO NOT DELETE THIS-->
            <p>Listing name: {{ listingStore.currentListings.name }}</p>
            <p>ClickedListingId: {{ bookingStore.clickedListingId }}</p>
            <p>Owner name: {{ userStore.user.username }}</p>
            <p>OwnerUserId: {{ bookingStore.ownerId }}</p>
            <p>Musician name: {{ authStore.currentUser.username }}</p>
            <p>MusicianId: {{ bookingStore.musicianId }}</p>
            <p>Listing hourly rate: {{ listingStore.currentListings.price_per_hour }}</p>
            <p>BookingId: {{  bookingStore.booking_id}}</p>
            <p>Booking hours: {{ bookingStore.check_out }} minus {{ bookingStore.check_in }}</p>
            <p>Listing hourly rate * Booking hours: {{ listingStore.currentListings.price_per_hour }} * x hours </p> 
            <p>Add ons?</p>
        </div>
    </div>
   
   

   

        <!-- <div style="display: flex; justify-content: center;">
            <Button text="Pay Now" @click="createPayment" />
        </div> -->

        <v-sheet width="300" class="mx-auto">
            <v-form fast-fail @submit.prevent>
                <!-- "booking_id": 4,
                "amount": 150.00,
                "amount_total": 500.00,
                "payment_method": "Credit Card",
                "payment_method_types": ["card"],
                "status": "incomplete" -->
            <v-text-field v-model=" bookingStore.booking_id" label="Booking ID"></v-text-field>
            <v-text-field v-model=" listingStore.currentListings.price_per_hour" label="Hourly Rate"></v-text-field>
            <v-text-field v-model="totalCost " label="Total Cost"></v-text-field>
            <!-- <v-text-field label="Payment Method"></v-text-field> -->
            <!-- <v-text-field label="Payment Method Types?"></v-text-field> -->
            <!-- <v-text-field label="Status"></v-text-field> -->
            <div class="mx-5 mb-2">
                <p>To reduce clunky commute, you are encouraged to rent our instruments</p> 
            </div>
            
            <v-select
                v-model="selectedService"
                :items="services"
                label="services"
                :rules="[rules.required]"
                variant="filled"
                color="deep-purple"
            ></v-select>

            <div style="display: flex; justify-content: center;  margin-top: 2rem;  margin-bottom: 1rem;">
                 <div>
                    <p>Proceed to your stripe payment link: </p>  
                </div>
            </div>

            <!-- Add rules here, must select services -->
            <div style="display: flex; justify-content: center;">
                <Button text="Pay Now" @click="createPayment" />
            </div>
            <!-- <v-btn type="submit" block class="mt-2">Submit</v-btn> -->
            </v-form>
        </v-sheet>

        
        <!-- <svg-icon type="mdi" :path="mdiGoogle"></svg-icon> -->
        <!-- <svg-icon type="mdi" :path="mdiApple"></svg-icon> -->
    <Footer/>

   
  </template>
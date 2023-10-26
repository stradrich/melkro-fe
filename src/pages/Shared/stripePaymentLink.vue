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

async function createPayment() {
    console.log('Creating payment, you will receive a stripe payment link');
    console.log('Complete booking with Stripe Payment, please click the provided link');
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
    return listingStore.currentListings.price_per_hour * bookingHours.value;
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

    <div style="display: flex; justify-content: center;">
        <p>To reduce clunky commute, you are encouraged to rent our instruments</p> 
    </div>

    <!-- <div style="flex: 1; display: flex; justify-content: center; margin-top: 1rem;  margin-bottom: 1rem;">
             <img src="../../assets/abstract-902.gif" alt="">
    </div> -->

    <div style="display: flex; justify-content: center;">
        <p>Please complete payment to secure your booking timeslot </p> 
    </div>

    

    <div style="display: flex; justify-content: center; margin-top: 2rem; margin-bottom: 2rem;">
        <div>
            <!-- Test -->
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
   
   

    <div style="display: flex; justify-content: center;  margin-top: 2rem;  margin-bottom: 1rem;">
       <div>
           <p>Proceed to your stripe payment link: </p>  
        </div>
    </div>
        <div style="display: flex; justify-content: center;">
            <Button text="Pay Now" @click="createPayment" />
        </div>

      
    
        <!-- <svg-icon type="mdi" :path="mdiGoogle"></svg-icon> -->
        <!-- <svg-icon type="mdi" :path="mdiApple"></svg-icon> -->
    <Footer/>

   
  </template>
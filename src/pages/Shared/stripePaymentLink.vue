<script setup>
import Navbar from '../../components/Navbar.vue'
import Footer from '../../components/Footer.vue'
import Button from '../../components/Button.vue';

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



onMounted(async () => {
    const { clickedListingId, ownerId, musicianId } = bookingStore;
    console.log('Booking Info from store:', clickedListingId, ownerId, musicianId);

        // Fetch listing details using the clickedListingId
        await listingStore.getListingsByID(clickedListingId);

        // Fetch owner details using the ownerId
        const user = await userStore.getUserByID(ownerId);


        // Now you can access the details
        const listing = listingStore.currentListings;
        const owner = userStore.currentUser;

    console.log('Listing name', listingStore.name)
    console.log('Owner name', user.name)
    console.log('Hourly-rate', listing.price_per_hour)
    console.log('Check-in:', bookingStore.check_in, 'Check-out:', bookingStore.check_out);
    

    // Additional logic as needed
});


</script>

<template>

    <Navbar/>

    <div style="flex: 1; display: flex; justify-content: center; margin-top: 5rem;  margin-bottom: 2rem;">
             <img :src="'/src/assets/bao-meditation-in-garden-1.png'" alt="">
    </div>

    <div style="display: flex; justify-content: center;">
        <p>Please complete payment to secure your booking</p> 
    </div>

    <div style="display: flex; justify-content: center; margin-top: 2rem; margin-bottom: 2rem;">
        <div>
            <!-- Test -->
            <p>Listing name: {{ listingStore.name }}</p>
            <p>ClickedListingId: {{ bookingStore.clickedListingId }}</p>
            <p>OwnerUserId: {{ bookingStore.ownerId }}</p>
            <p>MusicianId: {{ bookingStore.musicianId }}</p>
            <p>Listing hourly rate: {{ listingStore.price_per_hour }}</p>
            <p>Booking hours: {{ bookingStore.check_out }} minus {{ bookingStore.check_in }}</p>
            <p>Listing hourly rate * Booking hours: </p> 
        </div>
    </div>
   
   

    <div style="display: flex; justify-content: center;  margin-top: 2rem;  margin-bottom: 1rem;">
       <div>
           <p>Get your stripe payment link: </p>  
        </div>
    </div>
        <div style="display: flex; justify-content: center;">
            <Button text="Pay Now" @click="createPayment" />
        </div>
    
    <Footer/>

   
  </template>
<script setup>
 import { VDataTable } from 'vuetify/labs/VDataTable'
 import Navbar from '../../components/Navbar.vue';
 import Footer from '../../components/Footer.vue';

const headers = [
  { title: 'Listing', align: 'start', sortable: false, key: 'listing' },
  { title: 'Booking_ID', key: 'bookingID' },
  { title: 'Timeslot', key: 'timeslot' },
  { title: 'Payment_ID', key: 'paymentID' },
  { title: 'Status', key: 'status' }
];

const bookingData = [
        {
            listing: `Melkro Centrum`,
            bookingID: 1,
            timeslot: '09:00',
            paymentID: 'not found', 
            status: 'pending'
          },
];

const getStatus = (status) => {
  if (status === 'declined') return 'red';
  else if (status === 'pending') return 'orange';
  else return 'green';
};
</script>

<!-- ProviderDashboard.vue -->
<template>
    <Navbar/>

    <v-data-table :headers="headers" :items="bookingData" class="elevation-1 mt-10">
      <template v-slot:item.status="{ value }">
        <v-chip :color="getStatus(value)">
          {{ value }}
        </v-chip>
      </template>
    </v-data-table>

    <Footer/>
  </template>
  
 
  
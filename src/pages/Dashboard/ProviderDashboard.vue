<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable';
import { ref, watch } from 'vue';
import Navbar from '../../components/Navbar.vue';
import Footer from '../../components/Footer.vue';
import { useAuthStores } from '../../stores/auth';

const authStore = useAuthStores();

const headers = [
  { title: 'Listing', align: 'start', sortable: false, key: 'listing' },
  { title: 'Booking_ID', key: 'bookingID' },
  { title: 'Timeslot', key: 'timeslot' },
  { title: 'Musician', key: 'musician' },
  { title: 'Payment_ID', key: 'paymentID' },
  { title: 'Status', key: 'status' }
];

const bookingData = [
  {
    listing: `Melkro TEST`,
    bookingID: 1,
    timeslot: '00:00',
    musician: 'test',
    paymentID: 'not found',
    status: 'pending'
  },
];

const getStatus = (status) => {
  if (status === 'declined') return 'red';
  else if (status === 'pending') return 'orange';
  else return 'green';
};

const currentUserEmail = ref('');

// Watch for changes in authStore.currentUser
watch(() => authStore.currentUser, async (newUser) => {
  try {
    await authStore.getCurrentUser(); // Assuming getCurrentUser is an async method
    currentUserEmail.value = authStore.currentUser.email;
  } catch (error) {
    console.error(error);
  }
});
</script>

<!-- ProviderDashboard.vue -->
<template>
  <div>
    <Navbar/>
    <h1>TEST</h1>
    <h1>{{ currentUserEmail }}</h1>
    <v-data-table :headers="headers" :items="bookingData" class="elevation-1 mt-10">
      <template v-slot:item.status="{ value }">
        <v-chip :color="getStatus(value)">
          {{ value }}
        </v-chip>
      </template>
    </v-data-table>
    <Footer/>
  </div>
</template>

<!-- <script setup>
import { ref } from 'vue';
import Navbar from '../../components/Navbar.vue';
import Footer from '../../components/Footer.vue';

// Hard code data
const listings = ref([
  {
    listing_id: 1,
    stripeProductId: "prod_OldlW8YFR5I2jg",
    user_id: 2,
    price_per_hour: "100.00",
    address_link: "test",
    pictures: "",
    availability: "",
    name: "test",
    description: "test",
    capacity: 1,
    createdAt: "2023-10-06T05:22:15.000Z",
    updatedAt: "2023-10-06T05:22:16.000Z"
  },
  // Add more listings as needed
]);

const dynamicListings = ref(listings.map(listing => ({
  src: listing.pictures || '/src/assets/placeholder.jpg',
  alt: listing.name,
  name: listing.name,
  description: listing.description,
  price: `${listing.price_per_hour}`,
  locationLink: listing.address_link,
  map: listing.pictures || '/src/assets/placeholder-map.jpg',
})));

</script> -->

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '../../components/Navbar.vue';
import Footer from '../../components/Footer.vue';
import { useListingStore } from 'your-path-to-listing-store';

const listingStore = useListingStore();
const dynamicListings = ref([]);

const router = useRouter();
const userId = ref(null);
const listingId = ref(null);

onMounted(async () => {
  // Check if the route has a "users" or "listing" param
  if (router.currentRoute.value.params.users) {
    // Fetch listings based on user ID
    userId.value = router.currentRoute.value.params.users;
    await fetchListingsByUserId();
  } else if (router.currentRoute.value.params.listing) {
    // Fetch a specific listing by ID
    listingId.value = router.currentRoute.value.params.listing;
    await fetchListingById();
  } else {
    // Fetch all listings
    await fetchAllListings();
  }
});

async function fetchAllListings() {
  // Use your Pinia store method to fetch all listings
  dynamicListings.value = await listingStore.getAllListings();
}

async function fetchListingsByUserId() {
  // Use your Pinia store method to fetch listings by user ID
  dynamicListings.value = await listingStore.getListingsByUserId(userId.value);
}

async function fetchListingById() {
  // Use your Pinia store method to fetch a specific listing by ID
  dynamicListings.value = await listingStore.getListingById(listingId.value);
}

</script>

<template>
  <Navbar />

  <div style="display: flex; flex-wrap: wrap; justify-content: center; margin-bottom: 0; margin-top: 5rem;">
    <div v-for="(listing, index) in dynamicListings" :key="index" style="width: 200px; margin: 10px;">
      <div>
        <h4 style="display: flex; align-items: center;">
          <b>{{ listing.name }}</b>
        </h4>
        <div style="display: flex; justify-content: space-between;">
          <p>{{ listing.description }}</p>
          <p>{{ listing.price }}</p>
        </div>
      </div>
      <img :src="listing.src" :alt="listing.alt" style="width: 100%; height: 100%; object-fit: cover;">
    </div>
  </div>

  <!-- Add more sections as needed -->

  <Footer />
</template>

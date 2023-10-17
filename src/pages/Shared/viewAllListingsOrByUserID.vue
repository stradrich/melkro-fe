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
import DropdownMenu2 from '../../components/DropdownMenu2.vue';
import { ref, onMounted, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import Button from '../../components/Button.vue'
import Navbar from '../../components/Navbar.vue';
import Footer from '../../components/Footer.vue';
import { useListingStores } from '../../stores/listing';
import { useAuthStores } from '../../stores/auth';
import UpdateDeleteListing from '../../../../music-space-frontend/music-space-frontend/src/views/UpdateDeleteListing.vue';

const formData = ref({
  user_id: '',
  listing_id: '',
  stripeProductId: '',
  price_per_hour: '',
  address_link: '',
  pictures: '',
  availability: '',
  name: '',
  description: '',
  capacity: '',
});

const listingStore = useListingStores();
const authStore = useAuthStores();

const dynamicListings = ref([]);

const router = useRouter();
const userId = ref(null);
const listingId = ref(null);

// const handleVerification = async () => {
//   try {
//     // Retrieve verification token from localStorage
//     const verificationToken = localStorage.getItem('access_token');

//     // Check if the token is present
//     if (!verificationToken) {
//       console.error('Verification token not found in localStorage');
//       // Handle error as needed
//       return;
//     }

//     // Access your Pinia store
//     const authStore = useAuthStores();

//     // Make the request to the backend
//     const response = await fetch('http://localhost:8080/auth/verify', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ verificationToken }),
//     });

//     const data = await response.json();

//     // Handle the response data as needed
//     console.log(data);

//     // Assuming you have a method in your store to handle verification response
//     authStore.handleVerificationResponse(data);

//   } catch (error) {
//     console.error('Error verifying email:', error);
//     // Handle error as needed
//   }
// };


// onMounted(async () => {
//   // handleVerification();
//   console.log('Route params:', router.currentRoute.value.params);

//   const currentUser = await authStore.getCurrentUser();
//   const currentUserRole = currentUser.role;

//   console.log(currentUserRole);

//   const currentListing = await listingStore.getListingsByUserId()
//   const ownerListing = currentListing.data

//   console.log(ownerListing);

//   // Check if the route has a "users" or "listing" param
//   if (router.currentRoute.value.params.users) {
//     // Fetch listings based on user ID
//     userId.value = router.currentRoute.value.params.users;
//     console.log('User ID from route:', userId.value);
//     await fetchListingsByUserId();
//   } else if (router.currentRoute.value.params.listing) {
//     // Fetch a specific listing by ID
//     listingId.value = router.currentRoute.value.params.listing;
//     console.log('Listing ID from route:', listingId.value);
//     await fetchListingById();
//   } else {
//     // Fetch all listings
//     await fetchAllListings();
//   }
// });


// async function fetchAllListings() {
//   // Use your Pinia store method to fetch all listings
//   dynamicListings.value = await listingStore.getAllListings();
// }
// async function fetchAllListings() {
//   try {
//     // Get the current user's object
//     const currentUser = await authStore.getCurrentUser();

//     // Extract the user ID from the user object
//     const currentUserID = currentUser.id;

//     // Fetch all listings   
//     const allListings = await listingStore.getAllListings();

//     // Filter listings based on the current user's ID
//     dynamicListings.value = allListings.filter(listing => listing.user_id === currentUserID);
//   } catch (error) {
//     console.error(error);
//   }
// }
// async function fetchAllListings() {
//   // handleVerification();
//   try {
//     // Get the current user's object
//     const currentUser = await authStore.getCurrentUser();

//     // Extract the user ID and role from the user object
//     const currentUserID = currentUser.id;
//     const currentUserRole = currentUser.role;

//     if (currentUserRole === 'provider') {
//       // If the user is a provider, fetch and display only their own listings
//       const providerListings = await fetchListingsByUserId(currentUserID);
//       dynamicListings.value = providerListings;
//     } else {
//       // If the user is a musician, fetch and display all listings
//       const allListings = await listingStore.getAllListings(currentUserID);
//       dynamicListings.value = allListings;
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

const currentUser = ref(null);

// Simulate a login when the component is mounted (replace this with actual login logic)
onMounted(async () => {
  currentUser.value = await authStore.getCurrentUser();
  // console.log('Listing Card', currentUser.value.role);
  await fetchListings(); // Fetch listings after getting the current user
});


async function fetchListings() {
  try {
    const currentUser = await authStore.getCurrentUser();
    const currentUserID = currentUser.id;

    if (currentUser.role === 'musician') {
      // If the user is a musician, fetch all listings without filtering
      const allListings = await listingStore.getAllListings();
      dynamicListings.value = allListings;
    } else {
      // If the user is a provider, filter listings based on the user ID
      const providerListings = await fetchListingsByUserId(currentUserID);
      dynamicListings.value = providerListings;
    }
  } catch (error) {
    console.error(error);
  }
}


const filteredListings = computed(() => {
  if (!currentUser.value) {
    // Return an empty array if currentUser.value is falsy
    return [];
  }

  // Filter listings based on the owner's user_id and user's role === "provider"
  if (currentUser.value.role === "provider") {
    return dynamicListings.value.filter((listing) => listing.user_id === currentUser.value.id);
  }

  // For musicians, return all listings
  return dynamicListings.value;
});



async function fetchAllListings() {
  try {
    // Get the current user's object
    const currentUser = await authStore.getCurrentUser();

    // Extract the user ID from the user object
    const currentUserID = currentUser.id;

    // Fetch all listings using the user ID   
    const allListings = await listingStore.getAllListings(currentUserID);

    // If the user is a musician, fetch all listings without filtering
    if (currentUser.role === 'musician') {
      dynamicListings.value = allListings;
    } else {
      // If the user is a provider, filter listings based on the user ID
      dynamicListings.value = allListings.filter(listing => listing.user_id === currentUserID);
    }
  } catch (error) {
    console.error(error);
  }
}




// async function fetchListingsByUserId() {
//   // Use your Pinia store method to fetch listings by user ID
//   dynamicListings.value = await listingStore.getListingsByUserId(userId.value);
// }

// const fetchListingsByUserId = async () => {
//   try {
//     // Call your Pinia store method to fetch listings by user ID
//     dynamicListings.value = await listingStore.getListingsByUserId(userId.value);
//   } catch (error) {
//     console.error(error);
//   }
// };
const fetchListingsByUserId = async () => {
  // handleVerification();
  try {
    // Reset dynamicListings to an empty array
    dynamicListings.value = [];

    const currentUser = await authStore.getCurrentUser();
    console.log('Current user data:', currentUser);

    // Use the correct property name based on your user data structure
    const currentUserID = currentUser.id;

    console.log('User ID for fetching listings:', currentUserID);

    // Call your Pinia store method to fetch listings by user ID
    dynamicListings.value = await listingStore.getListingsByUserId(currentUserID);
    // dynamicListings.value = await listingStore.getListingsByUserId(authStore.currentUser.id);

  } catch (error) {
    console.error(error);
  }
};


async function fetchListingById() {
  // Use your Pinia store method to fetch a specific listing by ID
  dynamicListings.value = await listingStore.getListingsByID(listingId.value);
}


// const editListing = (listingId) => {
//     const currentListing = listingStore.getListingsByID();
//     const listingID= currentListing.listing_id;
//     console.log(listingID);
//     fetchListingById();
//     console.log(`Edit Listing Clicked`);

// };

// const deleteListing = (listingId) => {
//     const currentListing = listingStore.getListingsByID();
//     const listingID= currentListing.listing_id;
//     console.log(listingID);
//     fetchListingById();
//     console.log(`Delete Listing Clicked`);
// };

// Add a function to fetch listing data and update formData.listing_id
// const fetchListingData = async (listingId) => {
//   try {
//     const response = await fetch(`your_api_endpoint/${listingId}`);
//     const data = await response.json();
//     formData.listing_id = data.listing_id;
//   } catch (error) {
//     console.error(error);
//   }
// };
// const listingId = ref(0);
// const listingId = computed(() => route.query.listingId);

// Add a watch statement to watch for changes in listingId
watch(() => listingId.value, (newListingId) => {
  console.log('Listing ID changed:', newListingId);
  // Update formData.listing_id when listingId changes
  formData.listing_id = newListingId;
});

const editListing = async (clickedListingId) => {
    console.log(clickedListingId);
    console.log(`Edit Listing Clicked, listingID: ${clickedListingId}`);

    // Update the formData.listing_id with the received listingId
    listingId.value = clickedListingId;

    // Call the action directly, no need for setClickedListingId
    await listingStore.setClickedListingId(clickedListingId);

     // Set the clickedListingId in the component's state (if needed)
    //  this.clickedListingId = clickedListingId;

    // Try logging the listingId before navigating to see if it's correct
    console.log('Listing ID before navigation:', listingId.value);

    // Now, navigate to the UpdateListingForm.vue component
    await router.push({
        name: 'Update Listing Form',
        params: { listingId: clickedListingId },
        replace: true,
    });

    // Now, the navigation is completed, and you can access the updated listingId
    console.log('Listing ID after navigation:', listingId.value);
};







const deleteListing = async (clickedListingId) => {
  console.log(`Delete Listing Clicked, listingID: ${clickedListingId}`);
  try {
    // Call the deleteListing method from your store with the clickedListingId
    await listingStore.deleteListing(clickedListingId);

    // Now, navigate to the "/providerDashboard" route
    router.push('/providerDashboard');
  } catch (error) {
    console.error(error);
  }
};





</script>

<template>
  <Navbar />
  <DropdownMenu2/>

  <!-- test listings on page -->
  <!-- {{ filteredListings }} -->

  <!-- v-for="(listing, index) in dynamicListings"  -->
  <div style="display: flex; flex-wrap: wrap; justify-content: center; margin-bottom: 0; margin-top: 2rem; margin-bottom: 5rem;">
    <div 
    class="border mb-16"  
     v-for="(listing, index) in filteredListings"
    :key="index" 
    style="width: 200px; margin: 10px;"
    >
    <!-- @click="editDeleteOptions" -->
      <div class="mx-2">  

        <div class="mx-2">
          <div v-if="currentUser && currentUser.role !== 'provider'"  style="flex: 1; display: flex; justify-content: center; margin-top: 1rem; margin-bottom: 3px;">
            <RouterLink to="/" style="text-decoration: none;">
              <Button text="Book now" style="margin: 5px; padding: 10px; width: 100px; background-color: white; color: black; border: none; border-radius: 5px; cursor: pointer;" />
            </RouterLink>
          </div>

      
        <img src="/src/assets/biro-teaching-and-learning-to-play-the-violin-1.png" :alt="listing.alt" style="width: 100%; height: 100%; object-fit: cover;">
        <h4 style="display: flex; align-items: center; ">
          <b>{{ listing.name }}</b>
          <p class="ml-16">Owned By: {{ listing.user_id }}</p>
        </h4>
        <div style="display: flex; justify-content: space-between;">
          <p>{{ listing.description }}</p>
          <p>{{ listing.price_per_hour }}</p>
          
        </div>
      </div>


      
      <!-- <img :src="listing.src" :alt="listing.alt" style="width: 100%; height: 100%; object-fit: cover;"> -->
        <img src="/src/assets/IMG_1280.PNG" :alt="listing.alt" style="width: 100%; height: 100%; object-fit: cover;">

      

        <div v-if="currentUser && currentUser.role !== 'musician'" style="display: flex; justify-content: space-evenly;">
          <div  @click="editListing(listing.listing_id)">
            <!-- In viewAllListingsOrByUserID.vue -->
            <router-link :to="{ name: 'Update Listing Form', params: { listingId: listing.listing_id } }">

            <svg height='30px' widht='30px' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="mt-2 mb-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>

            </router-link>
          </div>

          <!-- <div @click="listingStore.deleteListing(listing.listing_id)"> -->
            <div @click="deleteListing(listing.listing_id)">

            
            <svg height='30px' widht='30px' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="mt-2 mb-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>

          </div>
        </div>



        <img src="/src/assets/biro-map-with-the-way-to-the-goal-and-a-compass-for-orientation-in-space-1.png" :alt="listing.alt" style="width: 100%; height: 100%; object-fit: cover;">
      </div>

     
    </div>
  </div>

  <!-- Add more sections as needed -->

  <Footer />
</template>

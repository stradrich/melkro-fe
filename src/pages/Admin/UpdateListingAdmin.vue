<!-- <script setup>
import Navbar from '../../components/Navbar.vue'
import Footer from '../../components/Footer.vue'
import { ref, onMounted, watch, computed } from 'vue';
import { useListingStores } from '../../stores/listing';
import { useAuthStores } from '../../stores/auth';
import { useRoute, useRouter } from 'vue-router';

// const computedListingId = computed(() => formData.listing_id);

const router = useRouter();
const route = useRoute();

const listingStore = useListingStores();
const dynamicListings = ref([]);

const authStore = useAuthStores();



const userId = ref(authStore.currentUser?.id || ''); // Initial value
// const user_id = ref(''); 
watch(() => authStore.currentUser?.id, (newValue) => {
  userId.value = newValue || '';
});

// const listingId = ref(listingStore.currentListings.listing_id !== null ? listingStore.currentListings.listing_id : '');

// watch(() => listingStore.currentListings.listing_id, (newValues) => {
//     console.log('Current Listings Updated:', newValues);
//     listingId.value = newValues !== null ? newValues : listingId.value;
//     console.log('listingId:', listingId.value);
// });
// Remove the watch statement
// listingId.value = listingStore.currentListings.listing_id !== null ? listingStore.currentListings.listing_id : listingId.value;
// const listingId = ref('');



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



const fetchListingData = async (listingId) => {
  try {
    if (listingId !== '') {
      // const response = await fetch(`http://localhost:8080/listings/listing/:id'/${listingId}`);
      const response = await fetch(`http://localhost:8080/listings/listing/${listingId}`);

      const data = await response.json();
      console.log('Fetched Listing Data:', data);
      formData.listing_id = data.listing_id;
    }
  } catch (error) {
    console.error(error);
  }
};




const editListing = (listingId) => {
  // Use the passed listingId instead of fetching it again
  console.log(`Edit Listing Clicked, listingID: ${listingId}`);
  formData.listing_id = listingId;
  console.log(`formData.listing_id: ${formData.listing_id}`);
};





const resetForm = () => {
//   userId.value = '';
  formData.value.stripeProductId = '';
  formData.value.price_per_hour = '';
  formData.value.address_link = '';
  formData.value.pictures = '';
  formData.value.availability = '';
  formData.value.name = '';
  formData.value.description = '';
  formData.value.capacity = '';
};

// listingStore.updateListing();
// const currentListings = computed(() => listingStore.currentListings);


// onMounted(async () => {
//   try {
//     // Call the getAllListings action to fetch the initial data
//     await listingStore.getAllListings();

//     // Access the data you need
//     console.log('Current Listings in store:', listingStore.currentListings);

//     // Now you can access the listing ID
//     // listingId.value = listingStore.currentListings.listing_id !== null ? listingStore.currentListings.listing_id : '';
//     // if (listingId.value !== '') {
//     //   fetchListingData(listingId.value);
//     // }
//       // Now you can access the first listing in the array
//       if (listingStore.currentListings.length > 0) {
//             listingId.value = listingStore.currentListings[0].listing_id;
//             fetchListingData(listingId.value);
//         }

//     // Update the computed property
//     currentListings.value = listingStore.currentListings;
//   } catch (error) {
//     console.error(error);
//   }
// });

async function fetchAllListings() {
  dynamicListings.value = await listingStore.getAllListings();
}

function logCurrentListings() {
  // Assuming currentListings is an object
  const currentListings = listingStore.currentListings;


    // Iterate over the keys of the object
    Object.keys(currentListings).forEach(key => {
    // Access each property value
    const value = currentListings[key];
    console.log(`${key}: ${value}`);
  });
}

// const listingId = ref(null);
// const listingId = computed(() => route.query.listingId);
const listingId = ref(route.query.listingId);


// onMounted(() => {
//   // Initialize listingId with the current route value
//   const initialListingId = router.currentRoute.value.params.listingId;
//   if (initialListingId) {
//     listingId.value = initialListingId;
//     // Call the function to fetch data based on the initial listingId
//     fetchListingData(initialListingId);
//   }

// watch(() => router.currentRoute.value.params.listingId, (newListingId) => {
//   console.log('Route params changed. New Listing ID:', newListingId);

//   if (newListingId !== null) {
//     console.log('Updating listingId...');
//     listingId.value = newListingId;
//     console.log('listingId:', listingId.value);
    
//     // Call the function to fetch data based on the new listingId
//     console.log('Before fetching data...');
//     fetchListingData(newListingId);
//     console.log('After fetching data...');
//   }
// });

// });

onMounted(() => {
  // Initialize listingId with the current route value
  const initialListingId = router.currentRoute.value.params.listingId;
  if (initialListingId) {
    listingId.value = initialListingId;
    // Call the function to fetch data based on the initial listingId
    fetchListingData(initialListingId);
  }
});










</script> -->

<script setup>
import Navbar from '../../components/Navbar.vue';
import Footer from '../../components/Footer.vue';
import { ref, onMounted, watch } from 'vue';
import { useListingStores } from '../../stores/listing';
import { useAuthStores } from '../../stores/auth';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const listingStore = useListingStores();
const authStore = useAuthStores();

const userId = ref(authStore.currentUser?.id || '');
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

const listingId = listingStore.clickedListingId;

// Define the method to display clickedListingId
const displayClickedListingId = () => {
  // Call the store method to get the clickedListingId
  const clickedListingId = listingStore.clickedListingId;

  // Now you can use clickedListingId in your component
  console.log('Clicked Listing ID:', clickedListingId);
};


watch(() => authStore.currentUser?.id, (newValue) => {
  userId.value = newValue || '';
});

onMounted(() => {
  displayClickedListingId();
  // const initialListingId = router.currentRoute.value.params.listingId;
  // if (initialListingId) {
  //   listingId.value = initialListingId;
  //   fetchListingData(initialListingId);
  // }
});







watch(() => route.params.listingId, (newListingId) => {
  if (newListingId !== null) {
    listingId.value = newListingId;
    fetchListingData(newListingId);
  }
});

// const fetchListingData = async (listingId) => {
//   try {
//     if (listingId !== '') {
//       const response = await fetch(`http://localhost:8080/listings/listing/${listingId}`);
//       const data = await response.json();
//       formData.listing_id = data.listing_id;
//       // Update other formData properties as needed
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

const fetchListingById = async () => {
  dynamicListings.value = await listingStore.getListingsByID(listingId.value);

  // Populate formData with the fetched listing data
  formData.user_id = dynamicListings.value[0].user_id;
  formData.listing_id = dynamicListings.value[0].listing_id;
  formData.name = dynamicListings.value[0].name;
  formData.description = dynamicListings.value[0].description;
  formData.capacity = dynamicListings.value[0].capacity;
  formData.address_link = dynamicListings.value[0].address_link;
  formData.price_per_hour = dynamicListings.value[0].price_per_hour;
  // Add similar lines for other form fields

};

const updateListing = () => {
  // Implement your update logic
};

const resetForm = () => {
  // Implement your reset logic
};

</script>

<template>
  <Navbar />

  <div> {{  authStore.currentUser.id }}</div>
  <div>{{ userId }}</div>
  <div>{{ listingStore.clickedListingId }}</div>

  <v-sheet class="mt-2" width="300" style="margin: auto; margin-top: auto; margin-bottom: auto;">
    <img
      class="mx-auto mt-10 mb-10"
      width="100"
      height="100"
      src="https://lottiefolder.com/wp-content/uploads/2022/11/cube_dots_fill-1.gif"
      alt="space"
      loading="lazy"
    />

    <div class="mb-10">CREATE LISTING PAGE (for space provider)</div>

    <v-form>
        <v-text-field v-model="userId" label="User ID" :readonly="true"></v-text-field>
        
        <v-text-field v-model="listingStore.clickedListingId" label="Listing ID" :readonly="true"></v-text-field>

        <!-- <v-text-field v-model="listingId" label="Listing ID"></v-text-field> -->
        <!-- <v-text-field v-model="computedListingId" label="Listing ID" :readonly="true"></v-text-field> -->
        <!-- <v-text-field label="Lisitng ID" :readonly="true">{{ console.log('Listing ID in template:', listingId) }}</v-text-field> -->
        <!-- <v-text-field v-model="listingId" label="Listing ID"></v-text-field> -->


        <v-text-field v-model="formData.name" label="Name for your space"></v-text-field>
  
        <v-text-field v-model="formData.description" label="Description"></v-text-field>
  
        <v-text-field
          v-model="formData.capacity"
          label="Number of people preferred"
        ></v-text-field>
  
        <!-- GOOGLE MAP API? -->
        <v-text-field v-model="formData.address_link" label="Location"></v-text-field>
  
        <v-text-field v-model="formData.price_per_hour" label="Rate per hour"></v-text-field>
  
        <!-- Add v-model bindings for the remaining fields -->
        <!-- <v-text-field v-model="formData.user_id" label="User ID"></v-text-field> -->
        

        <!-- Add v-model bindings for the other fields similarly -->
        <!-- v-model="createStripeProductId.field_name" label="Field Label" -->
  
      

        <div>
          <v-file-input chips multiple label="Upload listing photo"></v-file-input>
          <v-file-input
            small-chips
            multiple
            label="Upload listing photo"
          ></v-file-input>
        </div>
  
        <div class="d-flex flex-column">
          <!-- <v-btn color="success" class="mt-4" block @click="createListing">
            Create Listing
          </v-btn> -->
  
          <v-btn
            color="warning"
            class="mt-4"
            block
            @click="() => listingStore.updateListing(formData)"
              >
              <router-link to='/providerDashboard'>
                Update Listing
              </router-link>
          </v-btn>
  
          <!-- <v-btn color="error" class="mt-4" block @click="deleteListing">
            Delete Listing
          </v-btn> -->
        </div>
      </v-form>

  </v-sheet>

  <Footer />
</template>








<!-- <template> -->

    <!-- <Navbar/> -->

    <!-- <div>{{ JSON.stringify(listingStore.currentListings) }}</div> -->
   
  

    <!-- <div>{{ formData.listing_id }}</div> -->

    <!-- <div>{{ userId }}</div> -->

    <!-- <div>{{ console.log('Listing ID in template:',  listingStore.currentListings?.listing_id) }}</div> -->




    
    <!-- <v-sheet class="mt-2" width="300" style="margin: auto; margin-top: auto; margin-bottom: auto;"> -->
     <!-- <img
      class="mx-auto mt-10 mb-10"
      width="100"
      height="100"
      src="/src/assets/IMG_0912.JPG"
      alt="space"
      loading="lazy"
    /> -->

    <!-- <div class="mb-10">CREATE LISTING PAGE (for space provider)</div> -->
   

      <!-- <v-form> -->
        <!-- <v-text-field v-model="userId" label="User ID" :readonly="true"></v-text-field> -->
        
        <!-- <v-text-field v-model="formData.listing_id" label="Listing ID"></v-text-field> -->

        <!-- <v-text-field v-model="listingId" label="Listing ID"></v-text-field> -->
        <!-- <v-text-field v-model="computedListingId" label="Listing ID" :readonly="true"></v-text-field> -->
        <!-- <v-text-field label="Lisitng ID" :readonly="true">{{ console.log('Listing ID in template:', listingId) }}</v-text-field> -->
        <!-- <v-text-field v-model="listingId" label="Listing ID"></v-text-field> -->


        <!-- <v-text-field v-model="formData.name" label="Name for your space"></v-text-field> -->
  
        <!-- <v-text-field v-model="formData.description" label="Description"></v-text-field> -->
  
        <!-- <v-text-field
          v-model="formData.capacity"
          label="Number of people preferred"
        ></v-text-field> -->
  
        <!-- GOOGLE MAP API? -->
        <!-- <v-text-field v-model="formData.address_link" label="Location"></v-text-field> -->
  
        <!-- <v-text-field v-model="formData.price_per_hour" label="Rate per hour"></v-text-field> -->
  
        <!-- Add v-model bindings for the remaining fields -->
        <!-- <v-text-field v-model="formData.user_id" label="User ID"></v-text-field> -->
        

        <!-- Add v-model bindings for the other fields similarly -->
        <!-- v-model="createStripeProductId.field_name" label="Field Label" -->
  
      

        <!-- <div>
          <v-file-input chips multiple label="Upload listing photo"></v-file-input>
          <v-file-input
            small-chips
            multiple
            label="Upload listing photo"
          ></v-file-input>
        </div> -->
  
        <!-- <div class="d-flex flex-column"> -->
          <!-- <v-btn color="success" class="mt-4" block @click="createListing">
            Create Listing
          </v-btn> -->
  
          <!-- <v-btn
            color="warning"
            class="mt-4"
            block
            @click="updateListing()"
          >
            Update Listing
          </v-btn> -->
  
          <!-- <v-btn color="error" class="mt-4" block @click="deleteListing">
            Delete Listing
          </v-btn> -->
        <!-- </div> -->
      <!-- </v-form> -->
  
    <!-- </v-sheet> -->

    <!-- <Footer/> -->

   
  <!-- </template> -->
  
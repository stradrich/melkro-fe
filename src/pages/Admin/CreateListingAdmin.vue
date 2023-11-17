<!-- One listing can have many bookings (but...) -->
<!-- One booking can have many timeslots (but can't be overlapped)-->
<!-- One timeslot can ONLY have one booking -->


<!-- CREATE listing POST http://localhost:8080/listings/ -->

<!-- Need to create a form -->
<!-- Json payload -->
<!-- { 
	"user_id": 1,
	"price_per_hour": 100.00,
	"address_link": "test",
	"pictures": "test",
	"availability": "test",
	"name": "test",
	"description": "test",
	"capacity": 1
} -->

<script setup>
import Navbar from '../../components/Navbar.vue'
import Footer from '../../components/Footer.vue'
import { ref, onMounted, watch, onBeforeMount } from 'vue';
import { useListingStores } from '../../stores/listing';
import { useAuthStores } from '../../stores/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const listingStore = useListingStores();
const authStore = useAuthStores();

// const currentUser = ref(authStore.currentUser);

// onMounted(() => {
//   console.log('authStore:', authStore);
//   console.log('authStore.currentUser:', authStore.currentUser);
// });

// Watch for changes in authStore.currentUser
// watch(() => authStore.currentUser, (newValue) => {
//   currentUser.value = newValue;
// });

// const userId = ref(authStore.currentUser?.id || ''); // Initial value
// // const user_id = ref(''); 
// watch(() => authStore.currentUser?.id, (newValue) => {
//   userId.value = newValue || '';
// });
// console.log(userId);

const userId = ref(authStore.currentUser?.id || '');

onBeforeMount(async () => {
  // Ensure that the authStore has the current user data
  await authStore.getCurrentUser();

  // Set the userId based on the current user
  userId.value = authStore.currentUser?.id || '';
});


// const stripeProductId = ref('');
// const price_per_hour = ref('');
// const address_link = ref('');
// const pictures = ref('');
// const availability = ref('');
// const name = ref('');
// const description = ref('');
// const capacity = ref('');

// const formData = ref({
//   user_id,
//   stripeProductId,
//   price_per_hour,
//   address_link,
//   pictures,
//   availability,
//   name,
//   description,
//   capacity
// });

// const formData = ref({
//   user_id: user_id.value,
//   stripeProductId: stripeProductId.value,
//   price_per_hour: price_per_hour.value,
//   address_link: address_link.value,
//   pictures: pictures.value,
//   availability: availability.value,
//   name: name.value,
//   description: description.value,
//   capacity: capacity.value,
// });

// const formData = ref({
//   user_id: ref(''),
//   stripeProductId: ref(''),
//   price_per_hour: ref(''),
//   address_link: address_link.value,
//   pictures: ref(''),
//   availability: ref(''),
//   name: name.value,
//   description: description.value,
//   capacity: capacity.value,
// });




// const createStripeProductId = ref({
//   user_id: '',
//   stripeProductId: '',
//   price_per_hour: '',
//   address_link: '',
//   pictures: '',
//   availability: '',
//   name: '',
//   description: '',
//   capacity: '',
// });


const formData = ref({
  user_id: '',
  stripeProductId: '',
  price_per_hour: '',
  address_link: '',
  pictures: '',
  availability: '',
  name: '',
  description: '',
  capacity: '',
});




const createListing = async () => {
       
  try {

        // Validate that required fields are not empty
        // if (!authStore.currentUser.value.user_id || !formData.value.price_per_hour) 
        // if (!authStore.currentUser || !authStore.currentUser.value.user_id || !formData.value.price_per_hour) {
        // console.error('User ID is required.');
        // return;
        // }

        // Ensure we have the user data
        if (!authStore.currentUser) {
        console.error('User data is not available.');
        return;
        }

           // Validate that required fields are not empty
        if (!authStore.currentUser.id || !formData.value.price_per_hour) {
        console.error('User ID and Price per Hour are required.');
        return;
        }

        console.log('CurrentUser:', authStore.currentUser?.username);
        console.log('UserID:', authStore.currentUser?.id);
        console.log('Price per Hour:', formData.value.price_per_hour);

        // Set the user ID in the form data
        formData.value.user_id = authStore.currentUser.id || authStore.currentUser?.value.id;
    
        console.log('Request Payload:', formData.value);
        
        // Wait for authStore.currentUser to be available
        await authStore.getCurrentUser();
        // console.log('authStore.currentUser after getCurrentUser:', authStore.getCurrentUser);

        // Validate that required fields are not empty
        if (!formData.value.price_per_hour) {
        console.error('Price per Hour is required.');
        return;
        }
        // await listingStore.createListing({ ...formData.value });

         // Set the user ID in the form data
        // formData.value.user_id = authStore.currentUser.value.id;

        await listingStore.createListing(formData.value);
    // await listingStore.createListing(
    //   formData.value.user_id,
    //   formData.value.stripeProductId,
    //   formData.value.price_per_hour,
    //   formData.value.address_link,
    //   formData.value.pictures,
    //   formData.value.availability,
    //   formData.value.name,
    //   formData.value.description,
    //   formData.value.capacity
    // );

    // Optionally, you can handle the response or perform other actions
    console.log('Listing created', listingStore.currentListings);

    // Optionally, you can reset the form fields after successful creation
    resetForm();
    router.push('/adminDashboard');
  } catch (error) {
    console.error('Listing creation error:', error);
    // Optionally, you can display an error message to the user
  }
};

// const resetForm = () => {
//   formData.value.user_id = '';
//   formData.value.stripeProductId = '';
//   formData.value.price_per_hour = '';
//   formData.value.address_link = '';
//   formData.value.pictures = '';
//   formData.value.availability = '';
//   formData.value.name = '';
//   formData.value.description = '';
//   formData.value.capacity = '';
// };


// const resetForm = () => {
//   user_id.value = '';
//   stripeProductId.value = '';
//   price_per_hour.value = '';
//   address_link.value = '';
//   pictures.value = '';
//   availability.value = '';
//   name.value = '';
//   description.value = '';
//   capacity.value = '';
// };

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

</script>

<template>

    <Navbar/>

      
    
    
    <v-sheet class="mt-2" width="300" style="margin: auto; margin-top: auto; margin-bottom: auto;">
     <img
      class="mx-auto mt-10 mb-10"
      width="100"
      height="100"
      src="https://lottiefolder.com/wp-content/uploads/2022/11/cube_dots_fill-1.gif"
      alt="space"
      loading="lazy"
    />

    <div class="mb-10">CREATE LISTING PAGE (for Admin)</div>
     
      <v-form>
        <v-text-field v-model="userId" label="User ID" :readonly="true"></v-text-field>

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
          <v-btn color="success" class="mt-4" block @click="createListing">
            Create Listing
          </v-btn>
  
        </div>
      </v-form>
  
    </v-sheet>

    <Footer/>

   
  </template>
  
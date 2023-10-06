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
import { ref } from 'vue';
import { useListingStores } from '../../stores/listing';

const listingStore = useListingStores();


const user_id = ref(''); 
const stripeProductId = ref('');
const price_per_hour = ref('');
const address_link = ref('');
const pictures = ref('');
const availability = ref('');
const name = ref('');
const description = ref('');
const capacity = ref('');

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
        if (!formData.value.user_id || !formData.value.price_per_hour) {
        console.error('User ID and Price per Hour are required.');
        return;
        }
    
        console.log('Request Payload:', formData.value);
        
        // await listingStore.createListing({ ...formData.value });

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


const resetForm = () => {
  user_id.value = '';
  stripeProductId.value = '';
  price_per_hour.value = '';
  address_link.value = '';
  pictures.value = '';
  availability.value = '';
  name.value = '';
  description.value = '';
  capacity.value = '';
};
</script>

<template>
    <img
      class="ml-7 mb-5"
      width="100"
      height="100"
      src="/src/assets/IMG_0912.JPG"
      alt="space"
      loading="lazy"
    />
    <div>CREATE LISTING PAGE (for space provider)</div>
  
    <v-sheet class="mt-2" width="300">
      <v-form>
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
        <v-text-field v-model="formData.user_id" label="User ID"></v-text-field>
  
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
  
          <v-btn
            color="warning"
            class="mt-4"
            block
            @click="updateListing"
          >
            Update Listing
          </v-btn>
  
          <v-btn color="error" class="mt-4" block @click="deleteListing">
            Delete Listing
          </v-btn>
        </div>
      </v-form>
  
    </v-sheet>
  </template>
  
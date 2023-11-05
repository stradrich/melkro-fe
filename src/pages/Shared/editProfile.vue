<script setup>
import Navbar from '../../components/Navbar.vue';
import Footer from '../../components/Footer.vue';
import DropdownMenu2 from '../../components/DropdownMenu2.vue';
import { ref, onMounted } from 'vue';
import { useAuthStores } from '../../stores/auth';
import { useUserStores } from '../../stores/user';
import { useListingStores } from '../../stores/listing';
import { useBookingStores } from '../../stores/booking';
import { usePaymentStores } from '../../stores/payment';
import { useAdminStores } from '../../stores/admin';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStores();
const userStore = useUserStores();
const listingStore = useListingStores();
const bookingStore = useBookingStores();
const paymentStore = usePaymentStores();
const adminStore = useAdminStores();

const majorOptions = ['Piano', 'Violin', 'Cello', 'Guitar', 'Others']; 

const rules = {
  username: [
    v => !!v || 'Username is required',
    v => /^[a-zA-Z0-9_]+$/.test(v) || 'Only letters, numbers, and underscores are allowed',
    v => (v || '').length >= 3 || 'Username must be at least 3 characters',
    v => (v || '').length <= 20 || 'Username must be at most 20 characters',
    v => !!v || 'This field is required',
  ],
  email: v => !!(v || '').match(/@/) || 'Please enter a valid email',
  length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
  password: v =>
    !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
    'Password must contain an upper case letter, a numeric character, and a special character',
  required: v => !!v || 'This field is required',
};
const checkbox = ref(false);

const validate = async () => {
  const { valid } = await refs.form.validate();
  if (valid) alert('Form is valid');
};

const reset = () => {
  refs.form.reset();
};

const resetValidation = () => {
  refs.form.resetValidation();
};

const updateProfile = async () => {
  console.log('Updating Profile');
  console.log('User ID:', currentUser.value.id);
  console.log('Username:', currentUser.value.username);
  console.log('Email:', currentUser.value.email);
  console.log('First Name:', currentUser.value.firstName);
  console.log('Last Name:', currentUser.value.lastName);
  console.log('Major:', currentUser.value.major);

  try {
    console.log('Updating Profile');

    const response = await axios.put(
      `http://localhost:8080/users/${currentUser.value.id}`,
      {
        user_id: currentUser.value.id,
        username: currentUser.value.username,
        email: currentUser.value.email,
        password: currentUser.value.password, // Update with your logic for password
        role: currentUser.value.role,
        firstName: currentUser.value.firstName,
        lastName: currentUser.value.lastName,
        major: currentUser.value.major,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json', // Add this line to specify JSON content type
        },
      }
    );

    console.log('Update successful:', response.data);
  } catch (error) {
    console.error('Update failed:', error);
  }
};

// TWO END POINTS
// const updateProfile = async () => {
//   console.log('Updating Profile');
//   console.log('User ID:', currentUser.value.id);
//   console.log('Username:', currentUser.value.username);
//   console.log('Email:', currentUser.value.email);
//   console.log('First Name:', currentUser.value.firstName);
//   console.log('Last Name:', currentUser.value.lastName);
//   console.log('Major:', currentUser.value.major);

//   try {
//     console.log('Updating Profile');

//     // Update profile endpoint
//     const profileResponse = await axios.put(
//       `http://localhost:8080/users/${currentUser.value.id}`,
//       {
//         user_id: currentUser.value.id,
//         username: currentUser.value.username,
//         email: currentUser.value.email,
//         role: currentUser.value.role,
//         firstName: currentUser.value.firstName,
//         lastName: currentUser.value.lastName,
//         major: currentUser.value.major,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('access_token')}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     console.log('Update Profile successful:', profileResponse.data);

//     // Change password endpoint
//     const passwordResponse = await axios.post(
//       'http://localhost:8080/auth/changePwd',
//       {
//         email: currentUser.value.email,
//         password: 'YourNewPasswordHere', // Update with the new password
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('access_token')}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     console.log('Password Change successful:', passwordResponse.data);
//   } catch (error) {
//     console.error('Update failed:', error);
//   }
// };







onMounted(async () => {
  console.log('Fetching current user... ');
  const accessToken = localStorage.getItem('access_token');
  console.log(accessToken, 'by shared Update Page');

  const user = await authStore.getCurrentUser();
  console.log(user);
  console.log(user.id);
  console.log(user.username);
  console.log(user.email);
  console.log(user.password);
  console.log(user.firstName);
  console.log(user.lastName);
  console.log(user.major);
  console.log(user.role);

  // Set the currentUser ref to the retrieved user data
  currentUser.value = {
    id: user.id,
    username: user.username,
    email: user.email,
    password: 'thisIsNotYourPWD',
    firstName: user.firstName,
    lastName: user.lastName,
    major: user.major,
    role: user.role
  };

  console.log(currentUser.value);
});


const currentUser = ref({
  id: '',
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  major: '',
});





</script>

<template>
  <Navbar/>

  <v-sheet width="300" class="mx-auto mt-16">
     <v-form ref="form">
        <v-text-field
      v-model="currentUser.id"
        :counter="10"
        :readonly="true"
        label="userId"
        required
      ></v-text-field>

      <v-text-field
      v-model="currentUser.username"
        :counter="10"
        :rules="rules.username"
        label="change Username"
        required
      ></v-text-field>

      <v-text-field
       v-model="currentUser.email"
        :counter="10"
        :rules="rules.email"
        label="change Email"
        required
      ></v-text-field>

      <v-text-field
      v-model="currentUser.password"
        :counter="10"
        :rules="rules.password"
        label="change Password"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentUser.firstName"
        :counter="10"
        :rules="rules.required"
        label="change First Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentUser.lastName"
        :counter="10"
        :rules="rules.required"
        label="change Last Name"
        required
      ></v-text-field>

    <v-select
        v-model="currentUser.major"
        :items="majorOptions"
        label="change Major"
        :rules="[rules.required]"
        variant="filled"
        color="deep-purple"
      ></v-select>

      <v-checkbox
       
        :rules="[v => !!v || 'You must agree to continue!']"
        label="Do you agree?"
        required
      ></v-checkbox>

      <div class="d-flex flex-column">
        <v-btn
          color="warning"
          class="mt-4"
          block
          @click="updateProfile"
        >
          Update Profile
        </v-btn>
      </div>
    </v-form>
  </v-sheet>
  <Footer/>
</template>

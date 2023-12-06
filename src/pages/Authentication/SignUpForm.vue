<script setup>
import Navbar from '../../components/Navbar.vue';
import Footer from '../../components/Footer.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStores } from '../../stores/auth';

const authStore = useAuthStores();

const router = useRouter();

const form = ref(null); // Add this line to define the form ref
const roles = ['admin', 'provider', 'musician']; // Define the available roles

const username = ref(undefined);
const email = ref(undefined);
const isValid = ref(false);
const isLoading = ref(false);
const password = ref(undefined);
const selectedRole = ref(null); 
const firstName = ''
const lastName = ''
const major = ''

const rules = {
  username: [
    v => !!v || 'Username is required',
    v => /^[a-zA-Z0-9_]+$/.test(v) || 'Only letters, numbers, and underscores are allowed',
    v => (v || '').length >= 3 || 'Username must be at least 3 characters',
    v => (v || '').length <= 20 || 'Username must be at most 20 characters',
    v => !!v || 'This field is required',
  ],
  // email: v => !!(v || '').match(/@/) || 'Please enter a valid email',
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@.]+$/.test(v) || 'Please enter a valid email',
  length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
  password: v =>
    !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
    'Password must contain an upper case letter, a numeric character, and a special character',
  required: v => !!v || 'This field is required',
};

const submitForm = async () => {
  try {
    // Call your registerUser function from the pinia store
    // await authStore.registerUser(username.value, email.value, password.value, selectedRole.value);
    await authStore.registerUser(username.value,  email.value, password.value, selectedRole.value, firstName, lastName,  major );

    router.push('/login')
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <Navbar/>
     <div class="mt-10 mb-10" style="display: flex; justify-content: center; margin: 5rem;">
    <img class="welcome" src="https://images.pond5.com/welcome-different-languages-012549458_prevstill.jpeg" alt="" style="width: 500px; height: 300px;">
    </div>

    <v-card class="mx-auto" style="max-width: 500px;">
      <v-toolbar color="black" cards dark flat>
        <v-btn icon>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-card-title class="text-h6 font-weight-regular">
          Sign up
        </v-card-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>
      <v-form ref="form" v-model="isValid" class="pa-4 pt-6">
        <v-text-field
          v-model="username"
          :rules="rules.username"
          variant="filled"
          color="deep-purple"
          label="Username"
          style="min-height: 96px"
          type="text"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :rules="[rules.password, rules.length(6)]"
          variant="filled"
          color="deep-purple"
          counter="6"
          label="Password"
          style="min-height: 96px"
          type="password"
        ></v-text-field>
        <v-text-field
          v-model="email"
          :rules="[rules.email]"
          variant="filled"
          color="deep-purple"
          label="Email address"
          type="email"
        ></v-text-field>
        <v-select
        v-model="selectedRole"
        :items="roles"
        label="Select Role"
        :rules="[rules.required]"
        variant="filled"
        color="deep-purple"
      ></v-select>
      </v-form>
      <v-divider></v-divider>
      <v-card-actions class="mx-6">
        <v-btn variant="text" @click="form.reset()">
          Clear
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn :disabled="!isValid" :loading="isLoading" color="black" @click="submitForm">
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>

    <Footer/>
  </template>
  
  <style scoped>
  /* @media only screen and (min-width: 600px) {
    .welcome {
      display: none;
    }
   
  } */
  </style>
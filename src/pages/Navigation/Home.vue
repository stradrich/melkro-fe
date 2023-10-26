<script setup>
// import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
import DropdownMenu from '../../components/DropdownMenu.vue'
import DropdownMenu2 from '../../components/DropdownMenu2.vue'


// import LoginForm from '../Authentication/LoginForm.vue';

import Footer from '../../components/Footer.vue';
import Navbar from '../../components/Navbar.vue'
import Button from '../../components/Button.vue'
// import router from 'vue-router'

import { computed } from 'vue';
import { useAuthStores } from '../../stores/auth';

const authStore = useAuthStores()

// Check log in status, if successful, initiate role-based validation
// Computed property redirect "user" to their home route.
const homeRoute = computed(() => {
  // Accessing Semi Static/Dynamic Data from localStorage
  const currentUser = authStore.getCurrentUser();
  const isLoggedIn = currentUser !== null && currentUser !== undefined;

  if (isLoggedIn) {
    if (currentUser.role === 'admin') {
      // Admin Dashboard
      return '/admin';
    } else if (currentUser.role === 'provider') {
      // Provider Homepage
      return '/provider';
    } else if (currentUser.role === 'musician') {
      // Musician Homepage
      return '/musician';
    } else {
      // Default home route
      return '/';
    }
  } else {
    // User not logged in, redirect to default route
    return '/';
  }
});

const goToSignUp = () => {
  router.push('/signup');
};

</script>

<template>
  

  <div>
    <!-- Header Section -->
    <!-- :user-logged-in="isLoggedIn" -->
    <div>
      <Navbar/>
    <!-- <DropdownMenu/> -->
      <DropdownMenu2/>
    </div>
  

    <!-- Main Section -->
    <div>
      <!-- Default content: Home Page -->
      <template class="min-h-screen max-h-screen mt-10 mr-4" v-if="homeRoute !== '/admin' && homeRoute !== '/provider' && homeRoute !== '/musician'">
        <div class="custom-flex-container mt-10">


          <v-card class="flex-shrink-0 mr-2">
            <!-- Card content goes here -->
            <h1 class="text-lg font-semibold mt-10 ml-5">Get a space & craft your voice</h1>
            <p class="text-gray-600  ml-5 mr-5">
              A platform for musicians and artists alike.
              <br /> Be inspired by our space for music and art.
            </p>

           
            <!-- Go to sign up page-->
            <!-- <RouterLink to="/signup" class=" ml-5">
              <Button text="Sign up" class="mt-5 mb-5" />
            </RouterLink> -->
             <!-- Go to sign up page-->
             <Button text="Sign up" class="mt-5  ml-5 mb-5" @click="goToSignUp" />

            <div class=" ml-5">
              <RouterLink to="/learnMore">Learn more about hosting your space</RouterLink>
            </div>
          </v-card>

          <img height=280, width=280 src="/src/assets/ikigai-girl-at-home-playing-a-stringed-musical-instrument-1.png" alt="" loading="lazy" class="flex-shrink-0" />
        </div>
      </template>

      <!-- TEMPLATE 1: Admin Content -->
      <template v-if="homeRoute === '/admin'">
       
        Logged In as Admin
      </template>

      <!-- TEMPLATE 2: Space Provider Content -->
      <template v-if="homeRoute === '/provider'">
       
        Logged In as Space Provider
      </template>

      <!-- TEMPLATE 3: Space Provider Content -->
      <template v-if="homeRoute === '/musician'">
       
        Logged In as Musician
      </template>
    </div>

     

    <!-- Footer Section -->
    <Footer />
  </div>
</template>

<style scoped>
.custom-flex-container {
  display: flex;
}

</style>


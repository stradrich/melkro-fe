<script setup>
import Logo from '../../src/components/logo.vue';
// import UserIcon from '../components/icons/UserIcon'
import { ref, onMounted, computed} from 'vue';
import { useAuthStores } from '../stores/auth';
// import { computed } from 'vue';
import { RouterLink } from 'vue-router'; // Import RouterLink from vue-router

import { useRouter } from 'vue-router';
const router = useRouter();

const authStore = useAuthStores();
// const userLoggedIn = ref(true); // Your condition to check if the user is logged in
const userLoggedIn = computed(() => !!authStore.getCurrentUser);
const currentUser = computed(() => authStore.currentUser);
const isLoggedIn = computed(() => authStore.userLoggedIn);

const logout = () => {
    console.log('Logging out');
    authStore.logout(); // Call the logout action from your authentication store
   // Optionally, you can also perform a route change or any other logic here
   router.push('/about'); // Redirect to the home page

     // Reload the page after 10 milliseconds (you can adjust this timeout as needed)
  setTimeout(() => {
    location.reload();
  }, 100);
};


const isDropdownHidden = ref(true);

// const toggleDropdown = async () => {
//   try {
//     isDropdownHidden.value = !isDropdownHidden.value;
//     await authStore.getCurrentUser();
//     console.log('CurrentUser:', authStore.currentUser);
//   } catch (error) {
//     // Handle the error, e.g., show an error message to the user
//     console.error('Login error in component:', error);
//   }
// };

function toggleDropdown()  {
  isDropdownHidden.value = !isDropdownHidden.value;
}





// const profileLink = computed(() => {
//   if (currentUser.value && currentUser.value.role === 'provider') {
//     return `/profile/spaceProvider/${currentUser.value.id}`;
//   } else if (currentUser.value && currentUser.value.role === 'customer') {
//     return `/profile/spaceUser/${currentUser.value.id}`;
//   } else {
//     // Handle other cases if needed, or provide a default route
//     return '/';
//   }
// }); 


const profileLink = ref('');

const goToProfile = () => {
  const userRole = authStore.currentUser.role; // Replace with your actual getter to get the user's role

  switch (userRole) {
    case 'admin':
      profileLink.value = '/adminDashboard';
      break;
    case 'provider':
      profileLink.value = '/providerDashboard';
      break;
    case 'musician':
      profileLink.value = '/musicianDashboard';
      break;
    default:
      profileLink.value = '/profile';
      break;
  }

  // Now navigate to the profileLink
  router.push(profileLink.value);
};




const getBookingLink = () => {
  // You can customize this link based on your requirements
  return '/booking'; // Example link
};

const getListingLink = () => {
  // You can customize this link based on your requirements
  return '/publicListing'; // Example link
};

const goToLoginPage = () => {
  // Redirect the user to the login page
  // You can customize this route based on your router setup
  router.push('/login');
};




onMounted(async () => {
  console.log('DropdownMenu component is mounted.');

  try {
    // Fetch user data and wait for it to complete
    await authStore.getCurrentUser();

    // Now, log the user data
    console.log('Current User:', authStore.currentUser);
      // Now, log the user data role
      console.log(`Current User's Role:`, authStore.currentUser.role);
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
});


    
  






</script>

<template>
<v-app-bar :elevation="2" style="background-color: black;">
  <div class="mx-5">
    <Logo/>
  </div>

  <v-toolbar-title class="mx-5">
    <v-btn style="font-size: 20px; color: white" class="font-weight-light ml-2 mr-10" :to="'/'">
      Melkro's
          </v-btn>
    </v-toolbar-title>

  
  <v-app-bar-nav-icon
      id="dropdownDefaultButton"
      class="mx-5 ml-10"
      @click="toggleDropdown"
      style="width: 40px; height: 40px; padding: 0; border: none; background: none; cursor: pointer; color: white"
  >
    </v-app-bar-nav-icon>

  
</v-app-bar>

<br>
  <!-- Dropdown menu -->
  <div
    v-if="!isDropdownHidden"
    class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
  >
    <!-- USER ICON -->
    <!-- <UserIcon/> -->

      <!-- Debugging Info -->
      <!-- <li>Access Token: {{ authStore.accessToken }}</li>
      <li>Is Logged In: {{ authStore.userLoggedIn }}</li>
      <li>Current User: {{ authStore.currentUser }}</li> -->

    <ul
      class="py-2 text-sm text-gray-700 dark:text-gray-200 mb-5"
      aria-labelledby="dropdownDefaultButton"
    >
       <!-- REDIRECT TO OWN PAGE BASED ON ROLE -->
          <!-- Check if the user is logged in before displaying the profile link -->
    <li>
        <div>
          <RouterLink to="/about"  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">About </RouterLink>
        </div>
    </li>
    
    <li>
        <div>
          <RouterLink to="/company"  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Company</RouterLink>
        </div>
    </li>


   
    <!-- Conditionally render the Profile link if the user is logged in -->
    <li v-if="authStore.userLoggedIn" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
    <RouterLink :to="profileLink" @click="goToProfile">Profile</RouterLink>
  </li>
 
      <!-- Add debugging info -->
      <!-- <div v-else>
        User Logged In: {{ userLoggedIn }}
        Profile Link: {{ getProfileLink }}
      </div> -->


      <!-- If logged in, direct to profile page. If not logged in, go to log in page + sign up. -->
      <!-- <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
          <RouterLink to="#">Profile</RouterLink>
        </a>
      </li> -->
      
        <!-- If logged in, direct to booking page. If not logged in, go to log in page + sign up. -->
      <!-- <li>
        <a
          href="#"
          class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        >
        <RouterLink to="/">Booking</RouterLink>
        </a>
      </li> -->
        <!-- If logged in, direct to listing page. If not logged in, go to log in page + sign up. -->
      <li>
        <a
          href="#"
          class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        >
        <RouterLink v-if="authStore.accessToken" to="/listingCard">Listing</RouterLink>
        </a>
      </li>

      <!-- Always display the Log In link if the user is not logged in -->
      <li v-if="!authStore.userLoggedIn"><div><a href="/login" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Log In </a></div></li>
    
        <!-- If not logged, disable this link with #  -->
     <!-- Always display the Log Out button if the user is logged in -->
      <li v-if="authStore.userLoggedIn">
        <button @click="logout" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
          Log Out
        </button>
      </li>
      <!-- Add more list items here -->
    </ul>
  </div>
</template>


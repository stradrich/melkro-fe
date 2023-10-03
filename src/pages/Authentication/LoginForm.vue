<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStores } from '../../stores/auth';
import { useRouter } from 'vue-router';
import Navbar from '../../components/Navbar.vue';
import Footer from '../../components/Footer.vue';

const router = useRouter();
const authStore = useAuthStores();

const formData = ref({
  email: '',
  password: '',
});

const showPassword = ref(false);

// const login = async () => {
//   try {
//     await authStore.login(formData.value.email, formData.value.password);
//     // Redirect or perform other actions upon successful login
//   } catch (error) {
//     console.error('Login error:', error);
//     // Optionally, you can display an error message to the user
//   }
// };

const login = async () => {
  try {
    await authStore.login(formData.value.email, formData.value.password);

    // Check the user's role after a successful login
    const currentUser = authStore.currentUser;

    if (currentUser.role === 'admin') {
      // Redirect to the admin page
      router.push('/adminDashboard');
    } else if (currentUser.role === 'provider') {
      // Redirect to the provider page
      router.push('/providerDashboard');
    } else if (currentUser.role === 'musician') {
      // Redirect to the musician page
      router.push('/musicianDashboard');
    } else {
      // Redirect to a default page if the role is unknown
      router.push('/dashboard');
    }

  } catch (error) {
    console.error('Login error:', error);
    // Optionally, you can display an error message to the user
  }
};


const forgotPassword = () => {
  // Add logic for handling forgot password
  console.log('Forgot Password? Clicked');
};

const signUp = () => {
  // Add logic for handling sign up
  console.log("Don't have an account? Sign Up Clicked");
  router.push('/signup'); // Navigate to the signup page
};

onMounted(async () => {
  // Your existing code for checking user login status and navigating based on role
});
</script>

<template>
  <Navbar/>
  <div style="display: flex; justify-content: center; margin: 5rem;">
    <img src="/src/assets/IMG_0917.PNG" alt="" style="width: 300px; height: 300px;">
  </div>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="10">
      <v-card class="mx-5">
        <v-row justify="center">
          <h1 class="mt-10" style="font-size: 3rem" >Login</h1>
        </v-row>
        <v-form @submit.prevent="login">
          <div class="mx-10 mt-10 mb-10"> 
            <v-text-field v-model="formData.email" label="Email" outlined></v-text-field>
            <v-text-field
              v-model="formData.password"
              :type="showPassword ? 'text' : 'password'"
              label="Password"
              outlined
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              autocomplete="off"
            ></v-text-field>
            <a href="#" class="text-body-2 font-weight-regular" @click.prevent="forgotPassword">Forgot Password?</a>
            <v-btn type="submit" block class="mt-2 bg-black">Sign in</v-btn>
            <div class="mt-2">
              <p class="text-body-2">Don't have an account? <a href="#" @click.prevent="signUp" to="/signup">Sign Up</a></p>
            </div>
          </div>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
<Footer/>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStores } from '../../stores/auth';
import { useRouter } from 'vue-router';
import Navbar from '../../components/Navbar.vue';
import Footer from '../../components/Footer.vue';
import axios from 'axios';
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


const forgotPassword = async () => {
  try {
    // Prompt the user for their email
    const userEmail = prompt('Enter your email:');
    
    if (!userEmail) {
      console.log('Email input canceled or empty. Forgot Password request aborted.');
      return;
    }

    console.log('Forgot Password? Clicked');

    // Send a POST request to the forgot password endpoint with the user's email
    
    // const response = await axios.post('http://localhost:8080/auth/forgotPwd', {
      const response = await axios.post('https://melkro-api-dev-pbcxdasz4q-as.a.run.app/auth/forgotPwd', {
      email: userEmail,
    });

    // Add logic for handling the response, e.g., showing a success message to the user
    alert('Password reset request successful. Check your email for further instructions.');

    // Ask the user if they want to reset their password immediately
    const resetConfirmed = confirm('Do you want to reset your password now?');

    if (resetConfirmed) {
      // Prompt the user to enter a new password
      const newPassword = prompt('Enter your new password:');

      if (newPassword) {
        // Get the reset token from the response or other source
        const resetToken = response.data.resetToken;

        // Send a POST request to reset the password with the new password and reset token
        
        // await axios.post('http://localhost:8080/auth/resetPwd', {
          await axios.post('https://melkro-api-dev-pbcxdasz4q-as.a.run.app/auth/resetPwd', {
          newPassword,
          resetToken,
        });

        // Add logic for handling the reset success, e.g., showing a success message
        alert('Password reset successful. You can now login with your new password.');
      } else {
        // Handle the case where the user canceled or entered an empty password
        alert('Password reset canceled or empty password entered.');
      }
    }
  } catch (error) {
    alert('Password reset request failed:', error);
    // Add logic for handling errors, e.g., showing an error message to the user
  }
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
  <div class="mt-10" style="display: flex; justify-content: center;">
    <img style="width: 500px; height: 300px" src="https://www.oldphotosjapan.com/images/ls-1024/663.png" alt="">
  </div>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="10">
      <v-card class="mx-auto mt-5" style="max-width: 400px; margin: auto;">
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

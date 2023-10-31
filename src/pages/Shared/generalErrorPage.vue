<script setup>
import Navbar from '../../components/Navbar.vue';
import DropdownMenu2 from '../../components/DropdownMenu2.vue';
import Footer from '../../components/Footer.vue';
import Button from '../../components/Button.vue';

import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();


</script>


<template>
  <Navbar/>

  <div style="flex: 1; display: flex; justify-content: center; margin-top: 1rem;  margin-bottom: 1rem;">
             <img src="../../assets/tokyo-attention-sign-in-web-space.png" alt="">
             <!-- <p>Please select a service before proceeding with payment.</p> -->
  </div>

  <div style="flex: 1; display: flex; justify-content: center; margin-top: 1rem;  margin-bottom: 1rem;">
        <!-- <Button text="Back to Payment" @click="createPayment"/> -->
  </div>

  <Footer/>
</template>




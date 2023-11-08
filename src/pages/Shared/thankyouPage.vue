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
             <img src="../../assets//abstract-902.gif" alt="">
             <!-- <p>Please select a service before proceeding with payment.</p> -->
  </div>

  <div class="flex items-center justify-center h-screen">
  <div class="text-center mx-auto mt-16 mb-5">
    <div style="font-size: 20px">Thank you for being our valuable clients.</div>
    <div style="font-size: 20px">We hope to hear from you soon and all the best</div>
    <p class="mt-10">Please fill in the survey form to help us develop a better app</p>
    <p>Please don't hesitate to contact aldrichpinso@gmail.com</p>
  </div>
</div>

  <Footer/>
</template>




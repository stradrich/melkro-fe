<script setup>
import Navbar from '../../components/Navbar.vue';
import Footer from '../../components/Footer.vue';
</script>

<template>
    <Navbar/>

    <div class="mt-10" style="display: flex; justify-content: center; margin: auto; margin-top: 5rem;">
    <img src="/src/assets/ikigai-artist-in-lotus-position-working-in-his-workshop.png" alt="" loading="lazy">
    </div>

    <div class="under-construction">
      <h2>Service Available in 2024</h2>
      <p>We're currently working hard to bring you an amazing experience. This page will be up and running in 2024.</p>
      <p>In the meantime, feel free to <a href="mailto:info@example.com">contact us</a> if you have any questions or inquiries.</p>
    </div>

    <Footer/>
  </template>
  
  <style scoped>
  .under-construction {
    text-align: center;
    padding: 20px;
    font-size: 18px;
  }
  
  .under-construction h2 {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  .under-construction p {
    margin: 10px 0;
  }
  
  .under-construction a {
    text-decoration: none;
    color: #007BFF;
  }
  </style>
  
<script setup>
import { ref } from 'vue';
import Navbar from '../../components/Navbar.vue';
import Footer from '../../components/Footer.vue';

const images = ref([
  { src: '/src/assets/IMG_0911.jpg', alt: 'dfp', name: 'Petronas Hall', description: 'Concert Hall', price: '$$$$$', locationLink: '', map: "/src/assets/IMG_1388.JPG" },
  { src: '/src/assets/IMG_0934.JPG', alt: 'recital hall', name: 'Orang Utan Studio', description: 'Recital Hall', price: '$$$', locationLink: '', map: "/src/assets/IMG_1389.JPG" },
  { src: '/src/assets/20181212_122908-1-900x506.jpeg', alt: 'recital hall', name: 'Nabalu Studio', description: 'Band Room', price: '$$', locationLink: '', map: "/src/assets/IMG_1390.JPG" },
  // Add more images as needed
]);
</script>

<template>
  <Navbar />

  <div class="mt-16" style="display: flex; justify-content: center; margin-bottom: 0; margin-top: 5rem; flex-wrap: wrap; ">
    <div class="mr-5 mt-10" v-for="(image, index) in images" :key="index" style="width: 200px; height: 200px; overflow: hidden; margin: 10px;">
      <div>
        <h4 style="display: flex; align-items: center;">
          <a class="mr-10" :href="image.locationLink" style="margin-right: 4px;">
            <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 384 512">
              <!-- Your SVG path here -->
              <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
            </svg>
          </a>
          <b>{{ image.name }}</b>
        </h4>
        <div class="mt-2" style="display: flex; justify-content: space-between;">
          <p>{{ image.description }}</p>
          <p>{{ image.price }}</p>
        </div>
      </div>
      <img :src="image.src" :alt="image.alt" style="width: 100%; height: 100%; object-fit: cover;">
    </div>
  </div>

  <div class="map" style="display: flex; justify-content: center; margin-top: 0;">
    <div class="mr-5 mt-5" v-for="(image, index) in images" :key="index" style="width: 200px; height: 200px; overflow: hidden; margin: 10px;">
      <div>
        <img :src="image.map" alt="map" style="width: 100%; height: 100%; object-fit: cover;">
      </div>
    </div>
  </div>

  <div style="display: flex; justify-content: center; margin-top: 5px;">
    <RouterLink to="/login" style="text-decoration: none;">More...</RouterLink>
  </div>

  <Footer />
</template>

<style scoped>
@media only screen and (min-width: 600px) {
  .map {
    display: none;
  }
 
}
</style>








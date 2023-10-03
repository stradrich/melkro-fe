<script setup>
import Navbar from '../../components/Navbar.vue';
import Footer from '../../components/Footer.vue';
// import Underconstruction from '../views/Underconstruction.vue'
</script>

<template> 
    <Navbar/>  

    <!-- If logged in, direct to listing page. If not logged in, go to log in page + sign up. -->
    <div style="display: flex; background-color: white; padding: 50px; margin-top: 20px; justify-content: center; border: 1px solid #ccc;">
    <div style="display: flex; flex-direction: column; align-items: center; margin-right: 20px;">
        <img style="margin-bottom: 2px;" width="40" height="40" src="/src/assets/IMG_0912.JPG" alt="space" loading="lazy">
        <a href="/dummyListing" style="margin-top: 2px;margin-right: 5px;">Space for ART</a>
    </div>
    
    <div style="display: flex; flex-direction: column; align-items: center; margin-right: 20px;">
        <img style="margin-bottom: 2px;" width="40" height="40" src="/src/assets/IMG_0915.JPG" alt="instruments" loading="lazy">
        <a href="/underconstruction" style="margin-top: 2px;margin-right: 5px;"><span>Musical instruments and equipments </span></a>
    </div>

    <div style="display: flex; flex-direction: column; align-items: center;">
        <img style="margin-bottom: 2px;" width="40" height="40" src="/src/assets/icons8-music-conductor-96.png" alt="music-conductor--v2" loading="lazy">
        <a href="/underconstruction" style="margin-top: 2px;margin-right: 5px;"><span>Hire our ARTIST</span></a>
    </div>
    </div>










    <div class="mx-auto my-5">
        <p>Out of practice room?</p>
        <p>Better acoustics?</p>
        <p>Competitive and affordable sessions?</p>
        <p>Easy search and easy booking</p>
        <p>Networking with other artist?</p>
        <p>Concert venues?</p>
        <p>Individual lesson, Masterclasses, Seminar, Exhibition?</p>
    </div>

    <div class="mb-5">
    <RouterLink to="/contactForm">More...</RouterLink>
    </div>

    <Footer/>

</template>
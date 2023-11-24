<script setup>
import Navbar from '../../components/Navbar.vue';
import Footer from '../../components/Footer.vue';
// import Underconstruction from '../views/Underconstruction.vue'
</script>

<template> 
    <Navbar/>  

    <!-- If logged in, direct to listing page. If not logged in, go to log in page + sign up. -->
    <div class="box mt-10 mb-10" style="display: flex; background-color: white; padding: 50px; margin-top: 20px; justify-content: center; border: 1px solid #ccc;">
    <div class="mx-10 mb-10" style="display: flex; flex-direction: column; align-items: center; margin-right: 20px;">
        <!-- <img style="margin-bottom: 2px;" width="60" height="60" src="https://media3.giphy.com/media/l2SpL9S67gJRKe7Ze/giphy.gif?cid=790b76112muuxwe6kled87y6xcdl2xbrj9meawma0jhk6trm&ep=v1_gifs_search&rid=giphy.gif&ct=g" alt="space" loading="lazy"> -->
        <img style="margin-bottom: 2px;" width="80" height="80" src="https://cdn.dribbble.com/users/2538166/screenshots/5412483/dribbbbble.gif" alt="space" loading="lazy">
        <a href="/dummyListing" class="mt-5" style="margin-top: 2px;margin-right: 5px;"><span>Space for ART</span></a>
    </div>
    
    <div class="mx-10 mb-10" style="display: flex; flex-direction: column; align-items: center; margin-right: 20px;">
        <img style="margin-bottom: 2px;" width="60" height="60"  src="https://img.freepik.com/premium-vector/violin-logo-icon-design_586739-5455.jpg?w=2000" alt="instruments" loading="lazy">
        <!-- <img style="margin-bottom: 2px;" width="60" height="60"  src="../../assets/IMG_0915.JPG" alt="instruments" loading="lazy"> -->
        <a href="/underconstruction" class="mt-5" style="margin-top: 2px;margin-right: 5px;"><span class="mr-1">Musical instruments</span><span>and equipments</span></a>
    </div>

    <div class="mx-10 mb-10"  style="display: flex; flex-direction: column; align-items: center;">
        <img style="margin-bottom: 2px;" width="60" height="60" src="/src/assets/icons8-music-conductor-96.png" alt="music-conductor--v2" loading="lazy">
        <a href="/underconstruction" class="mt-5" style="margin-top: 2px;margin-right: 5px;"><span>Hire our ARTIST</span></a>
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

    <div style="display: flex; justify-content: center; margin-top: 5rem;">
        <img width="300" height="300" src="https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-original-577x577/s3/022020/app-store_google-play.jpg?HvAOEBkEHTCWi4PDSyOblNwGFvGM2PDo&itok=2osJYdLC" alt="">
    </div>

    <Footer/>

</template>


<style scoped>
@media only screen and (max-width: 600px) {
  .box {
    flex-direction: column;
    align-items: center;
    height: 30rem;
    font-size: 5px;
  }

}

/* .box span {
    font-size: 5px;
  } */
</style>
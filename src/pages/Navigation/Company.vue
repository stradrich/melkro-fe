<script setup>
import Navbar from '../../components/Navbar.vue';
import Footer from '../../components/Footer.vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiMusicRestSixteenth } from '@mdi/js';
</script>

<template>
    <Navbar/>
     <div class="flex justify-center mt-10 mb-10">
        <img src="../../assets/jaconda-music-book.gif" alt="" loading="lazy" class="mx-auto">
    </div>
    

    <p>The Melkro's is a platform that connects musicians from different level (amateurs, music major, music teachers, concert performers, recording artists), allowing them to share and discover practice, rehearsal, recording space in different cities. The app aims to foster collaboration, creativity, and community among musicians, making it easier for local and travelling musicians to find suitable space for rehearsals and collaborations.</p>
    <br>
    <!-- <svg-icon type="mdi" :path="mdiMusicRestSixteenth"></svg-icon> -->
    <p>Founded by <a href="https://www.youtube.com/watch?v=exdROUlv3fo">Aldrich Pinso</a>, a professional musician behind this e-commerce website as a Full Stack Developer. The conception of this app aims to address shared experiences amongst musicians, by transforming inconveniences into opportunities, Melkro's empowers musicians to effortlessly share and discover the right space in different cities. </p>
    <!-- <svg-icon type="mdi" :path="mdiMusicRestSixteenth"></svg-icon> -->
    <br>
    <p> At the same time, local music centres or studios or conservatory can maximize their profit by renting out their unused space through the Melkro's App. By listing their available rooms, studios or performance spaces on the platform, these establishments can tap into a broader network of musicians and music enthusiasts, effectively turning their under-utilised areas into profitable assets. </p>
    <br>
    <p>Melkro's targets musicians or artists of all levels who seek spaces for practicing their art, they can also collaborate and network with other musicians. It appeals to both local musicians looking to share their spaces and traveling artists in need of private temporary spaces. </p>
    <br>
    <p class="mb-16">This service will be expanded into other artistic engagement such as dance, theater, visual art, etc.</p>
    <!-- <div class="flex justify-between">
        <div>
            <ul>Benefits for artists (Musician):</ul>

            <li>Access to diverse spaces for music making</li>
            <li>Convenience and Flexibility</li>
            <li>Cost-Effective Solutions</li>
            <li>Opportunities for Collaborations</li>
            <li>Exploration of new locations</li>
            <li>User-Generated Content</li>
            <li>Network and Industry Exposure</li>
            <li>User Reviews and Recommendations</li>
            <li>Supportive Music Community</li>
            <li>Enhanced Creativity and Inspiration</li>
            <li>Access to Professional Equipment</li>
            <li>Community Events</li>
         </div>

        <div> 
            <ul>Benefits for music space providers:</ul>
            
            <li>Additional Revenue Stream (hourly/daily/weekly rates)</li>
            <li>Optimal Space Utilisation (specialised spaces: soundproof room, recording studios, rehearsal hall; extra charges for equipment rental)</li>
            <li>Promotion and Exposure (programs: classes, work opportunities, workshops, masterclasses)</li>
            <li>Expanded Reach</li>
            <li>Networking Opportunities</li>
            <li>Feedback and Improvements</li>
            <li>Community Engagement</li>
            <li>Justifiable Flexible Pricing (Premium subscription/membership plans)</li>
            <li>Enhanced Reputation</li>
            <li>Ads and Sponsorship</li>
        </div>
    </div> -->

    <div style="display: flex; justify-content: center; margin-top: 5rem;">
        <a href="https:linkedin.com/in/aldrich-pinso-07a42b12a">
            <img  class="mx-2" style="width: 30px; height: 30px;" src="/src/assets/linkedin.svg" alt="">
        </a>
        <a href="https:github.com/stradrich">
            <img  class="mx-2" style="width: 30px; height: 30px;" src="/src/assets/github.svg" alt="">
        </a>
        <a href="https://www.youtube.com/@aldrichpinso8089">
            <img  class="mx-2" style="width: 30px; height: 30px;" src="/src/assets/youtube.svg" alt="">
        </a>
        <a href="">
            <img  class="mx-2" style="width: 30px; height: 30px;" src="/src/assets/instagram.svg" alt="">
        </a>
    </div>

    <Footer/>
    
   
    
    

</template>
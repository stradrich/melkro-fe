<script setup>
import Navbar from '../../components/Navbar.vue';
import Footer from '../../components/Footer.vue';
import DropdownMenu2 from '../../components/DropdownMenu2.vue';
import Button from '../../components/Button.vue';
</script>

<template>
  <Navbar/>
  <DropdownMenu2/>

  <div class="bg-gray-100">
    <div class="bg-white p-6">
        <!-- class="text-green-600 w-16 h-16 mx-auto my-6 svg-icon" -->
      <svg viewBox="0 0 24 24" class="text-green-600 w-2 h-2 mx-auto my-6 svg-icon">
        <path class="svg-icon"
          d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
        </path>
      </svg>
    </div>
  </div>

  <div class="text-center mt-10">
        <h3 class="md:text-2xl mb-5 text-base text-gray-900 font-semibold text-center">Payment is being processed on Stripe</h3>
        <p class="text-gray-600 my-2 mb-3">⚠️ Please complete your booking payment ⚠️</p>
        <p class="text-gray-600 my-2 mb-10">We appreciate your business and we'll be in touch shortly!</p>
        <p> Have a great day!  </p>
        <div class="py-10 text-center">
          <router-link to="/musicianDashboard" class="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
            <Button class="ml-5" text="Go back to dashboard" style="margin: 5px; padding: 10px; background-color: black; color: #ffffff; border: none; border-radius: 5px; cursor: pointer;" />  
          </router-link>
        </div>
        <div class="mt-5">
          <p>
            If you have any questions, please email
            <a href="mailto:aldrichpinso@example.com">aldrichpinso@example.com</a>.
          </p>
        </div>
</div>

  <Footer/>
</template>

<style scoped>
.svg-icon {
  fill: green;
  width: 64px; /* Set the width and height as needed */
  height: 64px;

}
</style>

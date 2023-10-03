<script setup>
import Button from '../../components/Button.vue';
import Navbar from '../../components/Navbar.vue';
import Footer from '../../components/Footer.vue';
</script>

<template>
    <Navbar/>

    <section style="background-color: #ffffff;" class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
    <h2 style="margin-bottom: 1rem; font-size: 2.25rem; line-height: 2.5rem; font-weight: 800; text-align: center; color: #1f2937;" class="text-center text-gray-900 dark:text-white">Contact Us</h2>
    <p style="margin-bottom: 2.5rem; font-weight: 300; text-align: center; color: #6b7280;" class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback about our services? Need details about our Business plan? Let us know.</p>

    <div style="display: flex; justify-content: center; margin-bottom: 1rem;">
        <img style="height: 12rem; width: 10rem;" src="/src/assets/juicy-woman-preparing-startup-rocket-to-launch-with-ideas.png" alt="" loading="lazy">
    </div>
    <form action="#">
        <div style="margin: 3rem 2.5rem;">
            <label for="email" style="display: block; margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 500; color: #1f2937;" class="block mx-10 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
            <input type="email" id="email" style="background-color: #f9fafb; border: 1px solid #e5e7eb; color: #1f2937; font-size: 0.875rem; border-radius: 0.375rem; padding: 0.625rem; outline: 2px solid transparent; outline-offset: 2px; transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out; display: block; width: 100%;" placeholder="name@flowbite.com" required>
        </div>
        <div style="margin: 3rem 2.5rem;">
            <label for="subject" style="display: block; margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 500; color: #1f2937;" class="block mx-10 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
            <input type="text" id="subject" style="background-color: #ffffff; border: 1px solid #e5e7eb; color: #1f2937; font-size: 0.875rem; border-radius: 0.375rem; padding: 0.875rem; outline: 2px solid transparent; outline-offset: 2px; transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out; display: block; width: 100%;" placeholder="Let us know how we can help you" required>
        </div>
        <div style="margin: 3rem 2.5rem;">
            <label for="message" style="display: block; margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 500; color: #1f2937;" class="block mx-10 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
            <textarea id="message" rows="6" style="background-color: #ffffff; border: 1px solid #e5e7eb; color: #1f2937; font-size: 0.875rem; border-radius: 0.375rem; padding: 0.625rem; outline: 2px solid transparent; outline-offset: 2px; transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out; display: block; width: 100%;" placeholder="Leave a comment..."></textarea>
        </div>
        <button type="submit" class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send message</button>
    </form>

    <Button class=" bg-black mx-10" text="Send"/>
</section>


<Footer/>



</template>
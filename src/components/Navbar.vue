<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import NonMobileNavbar from './NonMobileNavbar.vue';
import MobileNavbar from './MobileNavbar.vue';

const screenWidth = ref(window.innerWidth);

const isDesktop = computed(() => screenWidth.value >= 600);

const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', updateScreenWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScreenWidth);
});
</script>


<template>
  <div>
    <!-- Main Navbar -->
    <NonMobileNavbar  v-if="isDesktop" />

    <!-- Mobile Navbar -->
    <MobileNavbar  v-else />
  </div>
</template>


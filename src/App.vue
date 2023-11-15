<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <v-app class="full-screen">
    <v-container class="ml-0">
      <RouterView/>
    </v-container>
  </v-app>
</template>

<style scoped>
.full-screen {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
}

/* Mobile responsiveness */
@media only screen and (max-width: 600px) {
  .full-screen {
    width: auto;
    overflow-x: hidden;
  }
}
</style>

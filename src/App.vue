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

<!-- <v-content>
</v-content> -->

<style scoped>
.full-screen {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
}
</style>









<template>
    <div>
      <h2>{{ title }}</h2>
      <p><slot></slot></p>
      <br>
    </div>
  </template>
  
  <script setup>
  props: {
    title: String,
  };
  </script>
  
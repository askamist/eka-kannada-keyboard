<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <Navbar />
  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
.container {
  padding: 16px;
}
</style>

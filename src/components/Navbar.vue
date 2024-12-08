<script setup lang="ts">
import { Menubar } from "primevue";
import { MenuItem } from "primevue/menuitem";
import { Ref, ref } from "vue";
import router from "./../router";

const menuItems: Ref<MenuItem[]> = ref([
  {
    label: "Documentation",
    command: () => router.push({ name: "Documentation" }),
  },
  {
    label: "Downloads",
    command: ({ item }) => router.push({ name: item.label }),
  },
]);
</script>
<template>
  <Menubar :model="menuItems">
    <template #start>
      <router-link :to="{ name: 'Home' }" class="logo-title">
        <img class="logo" src="/eka-logo.svg" alt="ಏ" />
        <h1>ಕ ಕನ್ನಡ ಕೀಲಿಮಣೆ</h1>
      </router-link>
    </template>
  </Menubar>
</template>
<style scoped lang="scss">
.p-menubar {
  border: 0;
  border-radius: 0;
}

.logo {
  max-width: 3rem;
}

.logo-title {
  display: flex;
  align-items: center;
  color: var(--eka-primary-color);
  text-decoration: none;
  img,
  h1 {
    display: inline;
  }
  h1 {
    font-size: 24px;
    line-height: 20px;
    padding-top: 2px;
    position: relative;
    left: -4px;
  }
}
</style>

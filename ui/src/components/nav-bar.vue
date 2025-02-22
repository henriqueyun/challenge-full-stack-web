<template>
  <v-app-bar>
    <v-app-bar-nav-icon @click="drawer = !drawer" />
    <img
      height="100%"
      src="../assets/grupo-a-logo.png"
    >
  </v-app-bar>
  <v-navigation-drawer v-model="drawer">
    <v-list-item title="Módulo Academico" />
    <v-divider />
    <v-list-item
      link
      title="Alunos"
      @click="router.replace('/')"
    />
  </v-navigation-drawer>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import router from '@/router';

  const drawer = ref(true)
</script>
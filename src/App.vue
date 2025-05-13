<script setup>
import { RouterView } from 'vue-router'
import FooterView from './components/FooterView.vue'
import HeaderView from './components/HeaderView.vue';

</script>

<template>
  <HeaderView/>
  <RouterView />
  <FooterView />
</template>

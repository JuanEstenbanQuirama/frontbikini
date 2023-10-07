<template>
  <NavBar></NavBar>
  <router-view />
  <FooterInfo></FooterInfo>
  <Cart></Cart>
  <spinner></spinner>
</template>

<script setup>
import NavBar from "./components/navbar/NavBar.vue";
import FooterInfo from "./components/infohome/FooterInfo.vue";
import spinner from "./components/generalComponents/spinner-component.vue";
import Cart from "./components/shop/cart/Cart.vue";


</script>

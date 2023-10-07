<script setup>
import { useShopStore } from "src/stores/shop";
import { ref, watchEffect } from "vue";

const shopStore = useShopStore();
let total = ref(0);

const props = defineProps({
  products: Array,
});

watchEffect(() => {
  props.products; // se ha eliminado o incrementado un producto
  let totalTemp = 0;
  props.products.forEach((product) => {
    totalTemp += product.clientCost * product.quantity;
  });
  total.value = totalTemp.toFixed(2);
});
</script>

<template lang="pug">
.footerCart
  p Shiping & Taxes calculated at checkout
  router-link(to="/cartresume")
    q-btn(@click="shopStore.setShowCart(false)") Continue: {{ total }} $
</template>


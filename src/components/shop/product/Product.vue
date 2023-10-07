<script setup>
import { API_URL } from "../../../utils/constants";
import { addProductCartApi } from "../../../api/cart";
import { defineProps } from "vue";
import { useShopStore } from "src/stores/shop";
import { onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const shopStore = useShopStore();

onMounted(() => {
  watch(route, (to, from) => {
  });
});

const props = defineProps({
  product: Object,
  productDetail: Function,
});

const productDetail = (product) => {
  props.productDetail(product);
};
</script>

<template lang="pug">
.productNew
  .productNew__img
    .productNew__img-container
      img.productNew__img(src="../../../assets/images/productdefault.png", @click="productDetail(product)")
  p.productNew__title {{ product.name }}
  p.productNew__price ${{ product.clientCost }}
  q-btn(@click="addProductCartApi(product); shopStore.setShowCart(true)") Add to cart
</template>


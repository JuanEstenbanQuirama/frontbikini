<script setup>
import { addProductCartApi, deleteProductCartApi } from "../../../api/cart";

const props = defineProps({
  products: Array,
  reloadCartToggle: Function,
});

const increaseProductCart = (product) => {
  addProductCartApi(product);
  props.reloadCartToggle();
};

const decreaseProductCart = (product) => {
  deleteProductCartApi(product);
  props.reloadCartToggle();
};
</script>

<template lang="pug">
.cartBody(v-if="products")
  h4 mis productos
  .cartBody__product(v-for="product in products", :key="product.id")
    .cartBody__product-img
      img(src="../../../assets/images/productdefault.png")
    .cartBody__product-text
      .cartBody__product-text-item
        p.cartBody__product-text-item-title {{ product.name }}
      .cartBody__product-text-item
        p.cartBody__product-text-item-quantity quantity:
        .cartBody__product-text-item-change
          q-btn(@click="increaseProductCart(product)") +
          p.cartBody__product-text-item-quantity {{ product.quantity }}
          q-btn(@click="decreaseProductCart(product)") -
      .cartBody__product-text-item
        p Price:
        p {{ product.clientCost }} $
      .botones
</template>


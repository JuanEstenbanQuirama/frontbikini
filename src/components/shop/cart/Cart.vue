<script setup>
import { useShopStore } from "src/stores/shop";
import { getProductCartApi } from "../../../api/cart";
import { watchEffect, ref } from "vue";
import CartBody from "./CartBody.vue";
import CartFooter from "./CartFooter.vue";

const shopStore = useShopStore();

let products = ref(null);
let reloadCart = ref(false);

const getProductCart = async () => {
  const response = await getProductCartApi();
  products.value = response;
};

watchEffect(() => {
  shopStore?.showCart;
  reloadCart.value;
  getProductCart();
});

const reloadCartToggle = () => {
  reloadCart.value = !reloadCart.value;
};

</script>

<template lang="pug">
.dimmer(:class="{ open: shopStore.showCart }",@click="shopStore.setShowCart(false)"
)
.cart(:class="{ open: shopStore.showCart }")
  .cart__header
    p CART {{ products.length }}
    q-btn(@click="shopStore.setShowCart(false)") x
  .cart__container 
    CartBody(:products="products", :reloadCartToggle="reloadCartToggle")
    CartFooter(v-if="products" :products="products")
</template>


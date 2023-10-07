<script setup>
import { ref, watchEffect, watch } from "vue";
import { getProductCartApi, deleteAllProductCartApi, deleteCartApi } from "src/api/cart";

let products = ref('');
let reloadCart = ref(false);

watchEffect(async () => {
  reloadCart.value;
  const response = await getProductCartApi();
  products.value = response;
});

const getTotal = () => {
  let totalTemp = 0;
  products.value.forEach((product) => {
    totalTemp += product.clientCost * product.quantity;
  });
  return totalTemp.toFixed(2);
};

const deleteAllProductCart = (product) => {
  deleteAllProductCartApi(product);
  reloadCart.value = !reloadCart.value;
};

</script>

<template lang="pug">
q-page 
  .cartResume
    .cartResume-icon-back
      q-icon(
        name="eva-arrow-circle-left",
        size="25px",
        @click="$router.back()"
      )
    h3 finalice purchase
    .cartResume__table
      table
        thead
          tr
            th
            th
            th Producto
            th Price
            th Quantity
            th Subtotal
        tbody
          tr(v-for="product in products" :key="product.id")
            td
              q-btn(@click="deleteAllProductCart(product)") X
            td
              img.imagen-producto(
                src="../../assets/images/productdefault.png"
              )
            td {{ product.name }}
            td {{ product.clientCost }} $
            td {{ product.quantity }} 
            td {{ product.quantity * product.clientCost }} $
          tr.result 
            td
            td
            td.result-item total
            td
            td.result-item {{ getTotal() }} $
            td
    .cartResume-boton
      q-btn(v-if="products") Finish
      h4(v-else="!products") Your cart is empy
      
      
</template>


<style  lang="scss">
.imagen-producto{
  width: 50px;
  height: auto;
}
</style>
<script setup>
import { useShopStore } from "src/stores/shop";
import { ref, computed, watchEffect } from "vue";
import { productAdminApi } from "src/api/product/ProductAdmin";
import { useRoute, useRouter } from "vue-router";
import { addProductCartApi } from "src/api/cart";

const router = useRouter();
const route = useRoute();
const { getProducts } = productAdminApi();
const shopStore = useShopStore();

const product = ref([]);
const products = ref([]);
const category = ref('')

watchEffect(async () => {
  const response = await shopStore.getProduct();
  product.value = response;
  category.value = response.category

  const responseProducts = await getProducts();
  products.value = responseProducts;
});

const filteredProduct = computed(() => {
  return products.value?.filter((item) => item.category === category.value);
});

const productDetail = (product) => {
  shopStore.setProduct(product);
  router.push({ path: `${product.name}` });
};
</script>

<template lang="pug">
section
  .product-detail
    .product-detail-title
      h3 Product detail
    .product-detail-back
      q-icon(
        name="eva-arrow-circle-left",
        size="25px",
        @click="$router.back()"
      )
    .product-detail-container
      .product-detail-container-image
        .product-detail-container-image-imagen
          img(src="../../assets/images/producsimilardefault.png")
      .product-detail-container-items
        h4 {{ product.name }}
        p.name {{ product.description }}
        p.price {{ product.clientCost }} $
        .product-detail-container-items-boton
          q-btn(@click="addProductCartApi(product); shopStore.setShowCart(true)", label="Add to cart") 
          q-btn(@click="addProductCartApi(product); $router.push({ path: '/cartresume' }) ", label="Buy now") 
    .product-detail-title
      h5 Similar products
    .product-detail-similar
      .product-detail-similar-item(
        v-for="filteredProduct in filteredProduct",
        :key="filteredProduct.id"
      )
        .product-detail-similar-item-image
          img(src="../../assets/images/productdefault.png" @click="productDetail(filteredProduct)")
        p.name {{ filteredProduct.name }}
        p.price {{ filteredProduct.clientCost }} $
        q-btn(
          @click="addProductCartApi(filteredProduct); shopStore.setShowCart(true)", label="Add"
        ) 
</template>

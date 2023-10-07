<script setup>
import { ref, onMounted, watch, computed } from "vue";
// import { getProductsApi } from "../../api/product";
import { useRoute, useRouter } from "vue-router";
import Product from "../product/Product.vue";
import { useShopStore } from "src/stores/shop";
import maintenanceVue from "src/components/generalComponents/maintenance.vue";
import { productAdminApi } from "src/api/product/ProductAdmin";

const { getProducts } = productAdminApi();
const shopStore = useShopStore();
const route = useRoute();
const router = useRouter();

let productsApi = ref(null);
let categoriesApi = ref(null);

onMounted(async () => {
  let response = await getProducts();
  productsApi.value = response;
});

const productDetail = (product) => {
  shopStore.setProduct(product);
  router.push({ path: `${product.name}` });
};

//  solo productos de esa categoria
const filteredProducts = computed(() => {
  return productsApi.value?.filter((classe) => classe.category === "sportwear");
});
</script>

<template lang="pug">
section.carrito
  .carrito--category
    h3.carrito--category-title Fitnes apparel
    div.carrito--category-back
      q-icon(
        name="eva-arrow-circle-left",
        size="25px",
        @click="$router.back()"
      )
  .carrito--container
    .carrito--container-products(
      v-for="product in filteredProducts",
      :key="product.id"
    )
      Product(:product="product", :productDetail="productDetail")
</template>


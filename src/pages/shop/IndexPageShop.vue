<script setup>
import { ref, onMounted, watch, computed } from "vue";
// import { getProductsApi } from "../../api/product";
import { useRoute, useRouter } from "vue-router";
import Product from "src/components/shop/product/Product.vue";
import { useShopStore } from "src/stores/shop";
import { productAdminApi } from "src/api/product/ProductAdmin";
import { addProductCartApi } from "src/api/cart";

const { getProducts, getPackages } = productAdminApi();
const shopStore = useShopStore();
const route = useRoute();
const router = useRouter();

const productsApi = ref([]);
const packagesApi = ref([]);

onMounted(async () => {
  let response = await getProducts();
  productsApi.value = response;

  const responsePackages = await getPackages();
  packagesApi.value = responsePackages;
});

const productDetail = (product) => {
  shopStore.setProduct(product);
  router.push({ path: "/shop/" + `${product.name}` });
};

const filteredProduct = computed(() => {
  return productsApi.value?.filter((classe) => classe.category === "sportwear");
});

const filteredProduct2 = computed(() => {
  return productsApi.value?.filter((classe) => classe.category === "equipment");
});

const filteredProduct3 = computed(() => {
  return productsApi.value?.filter((classe) => classe.category === "nutrition");
});
</script>

<template lang="pug">
section.bk__all--products
  .bk__all--products-title
    h3 All products
    .bk__all--products-title-to
      q-btn(label="Packages", @click="$router.push({ path: '/shop/packages' })") 
      q-btn(label="Memberships", @click="$router.push({ path: '/memberships' })" )
  .bk__all--products-items
    .memberships--container-separator
      .memberships--container-separator-line
      p.memberships--container-separator-text Fitnes apparel
      .memberships--container-separator-line
    .carrito--container
      .carrito--container-items-products(
        v-for="product in filteredProduct",
        :key="product.id"
      )
        Product(:product="product", :productDetail="productDetail")
    .memberships--container-separator
      .memberships--container-separator-line
      p.memberships--container-separator-text Equipment
      .memberships--container-separator-line
    .carrito--container
      .carrito--container-products(
        v-for="product in filteredProduct2",
        :key="product.id"
      )
        Product(:product="product", :productDetail="productDetail")
    .memberships--container-separator
      .memberships--container-separator-line
      p.memberships--container-separator-text Nutrition
      .memberships--container-separator-line
    .carrito--container
      .carrito--container-products(
        v-for="product in filteredProduct3",
        :key="product.id"
      )
        Product(:product="product", :productDetail="productDetail")
</template>

<style lang="scss">
.bk__all--products {
  max-width: 1300px;
  padding: 60px 15px;
  width: 100%;
  margin: 0 auto;
  &-title {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    &-to {
      display: flex;
      gap: 2rem;
      & button {
        @include bkfPrimaryBtn;
        font-size: 15px;
        // font-weight: bold;
      }
    }
  }
  &-items {
    margin: 1%;
  }
}
</style>



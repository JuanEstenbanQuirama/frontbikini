<script setup>
import { onMounted, watchEffect, ref, computed } from "vue";
import { useShopStore } from "src/stores/shop";
import { addProductCartApi } from "src/api/cart";
import { productAdminApi } from "src/api/product/ProductAdmin";
import { useRouter } from "vue-router";

const shopStore = useShopStore();
const { getPackages } = productAdminApi();
const router = useRouter();

const packagesApi = ref([]);
const selectPackage = ref([]);
const urlBaseImg = import.meta.env.BASE_URL + "resources/";

const addPackageProducstCart = ref({
  name: "",
  img: "",
  id: 0,
  clientCost: 0,
});

onMounted(async () => {
  const response = await getPackages();
  packagesApi.value = response;
});

watchEffect(async () => {
  const response = await shopStore.getPackage();
  selectPackage.value = response;
});

const addPackageCart = (eachPackage) => {
  let totalCost = 0;
  addPackageProducstCart.value = {
    name: eachPackage.name,
    img: eachPackage.img,
    id: eachPackage.id,
  };
  eachPackage.products.map((product) => {
    totalCost += product.clientCost;
    addPackageProducstCart.value.clientCost = totalCost;
  });
  addProductCartApi(addPackageProducstCart.value);
};

const goPackage = (eachPackage) => {
  shopStore.setPackage(eachPackage);
  router.push({ path: `${eachPackage.name}` });
};

const totalCost = computed(() => {
  let sum = 0;
  for (const onlyPackage of selectPackage.value.products) {
    sum += onlyPackage.clientCost;
  }
  return sum;
});

const getPackageTotalCost = (eachPackage) => {
  let totalCost = 0;
  eachPackage.products.forEach((product) => {
    totalCost += product.clientCost;
  });
  return totalCost;
};
</script>

<template lang="pug">
section
  .product-detail
    .product-detail-title
      h5 Packages detail
    .product-detail-back
      q-icon(
        name="eva-arrow-circle-left",
        size="25px",
        @click="$router.back()"
      )
    .product-detail-container
      .product-detail-container-image
        .product-detail-container-image-imagen
          img(:src="urlBaseImg + selectPackage.img")
      .product-detail-container-items
        h4 {{ selectPackage.name }} 
        p {{ selectPackage.description }}
        div.product-detail-container-items-products
            div.product-detail-container-items-products-iterador(v-for="onlyPackage in selectPackage.products", :key="onlyPackage.id") 
                img.product-detail-container-items-products-iterador-imagen(:src="urlBaseImg + onlyPackage.img")
                p {{ onlyPackage.name }}
                p {{ onlyPackage.clientCost }} $
        p.price {{ totalCost }} $
        .product-detail-container-items-boton
          q-btn(
            @click="addPackageCart(selectPackage); shopStore.setShowCart(true)"
          ) add to cart
          q-btn(
            @click="addPackageCart(selectPackage); $router.push({ path: '/cartresume' })"
          ) buy now
    .product-detail-title
      h5 Other packages
    .product-detail-similar
      .product-detail-similar-item(v-for="eachPackage in packagesApi", :key="eachPackage.id")
        .product-detail-similar-item-image 
            img(
          :src="urlBaseImg + eachPackage.img",
          @click="goPackage(eachPackage)"
        )
        p {{ eachPackage.name }}
        p {{ eachPackage.description }}
        p {{ getPackageTotalCost(eachPackage)}} $
        q-btn(@click="addPackageCart(eachPackage); shopStore.setShowCart(true)") add
</template>

<style lang="scss">
.product-detail-container-items-products{
    &-iterador{
        display: flex;
        gap: .5rem;
        &-imagen{
            width: 50px;
            height: 50px;
        }
        
    }
}
</style>
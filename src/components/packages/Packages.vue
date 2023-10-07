<script setup>
import { productAdminApi } from "src/api/product/ProductAdmin";
import { onMounted, ref } from "vue";
import { addProductCartApi } from "src/api/cart";
import { useShopStore } from "src/stores/shop";
import { useRoute, useRouter } from "vue-router";

const { getPackages } = productAdminApi();
const shopStore = useShopStore();
const router = useRouter();
const route = useRoute();

const urlBaseImg = import.meta.env.BASE_URL + "resources/";
const packagesApi = ref([]);

const addPackageProducstCart = ref({
  name: "",
  img: "",
  id: 0,
  clientCost: 0,
});

const goPackage = (eachPackage) => {
  shopStore.setPackage(eachPackage);
  router.push({ path: "/packages/" + `${eachPackage.name}` });
};

onMounted(async () => {
  const response = await getPackages();
  packagesApi.value = response;
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

const getPackageTotalCost = (eachPackage) => {
  let totalCost = 0;
  eachPackage.products.forEach((product) => {
    totalCost += product.clientCost;
  });
  return totalCost;
};
</script>

<template lang="pug">
section.bk__packages
  .bk__packages--container
    .bk__packages--container-title 
      h3 Packages
    .bk__packages--container-back
      q-icon(
        name="eva-arrow-circle-left",
        size="25px",
        @click="$router.back()"
      )
    .bk__packages--container-elements
      .bk__packages--container-elements-item(
        v-for="eachPackage in packagesApi",
        :key="eachPackage.id"
      )
        p {{ eachPackage.name }}
        .bk__packages--container-elements-item-imagen
          img.bk__packages--container-elements-item-imagen-img(
            :src="urlBaseImg + eachPackage.img",
            @click="goPackage(eachPackage)"
          )
        p {{ eachPackage.description }}
        p {{ getPackageTotalCost(eachPackage) }} $
        q-btn(
          @click="addPackageCart(eachPackage); shopStore.setShowCart(true)", label="Add to cart"
        )
</template>

<style lang="scss">
.bk__packages {
  margin: 5rem 0rem;
  display: flex;
  justify-content: center;
  &--container {
    gap: 2rem;
    display: flex;
    flex-direction: column;
    &-title {
      text-align: center;
    }
    &-back{
      padding: 0px 7%;
    }
    &-elements {
      display: flex;
      flex-flow: row wrap;
      gap: 1rem;
      justify-content: center;
      &-item {
        border-radius: 12px;
        display: flex;
        flex-flow: column wrap;
        text-align: center;
        align-items: center;
        background: #111;
        gap: 5px;
        padding: 10px;
        width: 294px;
        height: auto;
        &-imagen {
          cursor: pointer;
          width: 150px;
          height: 150px;
          &-img {
            width: 100%;
            height: 100%;
          }
        }
        .q-btn {
          @include bkfPrimaryBtn;
          text-align: center;
        max-width: 135px;
        white-space: nowrap;
        }
      }
    }
  }
}
</style>
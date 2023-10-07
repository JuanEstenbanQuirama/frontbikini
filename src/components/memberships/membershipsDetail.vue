<script setup>
import { onMounted, ref, computed } from "vue";
import { addProductCartApi } from "src/api/cart";
import { useShopStore } from "src/stores/shop";
import { membershipBenefitsAdminApi} from "src/api/membershipBenefits/MembershipBenefitsAdmin"

const { getMembershipBenefitsById } = membershipBenefitsAdminApi();
const shopStore = useShopStore();

const urlBaseImg = import.meta.env.BASE_URL + "resources/";
const benefits = ref([])
const product = ref([]);

onMounted(async () => {
  const response = await shopStore.getProduct();
  product.value = response;

  const responseBenefit = await getMembershipBenefitsById(response.id);
  benefits.value = responseBenefit
});
</script>

<template lang="pug">
section.bk__quiz
  .bk__quiz--buy-recommended
    .bk__quiz--buy-recommended-container
      .bk__quiz--buy-recommended-container-img
        img(:src="urlBaseImg + product.img")
      .bk__quiz--buy-recommended-container-back
        q-icon(
          name="fa-solid fa-circle-chevron-left",
          size="18px",
          @click="$router.back()"
        )
      .bk__quiz--buy-recommended-container-text
        .bk__quiz--buy-recommended-container-text-info
          p.bk__quiz--buy-recommended-container-text-info-title {{ product.name }}
          p.bk__quiz--buy-recommended-container-text-info-price {{ product.clientCost }} $
          p.bk__quiz--buy-recommended-container-text-info-subtitle {{ product.description }}
        .bk__quiz--buy-recommended-container-text-elements
          .bk__quiz--buy-recommended-container-text-elements-item(v-for="oneBenefit in benefits", :key="oneBenefit.id")
            q-icon(name="done", size="20px")
            p.bk__quiz--buy-recommended-container-text-elements-item-description {{oneBenefit.benefit}}
          //- .bk__quiz--buy-recommended-container-text-elements-item
          //-   q-icon(name="done", size="20px")
          //-   p.bk__quiz--buy-recommended-container-text-elements-item-description.opacidad 30 - 45 Minute workouts for the busy girl.
          //- .bk__quiz--buy-recommended-container-text-elements-item
          //-   q-icon(name="done", size="20px")
          //-   p.bk__quiz--buy-recommended-container-text-elements-item-description.opacidad Quick & easy recipes and Meal Guides.
          //- .bk__quiz--buy-recommended-container-text-elements-item
          //-   q-icon(name="done", size="20px")
          //-   p.bk__quiz--buy-recommended-container-text-elements-item-description.opacidad Achieve a full body transformation.
        .bk__quiz--buy-recommended-container-text-boton
          q-btn(
            label="Buy now",
            @click="addProductCartApi(product); $router.push({ path: '/cartresume' })"
          )
          q-btn(
            label="Add to cart",
            @click="addProductCartApi(product); shopStore.setShowCart(true)"
          )
    .bk__quiz--buy-recommended-back-home
      q-btn(label="Back home", @click="$router.push({ path: '/' })")
</template>

<!-- se reutilizan las clases de buyrecomendenprogram del quiz para el productodetial de los servicios online -->
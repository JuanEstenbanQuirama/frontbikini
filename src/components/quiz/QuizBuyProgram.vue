<script setup>
import { onMounted, ref, computed } from "vue";
import { useQuizStore } from "src/stores/quiz";
import { addProductCartApi } from "src/api/cart";
import { useShopStore } from "src/stores/shop";

const quizStore = useQuizStore();
const shopStore = useShopStore();
const stepFilter = ref("");
const urlBaseImg = import.meta.env.BASE_URL + "resources/";

const onlineProgram = [
  {
    id: 32,
    name: "BIKINI READY program",
    description: "online",
    cost: 55,
    clientCost: 55,
    taxes: 1,
    activeSale: true,
    img: "program4.jpg",
    barCode: "0001",
    partner: "Central Office",
    type: "Memberships",
    programRef: "referencia",
  },
  {
    id: 33,
    name: "BOOTY under construction",
    description: "online",
    cost: 90,
    clientCost: 90,
    taxes: 1,
    activeSale: true,
    img: "program3.jpg",
    barCode: "0002",
    partner: "Central Office",
    type: "Memberships",
    programRef: "Both",
  },
  {
    id: 34,
    name: "BUSY MOM program",
    description: "online",
    cost: 49,
    clientCost: 49,
    taxes: 1,
    activeSale: true,
    img: "program2.jpg",
    barCode: "0003",
    partner: "Central Office",
    type: "Memberships",
    programRef: "At home",
  },
  {
    id: 35,
    name: "PLATINUM program",
    description: "online",
    cost: 250,
    clientCost: 250,
    taxes: 1,
    activeSale: true,
    img: "program1.png",
    barCode: "0004",
    partner: "Central Office",
    type: "Memberships",
    programRef: "In the gym",
  },
];

onMounted(async () => {
  const response = await quizStore.getStepFour();
  stepFilter.value = response.title;
});

const filteredProgram = computed(() => {
  return onlineProgram?.filter(
    (iterador) => iterador.programRef === stepFilter.value
  );
});
</script>

<template lang="pug">
section.bk__quiz
  .bk__quiz--buy-recommended
    .bk__quiz--buy-recommended-container(
      v-for="buyProgram in filteredProgram",
      :key="buyProgram.id"
    )
      .bk__quiz--buy-recommended-container-img
        img(:src="urlBaseImg + buyProgram.img")
      .bk__quiz--buy-recommended-container-back
        q-icon(
          name="fa-solid fa-circle-chevron-left",
          size="18px",
          @click="$router.back()"
        )
      .bk__quiz--buy-recommended-container-text
        .bk__quiz--buy-recommended-container-text-info
          p.bk__quiz--buy-recommended-container-text-info-title {{ buyProgram.name }}
          p.bk__quiz--buy-recommended-container-text-info-price {{ buyProgram.clientCost }} $
          p.bk__quiz--buy-recommended-container-text-info-subtitle {{ buyProgram.description }}
        .bk__quiz--buy-recommended-container-text-elements
          .bk__quiz--buy-recommended-container-text-elements-item
            q-icon(name="done", size="20px")
            p.bk__quiz--buy-recommended-container-text-elements-item-description 20% - 40% OFF on the products we incorporate in the meal plan
          .bk__quiz--buy-recommended-container-text-elements-item
            q-icon(name="done", size="20px")
            p.bk__quiz--buy-recommended-container-text-elements-item-description.opacidad 30 - 45 Minute workouts for the busy girl.
          .bk__quiz--buy-recommended-container-text-elements-item
            q-icon(name="done", size="20px")
            p.bk__quiz--buy-recommended-container-text-elements-item-description.opacidad Quick & easy recipes and Meal Guides.
          .bk__quiz--buy-recommended-container-text-elements-item
            q-icon(name="done", size="20px")
            p.bk__quiz--buy-recommended-container-text-elements-item-description.opacidad Achieve a full body transformation.
        .bk__quiz--buy-recommended-container-text-boton
          q-btn(
            label="Buy now",
            @click="addProductCartApi(buyProgram); $router.push({ path: '/cartresume' })"
          )
          q-btn(
            label="Add to cart",
            @click="addProductCartApi(buyProgram); shopStore.setShowCart(true)"
          )
    .bk__quiz--buy-recommended-back-home
      q-btn(label="Back home", @click="$router.push({ path: '/' })")
</template>


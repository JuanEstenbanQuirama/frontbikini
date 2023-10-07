<script setup>
import { ref, onMounted, computed } from "vue";
import { useQuizStore } from "src/stores/quiz";

const quizStore = useQuizStore();
const stepFilter = ref("");
const urlBaseImg = import.meta.env.BASE_URL + "resources/";

const onlineProgram = [
  {
    id: 1,
    image: "program4.jpg",
    title: "BIKINI READY PROGRAM",
    description: "8 weeks - Build Muscle - Grow Glutes",
    programRef: "sin referencia",
  },
  {
    id: 2,
    image: "program3.jpg",
    title: "BOOTY UNDER CONSTRUCTION",
    description: "8 weeks - Build Muscle - Grow Glutes",
    programRef: "Both",
  },
  {
    id: 3,
    image: "program2.jpg",
    title: "BUSY MOM PROGRAM",
    description: "8 weeks - Build Muscle - Grow Glutes",
    programRef: "At home",
  },
  {
    id: 4,
    image: "program1.png",
    title: "PLATINUM MEMBERSHIP",
    description: "8 weeks - Build Muscle - Grow Glutes",
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
  .bk__quiz--recommended
    .bk__quiz--recommended-title
      q-icon(
        name="fa-solid fa-circle-chevron-left",
        size="18px",
        @click="$router.back()"
      )
      span Your recommended program
    .bk__quiz--recommended-container(v-for="program in filteredProgram", :key="program.id")
      .bk__quiz--recommended-container-img
        img(:src="urlBaseImg + program.image")
      .bk__quiz--recommended-container-text
        p.bk__quiz--recommended-container-text-title {{program.title}}
        p.bk__quiz--recommended-container-text-description {{ program.description }}
        q-btn(
          label="Explore now",
          @click="$router.push({ path: '/quiz/buyprogram' })"
        )
</template>


<script setup>
import { ref } from "vue";
import { useQuizStore } from "src/stores/quiz";
import { useRouter } from "vue-router";
const quizStore = useQuizStore();
const router = useRouter();
const urlBaseImg = import.meta.env.BASE_URL + "resources/";

const stepFour = [
  {
    id: 1,
    image: "quiz-step-four-home.png",
    title: "At home",
  },
  {
    id: 2,
    image: "quiz-step-four-gym.png",
    title: "In the gym",
  },
  {
    id: 3,
    image: "quiz-step-four-both.png",
    title: "Both",
  },
];

const addToStore = (option) => {
  quizStore.setStepFour(option);
  router.push({ path: "/quiz/stepfive" });
};
</script>
<template lang="pug">
section.bk__quiz.espacio
  .bk__quiz--container
    .bk__quiz--container-title
      q-icon(
        name="fa-solid fa-circle-chevron-left",
        size="18px",
        @click="$router.back()"
      )
      span Step 4 of 5
    .bk__quiz--container-progress
      .bk__quiz--container-progress-complete.check
      .bk__quiz--container-progress-complete.check
      .bk__quiz--container-progress-complete.check
      .bk__quiz--container-progress-complete.check
      .bk__quiz--container-progress-complete
    .bk__quiz--container-time 
      q-icon(name="alarm", size="25px")
      span Less than 2 minutes!
    p.bk__quiz--container-text Where do you prefer to train?
    //- q-btn(@click="$router.push({ path: '/quiz/steptwo' })") Click here
  .bk__quiz--choose
    q-btn.bk__quiz--choose-stepfour(
      v-for="option in stepFour",
      :key="option.id",
      @click="addToStore(option)"
    )
      .bk__quiz--choose-stepfour-image
        img(:src="urlBaseImg + option.image")
      p.bk__quiz--choose-stepfour-title {{ option.title }}
</template>

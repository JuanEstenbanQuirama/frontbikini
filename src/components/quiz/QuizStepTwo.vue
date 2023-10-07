<script setup>
import { ref } from "vue";
import { useQuizStore } from "src/stores/quiz";
import { useRouter } from "vue-router";
const quizStore = useQuizStore();
const router = useRouter();

const stepTwo = [
  {
    id: 1,
    text: "Finding time to workout.",
  },
  {
    id: 2,
    text: "Following a meal guide and tracking calories.",
  },
  {
    id: 3,
    text: "Staying motivated.",
  },
  {
    id: 4,
    text: "Feeling supported throught my journey.",
  },
  {
    id: 5,
    text: "Intensive working.",
  },
  {
    id: 6,
    text: "Motivation and intensive working.",
  },
];

const addToStore = (option) => {
  quizStore.setStepTwo(option);
  router.push({ path: '/quiz/stepthree' });
};
</script>
<template lang="pug">
section.bk__quiz
  .bk__quiz--container
    .bk__quiz--container-title
      q-icon(
        name="fa-solid fa-circle-chevron-left",
        size="18px",
        @click="$router.back()"
      )
      span Step 2 of 5
    .bk__quiz--container-progress
      .bk__quiz--container-progress-complete.check
      .bk__quiz--container-progress-complete.check
      .bk__quiz--container-progress-complete
      .bk__quiz--container-progress-complete
      .bk__quiz--container-progress-complete
    .bk__quiz--container-time 
      |
      |
      q-icon(name="alarm", size="25px")
      span Less than 2 minutes!

    p.bk__quiz--container-text What do you currently struggle with the most on
    p.bk__quiz--container-text your fitness journey?
    //- q-btn(@click="$router.push({ path: '/quiz/stepthree' })") Click here
  .bk__quiz--choose
    q-btn.bk__quiz--choose-steptwo(
      v-for="option in stepTwo",
      :key="option.id"
      @click="addToStore(option)"
    )
      p {{option.text}}.
    
</template>

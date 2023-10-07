<script setup>
import { ref } from "vue";
import { useQuizStore } from "src/stores/quiz";
import { useRouter } from "vue-router";

const quizStore = useQuizStore();
const router = useRouter();
const stepThree = [
  {
    id: 1,
    text: "I have never trained before."
  },
  {
    id: 2,
    text: "I have some training experience, but this is my firt time."
  },
  {
    id: 3,
    text: "I am an advanced trainer."
  },
  {
    id: 4,
    text: "Feeling supported throught my journey."
  },
  {
    id: 5,
    text: "Lorem ipsum dolor sit amet."
  },
]

const addToStore = (option) => {
  quizStore.setStepThree(option);
  router.push({ path: '/quiz/stepfour' });
};

</script>
<template lang="pug">
section.bk__quiz
  .bk__quiz--container
    .bk__quiz--container-title
      q-icon(name="fa-solid fa-circle-chevron-left", size="18px", @click="$router.back()")
      span Step 3 of 5
    .bk__quiz--container-progress
      .bk__quiz--container-progress-complete.check
      .bk__quiz--container-progress-complete.check
      .bk__quiz--container-progress-complete.check
      .bk__quiz--container-progress-complete
      .bk__quiz--container-progress-complete
    .bk__quiz--container-time 
      |
      q-icon(name="alarm", size="25px")
      span Less than 2 minutes!

    p.bk__quiz--container-text What do you currently struggle with the most on
    p.bk__quiz--container-text your fitness journey?
    //- q-btn(@click="$router.push({ path: '/quiz/steptwo' })") Click here
  .bk__quiz--choose
    q-btn.bk__quiz--choose-steptwo(v-for="option in stepThree", :key="option.id" @click="addToStore(option)" )
      p {{option.text}}.
</template>



<!-- se reutilizan las clases del steptwo -->
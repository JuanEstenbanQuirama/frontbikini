<script setup>
import { ref } from "vue";
import { useQuizStore } from "src/stores/quiz";
import { useRouter } from "vue-router";

const quizStore = useQuizStore();
const router = useRouter();
const urlBaseImg = import.meta.env.BASE_URL + "resources/";

const stepOne = [
  {
    id: 1,
    image: "quiz1.png",
    title:
      "Increase overall strenght while focusing on building and shaping my lower body.",
    text: "want to focus on sculpting my legs and growing my glutes. I enjoy weight lifting and challeging myself.",
  },
  {
    id: 2,
    image: "quiz2.png",
    title:
      "Increase overall strenght while focusing on building and shaping my lower body.",
    text: "want to focus on sculpting my legs and growing my glutes. I enjoy weight lifting and challeging myself.",
  },
  {
    id: 3,
    image: "quiz3.png",
    title:
      "Increase overall strenght while focusing on building and shaping my lower body.",
    text: "want to focus on sculpting my legs and growing my glutes. I enjoy weight lifting and challeging myself.",
  },
];

const addToStore = (option) => {
  quizStore.setStepOne(option);
  router.push({ path: "/quiz/steptwo" });
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
      span Step 1 of 5
    .bk__quiz--container-progress
      .bk__quiz--container-progress-complete.check
      .bk__quiz--container-progress-complete
      .bk__quiz--container-progress-complete
      .bk__quiz--container-progress-complete
      .bk__quiz--container-progress-complete
    .bk__quiz--container-time 
      q-icon(name="alarm", size="25px")
      span Less than 2 minutes!
    p.bk__quiz--container-text What is your overall fitness goal?
  .bk__quiz--choose
    q-btn.bk__quiz--choose-stepone(
      v-for="option in stepOne",
      :key="option.id",
      @click="addToStore(option)"
    )
      .bk__quiz--choose-stepone-image
        img(:src="urlBaseImg + option.image")
      .bk__quiz--choose-stepone-description
        p.bk__quiz--choose-stepone-description-title {{ option.title }}
        p.bk__quiz--choose-stepone-description-text I {{ option.text }}
</template>


<script setup>
import { ref, onMounted } from "vue";
import { useQuizStore } from "src/stores/quiz";
import { useRouter } from "vue-router";

const quizStore = useQuizStore();
const router = useRouter();

const showModal = ref(false);
const stepOne = ref("");
const stepTwo = ref("");
const stepThree = ref("");
const stepFour = ref("");
const stepFive = ref("")

onMounted(async () => {
  const response1 = await quizStore.getStepOne();
  stepOne.value = response1;
  const response2 = await quizStore.getStepTwo();
  stepTwo.value = response2;
  const response3 = await quizStore.getStepThree();
  stepThree.value = response3;
  const response4 = await quizStore.getStepFour();
  stepFour.value = response4;
  const response5 = await quizStore.getStepFive();
  stepFive.value= response5;
});

const whatsapp = () => {
  showModal.value = true;
};
</script>

<template lang="pug">
section.bk__quiz
  .bk__quiz--resume
    .bk__quiz--resume-title 
      q-icon(
        name="fa-solid fa-circle-chevron-left",
        size="18px",
        @click="$router.back()"
      )
      span Here is the summary of your quizz
    .bk__quiz--resume-container 
      |
      .bk__quiz--resume-container-item
        q-checkbox.bk__quiz--resume-container-item-checkbox
        .bk__quiz--resume-container-item-result
          p.bk__quiz--resume-container-item-result-ask 1. What is you overall fitness goal?
          p.bk__quiz--resume-container-item-result-answer {{ stepOne.text }}
      .bk__quiz--resume-container-item
        q-checkbox.bk__quiz--resume-container-item-checkbox
        .bk__quiz--resume-container-item-result
          p.bk__quiz--resume-container-item-result-ask 2. What do you currently struggle with the most on your fitness journey?
          p.bk__quiz--resume-container-item-result-answer {{stepTwo.text}}.
      .bk__quiz--resume-container-item
        q-checkbox.bk__quiz--resume-container-item-checkbox
        .bk__quiz--resume-container-item-result
          p.bk__quiz--resume-container-item-result-ask 3. What do you currently struggle with the most on your fitness journey?
          p.bk__quiz--resume-container-item-result-answer {{stepThree.text}}.
      .bk__quiz--resume-container-item
        q-checkbox.bk__quiz--resume-container-item-checkbox
        .bk__quiz--resume-container-item-result
          p.bk__quiz--resume-container-item-result-ask 4.  In order to recommend the most effective program for you, we'd like to know more about your journey so far.
          p.bk__quiz--resume-container-item-result-answer {{stepFour.title}}.
      .bk__quiz--resume-container-item
        q-checkbox.bk__quiz--resume-container-item-checkbox
        .bk__quiz--resume-container-item-result
          p.bk__quiz--resume-container-item-result-ask 5. Wich days do you like to do the exercises?
          p.bk__quiz--resume-container-item-result-answer(v-for="weekday in stepFive", :key="weekday.id") {{weekday.name}}
    .quiz-resume-boton
      q-btn(label="Next", @click="$router.push({ path: '/quiz/recommended' })")
    .quiz-resume-boton
      p Still not sure?
      q-icon(name="arrow_downward", size="35px")
      q-btn(label="Contact us", @click="whatsapp()")
  q-dialog.bk__quiz--popup(v-model="showModal")
    q-card.bk__quiz--popup-card
      q-card-section.bk__quiz--popup-card-section
        .bk__quiz--popup-card-section-wtp
          q-icon(name="fa-brands fa-whatsapp", size="50px")
        p.bk__quiz--popup-card-section-text Connect with us!
        p.bk__quiz--popup-card-section-text.opacidad join our community through whatsapp and solve all your doubts.
        q-card-actions.bk__quiz--popup-card-section-botons(align="center")
          q-btn(label="See Shipping")
          q-btn(label="Back", @click="showModal = false")
</template>

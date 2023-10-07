<script setup>
import { ref } from "vue";
import { useQuizStore } from "src/stores/quiz";
import { useRouter } from "vue-router";
import { alertService } from "src/libs/alert";

const { ShowAlert, ShowAlertConfirm } = alertService();
const quizStore = useQuizStore();
const router = useRouter();

const stepFive = ref([
  {
    id: 1,
    name: "Monday",
    checkbox: false,
  },
  {
    id: 2,
    name: "Tuesday",
    checkbox: false,
  },
  {
    id: 3,
    name: "Wednesday",
    checkbox: false,
  },
  {
    id: 4,
    name: "Thursday",
    checkbox: false,
  },
  {
    id: 5,
    name: "Friday",
    checkbox: false,
  },
  {
    id: 6,
    name: "Saturday",
    checkbox: false,
  },
  {
    id: 7,
    name: "Sunday",
    checkbox: false,
  },
]);

const addToStore = () => {
  const selectedWeekdays = stepFive.value.filter((weekday) => weekday.checkbox);
  if(selectedWeekdays.length > 0) {
    quizStore.setStepFive(selectedWeekdays);
    router.push({ path: "/quiz/resume" });
  } else {
    ShowAlert("Error!", "please select which days do you like to do the exercises", "error");
  }
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
      span Step 5 of 5
    .bk__quiz--container-progress
      .bk__quiz--container-progress-complete.check
      .bk__quiz--container-progress-complete.check
      .bk__quiz--container-progress-complete.check
      .bk__quiz--container-progress-complete.check
      .bk__quiz--container-progress-complete.check
    .bk__quiz--container-time 
      |
      q-icon(name="alarm", size="25px")
      span Less than 2 minutes!
    p.bk__quiz--container-text Wich days do you like to do the exercises?
    //- q-btn(@click="$router.push({ path: '/quiz/steptwo' })") Click here
  .bk__quiz--choose
    .bk__quiz--choose-stepfive
      q-checkbox.bk__quiz--choose-stepfive-select(
        v-for="weekday in stepFive",
        :key="weekday.id",
        v-model="weekday.checkbox"
      ) {{ weekday.name }}
  .quiz-step-five-boton
    q-btn(label="Next", @click="addToStore()")
</template>

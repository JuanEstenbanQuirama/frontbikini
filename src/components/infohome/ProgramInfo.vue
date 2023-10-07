<script setup>
import { useQuizStore } from "src/stores/quiz";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const quizStore = useQuizStore();

const slideProgram = ref(1);
const autoplay = ref(true);
const urlBaseImg = import.meta.env.BASE_URL + "resources/";
const trazado = "Trazado-bottom.png";



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
  {
    id: 4,
    image: "quiz-step-four-both.png",
    title: "referencia",
  },
];

// :autoplay="autoplay"
</script>

<template lang="pug">
.programInfo
  img.programInfo__trazado-top(:src="urlBaseImg + trazado")
  h3 Find your online program
  .programInfo__container.program-desktop
    .programInfo__container--items
      .programInfo__container--items-img
        img(src="../../assets/images/program4.jpg")
      p "BIKINI READY" PROGRAM
      q-btn(@click="quizStore.setStepFour(stepFour[3]); $router.push({ path: '/quiz/buyprogram' })") Click Here
    .programInfo__container--items
      .programInfo__container--items-img
        img(src="../../assets/images/program3.jpg")
      p BOOTY UNDER CONSTRUCTION
      q-btn(@click="quizStore.setStepFour(stepFour[2]); $router.push({ path: '/quiz/buyprogram' })") Click Here
    .programInfo__container--items
      .programInfo__container--items-img
        img(src="../../assets/images/program2.jpg")
      p "BUSY MOM" PROGRAM
      q-btn(@click="quizStore.setStepFour(stepFour[0]); $router.push({ path: '/quiz/buyprogram' })") Click Here
    .programInfo__container--items
      .programInfo__container--items-img
        img(src="../../assets/images/program1.png")
      p PLATINUM MEMBERSHIP
      q-btn(@click="quizStore.setStepFour(stepFour[1]); $router.push({ path: '/quiz/buyprogram' })") Click Here
  .programInfo__container.program-mobile
    q-carousel.programInfo__container-carousel(
      animated,
      v-model="slideProgram",
      navigation,
      
      
      infinite,
      arrows,
      transition-prev="slide-right",
      transition-next="slide-left",
      @mouseenter="autoplay = false",
      @mouseleave="autoplay = true"
    )
      q-carousel-slide(:name="1")
        .programInfo__container--items
          .programInfo__container--items-img
            img(src="../../assets/images/program4.jpg")
          p "BIKINI READY" PROGRAM
          q-btn(@click="quizStore.setStepFour(stepFour[3]); $router.push({ path: '/quiz/buyprogram' })") Click Here
      q-carousel-slide(:name="2")
        .programInfo__container--items
          .programInfo__container--items-img
            img(src="../../assets/images/program3.jpg")
          p BOOTY UNDER CONSTRUCTION
          q-btn(@click="quizStore.setStepFour(stepFour[2]); $router.push({ path: '/quiz/buyprogram' })") Click Here
      q-carousel-slide(:name="3")
        .programInfo__container--items
          .programInfo__container--items-img
            img(src="../../assets/images/program2.jpg")
          p "BUSY MOM" PROGRAM
          q-btn(@click="quizStore.setStepFour(stepFour[0]); $router.push({ path: '/quiz/buyprogram' })") Click Here
      q-carousel-slide(:name="4")
        .programInfo__container--items
          .programInfo__container--items-img
            img(src="../../assets/images/program1.png")
          p PLATINUM MEMBERSHIP
          q-btn(@click="quizStore.setStepFour(stepFour[1]); $router.push({ path: '/quiz/buyprogram' })") Click Here
  .programInfo__text
    .programInfo__text-element
      .programInfo__text-element-texto
        h4 Don't know which program to choose?
        p Take our 2-minute quiz and find your ideal program
        .programInfo__text-element-texto-boton
          q-btn(@click="$router.push({ path: '/quiz/stepone' })") Click here
</template>

<style lang="scss">
// .programInfo{
//   & h3 {

//     text-align: center;
//   }
// }
@media (max-width: 600px) {
  .program-desktop {
    display: none;
  }
}
@media (min-width: 600px) {
  .program-mobile {
    display: none;
  }
}
.programInfo__container-carousel {
  background: black;
  height: auto;
  & .q-carousel__navigation-inner.flex.flex-center.no-wrap {
    display: none;
  }
  & .q-carousel__slide {
    padding: 10px 30px;
  }
}
.programInfo__trazado-top{
  position: absolute;
  top: -21px;
  width: 100%;
}
</style>


<script setup>
import { ref } from "vue";
// :autoplay="autoplay",
const slideHome = ref(1);
const autoplay = ref(true);
const urlBaseImg = import.meta.env.BASE_URL + "resources/";
const trazado = "Trazado-bottom.png";
</script>
<template lang="pug">
section.bk__home--slider 
  img.bk__home--slider-trazado-bot(:src="urlBaseImg + trazado")
  q-carousel.bk__home--slider-carousel(
    animated,
    v-model="slideHome",
    navigation,
    infinite,
    arrows,
    transition-prev="slide-right",
    transition-next="slide-left",
    @mouseenter="autoplay = false",
    @mouseleave="autoplay = true"
  )
    q-carousel-slide(:name="1")
      .sliderInfo__container--images-item
        img.sliderInfo__container--images-item-img.slider-desktop(
          src="../../../public/resources/sliderPruebaImg.jpg"
        )
        img.sliderInfo__container--images-item-img.slider-mobile(
          src="../../../public/resources/Banner01mobile.jpg"
        )
        .sliderInfo__container--images-item-text
          h4.sliderInfo__container--images-item-text-textblack Ready to change
          h4.sliderInfo__container--images-item-text-textblack.left your life?
        .sliderInfo__container--images-item--button
          p Ready to take the first step?
          q-btn(@click="$router.push({ path: '/login' })") Start now!
    q-carousel-slide(:name="2")
      .sliderInfo__container--images-item
        img.sliderInfo__container--images-item-img.slider-desktop(
          src="../../../public/resources/sliderPruebaImg.jpg"
        )
        img.sliderInfo__container--images-item-img.slider-mobile(
          src="../../../public/resources/Banner01mobile.jpg"
        )
        .sliderInfo__container--images-item-text
          h4.sliderInfo__container--images-item-text-textblack Don’t forget why
          h4.sliderInfo__container--images-item-text-textblack.left you started
        .sliderInfo__container--images-item--button
          p Ready to take the first step?
          q-btn(@click="$router.push({ path: '/login' })") Start now!
    q-carousel-slide(:name="3")
      .sliderInfo__container--images-item
        img.sliderInfo__container--images-item-img.slider-desktop(
          src="../../../public/resources/sliderPruebaImg.jpg"
        )
        img.sliderInfo__container--images-item-img.slider-mobile(
          src="../../../public/resources/Banner01mobile.jpg"
        )
        .sliderInfo__container--images-item-text
          h4.sliderInfo__container--images-item-text-textblack Keep pushing
          h4.sliderInfo__container--images-item-text-textblack.left forward
        .sliderInfo__container--images-item--button
          p Ready to take the first step?
          q-btn(@click="$router.push({ path: '/login' })") Start now!
</template>



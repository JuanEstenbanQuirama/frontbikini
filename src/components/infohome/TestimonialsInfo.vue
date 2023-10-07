<script setup>
import { ref } from "vue";

const slideTestimonial = ref(1);
const autoplay = ref(true);
const urlBaseImg = import.meta.env.BASE_URL + "resources/";
const trazado = "Trazado-bottom.png";

// :autoplay="autoplay",
</script>

<template lang="pug">
section.bk__testimonials--info
  q-carousel.bk__testimonials--info-carousel(
    animated,
    v-model="slideTestimonial",
    navigation,
    infinite,
    arrows,
    transition-prev="slide-right",
    transition-next="slide-left",
    @mouseenter="autoplay = false",
    @mouseleave="autoplay = true"
  )
    q-carousel-slide.bk__testimonials--info-carousel-slide(:name="1")
      .bk__testimonials--info-carousel-slide-container
        .bk__testimonials--info-carousel-slide-container-image
          img(src="../../assets/images/testimonial.jpg")
        .bk__testimonials--info-carousel-slide-container-text
          h4 Testimonials
          p Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo est suscipit commodi beatae. Nostrum iure harum pariatur dicta veniam architecto molestiae rem corrupti, dolorum earum cum illo, dolores, alias ad.
          p -Therese (Busy girl Workouts)
          div
            p
              q-icon(name="star_border", size="25px")
              q-icon(name="star_border", size="25px")
              q-icon(name="star_border", size="25px")
              q-icon(name="star_border", size="25px")
              q-icon(name="star_border", size="25px")
            p Top 5 las Vegas Gyms

    q-carousel-slide.bk__testimonials--info-carousel-slide(:name="2")
      .bk__testimonials--info-carousel-slide-container
        .bk__testimonials--info-carousel-slide-container-image
          img(src="../../assets/images/testimonial.jpg")
        .bk__testimonials--info-carousel-slide-container-text
          h4 Testimonials
          p Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo est suscipit commodi beatae. Nostrum iure harum pariatur dicta veniam architecto molestiae rem corrupti, dolorum earum cum illo, dolores, alias ad.
          p -Therese (Busy girl Workouts)
          div
            p
              q-icon(name="star_border", size="25px")
              q-icon(name="star_border", size="25px")
              q-icon(name="star_border", size="25px")
              q-icon(name="star_border", size="25px")
              q-icon(name="star_border", size="25px")
            p Top 5 las Vegas Gyms
  img.bk__testimonials--info-trazado-bot(:src="urlBaseImg + trazado")
</template>

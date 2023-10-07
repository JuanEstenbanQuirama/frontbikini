<script setup>
import SliderInfo from "../components/infohome/SliderInfo.vue";
import AdvertisingInfo from "../components/infohome/AdvertisingInfo.vue";
import ProgramInfo from "../components/infohome/ProgramInfo.vue";
import TestimonialsInfo from "../components/infohome/TestimonialsInfo.vue";
import ContactUsInfo from "../components/infohome/ContactUsInfo.vue";
import NutritionInfo from "src/components/infohome/NutritionInfo.vue";
import MembershipsPopularInfo from "src/components/infohome/MembershipsPopularInfo.vue"

</script>
<template lang="pug">
q-page
  SliderInfo
  ProgramInfo
  AdvertisingInfo
  NutritionInfo
  MembershipsPopularInfo 
  TestimonialsInfo
  ContactUsInfo

</template>

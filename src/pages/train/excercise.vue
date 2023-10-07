<script setup>
import { watchEffect, ref, onMounted, computed } from "vue";
import { useTrainStore } from "src/stores/train";
import { classesAdminApi } from "src/api/classes/ClassesAdmin";
import { useRoute, useRouter } from "vue-router";

const { getClassExcercises } = classesAdminApi();
const trainStore = useTrainStore();
const router = useRouter();
const route = useRoute();

const excercise = ref([]);
const excercises = ref([]);

onMounted(async () => {
  const response = await getClassExcercises();
  excercises.value = response;
});

watchEffect(async () => {
  const response = await trainStore.getExcercise();
  excercise.value = response;
});

//  solo ejercicios de ese tipo
const filteredExcercises = computed(() => {
  return excercises.value?.filter(
    (classe) => classe.classType === route.params.excercise
  );
});

const goExcercise = (excercise) => {
  trainStore.setExcercise(excercise);
  router.push({ path: `${excercise.url}` });
};
</script>

<template lang="pug">
section.excercise__detail
  .excercise__detail-container
    .excercise__detail-container-back
      q-icon(
        name="eva-arrow-circle-left",
        size="25px",
        @click="$router.back()"
      )
    .excercise__detail-container-elements 
      |
      .excercise__detail-container-elements-video
        .excercise__detail-container-elements-video-url
          iframe(
            sandbox="allow-scripts allow-same-origin",
            src="https://www.youtube.com/embed/4b0gzFXmtCk",
            title="YouTube video player",
            frameborder="0",
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
            allowfullscreen
          )
        .excercise__detail-container-elements-video-data
          h4 Type: {{ excercise.classType }}
          p Name: {{ excercise.name }}
          p Description:{{ excercise.description }}
          p Duration: {{ excercise.duration }}
      .excercise__detail-container-elements-similar
        .excercise__detail-container-elements-similar-items(
          v-for="filteredExcercise in filteredExcercises",
          :key="filteredExcercise.id",
          @click="goExcercise(filteredExcercise)"
        )
          iframe(
            sandbox="allow-scripts allow-same-origin",
            width="264",
            height="166",
            src="https://www.youtube.com/embed/Q5VSWvZibpQ",
            title="YouTube video player",
            frameborder="0",
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
            allowfullscreen
          )
          p Type: {{ excercise.classType }}
</template>

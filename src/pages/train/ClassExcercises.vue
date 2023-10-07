<script setup>
import { catalogueClassAdminApi } from "src/api/catalogue/CatalogueClassAdmin";
import { classesAdminApi } from "src/api/classes/ClassesAdmin";
import { onMounted, ref, computed, watch, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTrainStore } from "../../stores/train";

const trainStore = useTrainStore();
const router = useRouter();
const route = useRoute();
const { getClassTypes } = catalogueClassAdminApi();
const { getClassExcercises } = classesAdminApi();

const classExcercises = ref([]);
const classTypes = ref([]);

onMounted(async () => {
  let response = await getClassExcercises();
  classExcercises.value = response;

  let responseTypes = await getClassTypes();
  classTypes.value = responseTypes;
});

const filteredExcercise = computed(() => {
  return classExcercises.value?.filter(
    (item) => item.classType === route.params.excercise
  );
});

const goExcersise = (excercise) => {
  trainStore.setExcercise(excercise);
  router.push({ path: `${route.params.excercise}/` + `${excercise.url}` });
};
</script>



<template lang="pug">
section.excercises__for__type
  .excercises__for__type-container
    .excercises__for__type-container-title
      h3 {{ $route.params.excercise }}
    .excercises__for__type-container-back
      q-icon(
        name="eva-arrow-circle-left",
        size="25px",
        @click="$router.back()"
      )
    .excercises__for__type-container-elements
      .excercises__for__type-container-elements-item(
        v-for="excercise in filteredExcercise",
        :key="excercise.id",
        @click="goExcersise(excercise)"
      )
        iframe.excercises__for__type-container-elements-item-video(
          sandbox="allow-scripts allow-same-origin",
          width="460",
          height="315",
          src="https://www.youtube.com/embed/Q5VSWvZibpQ",
          title="YouTube video player",
          frameborder="0", 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
          allowfullscreen
        )
        p Name : {{ excercise.name }}
        p Type: {{ excercise.classType }}
        p Description:{{ excercise.description }}
        p Duration: {{ excercise.duration }} min
</template>


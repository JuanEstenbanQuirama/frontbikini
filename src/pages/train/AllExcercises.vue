<script setup>
import { catalogueClassAdminApi } from "src/api/catalogue/CatalogueClassAdmin";
import { classesAdminApi } from "src/api/classes/ClassesAdmin";
import { onMounted, ref, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const { getClassTypes } = catalogueClassAdminApi();

const classTypes = ref([]);

onMounted(async () => {
  let responseTypes = await getClassTypes();
  classTypes.value = responseTypes;
});

const goExcersises = (classType) => {
  router.push({ path: "/train/" + `${classType.name}` });
};

// onMounted(() => {
//   watch(route, (to, from) => {
//     console.log(to.params);
//   });
// });
</script>

<template lang="pug">
section.all__type__excercice
  .all__type__excercice-container
    .all__type__excercice-container-title
      h3 Your exercise for today is:
    .all__type__excercice-container-elements
      .all__type__excercice-container-elements-item(
        v-for="classType in classTypes",
        :key="classType.id",
        @click="goExcersises(classType)"
      )
        .all__type__excercice-container-elements-item-image
          img(src="../../assets/images/program1.jpg")
        p.all__type__excercice-container-elements-item-type {{ classType.name }}
</template>

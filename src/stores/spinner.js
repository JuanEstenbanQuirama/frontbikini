import { ref } from "vue";
import { defineStore } from "pinia";

export const useSpinnerStore = defineStore("spinner", () => {
  const isLoaderShown = ref(false);
  return { isLoaderShown };
});

// export const useSpinnerStore = defineStore("spinner", {
//   state: () => {
//     return {
//       isLoaderShown: ref(false),
//     };
//   },
//   // persist: true,
// });

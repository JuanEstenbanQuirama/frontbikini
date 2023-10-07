import { defineStore } from 'pinia';

export const useTrainStore = defineStore('train', {
  state: () => {
    return {
      excercise:[]
    }
  },
  getters: {

  },
  actions: {
    async getExcercise() {
      return this.excercise;
    },
    setExcercise(excercise) {
      this.excercise = excercise;
    },
  },
  persist: true
});

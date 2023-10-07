import { defineStore } from 'pinia';

export const useQuizStore = defineStore('quiz', {
  state: () => {
    return {
      stepOne:[],
      stepTwo:[],
      stepThree:[],
      stepFour:[],
      stepFive: [],
    }
  },
  getters: {
  },
  actions: {
    async getStepOne() {
      return this.stepOne;
    },
    setStepOne(stepOne) {
      this.stepOne = stepOne;
    },
    async getStepTwo() {
      return this.stepTwo;
    },
    setStepTwo(stepTwo) {
      this.stepTwo = stepTwo;
    },
    async getStepThree() {
      return this.stepThree;
    },
    setStepThree(stepThree) {
      this.stepThree = stepThree;
    },
    async getStepFour() {
      return this.stepFour;
    },
    setStepFour(stepFour) {
      this.stepFour = stepFour;
    },
    async getStepFive() {
      return this.stepFive;
    },
    setStepFive(stepFive) {
      this.stepFive = stepFive;
    },
  },
  persist: true
});

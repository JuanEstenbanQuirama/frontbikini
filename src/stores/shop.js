import { defineStore } from 'pinia';

export const useShopStore = defineStore('shop', {
  state: () => {
    return {
      showCart: false,
      product:[],
      selectPackage:[]
    }
  },
  getters: {

  },
  actions: {
    setShowCart(value ) {
      this.showCart = value;
    },
    async getProduct() {
      return this.product;
    },
    setProduct(product) {
      this.product = product;
    },
    async getPackage() {
      return this.selectPackage;
    },
    setPackage(selectPackage) {
      this.selectPackage = selectPackage;
    },
  },
  persist: true
});

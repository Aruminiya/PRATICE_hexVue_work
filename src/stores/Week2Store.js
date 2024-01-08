import { defineStore } from "pinia";

export default defineStore("Week1Store", {
  //data, methods, computed
  //state, actions, getters
  state: () => ({
    products: [],
  }),
  getters: {
    showProducts: ({ products }) => {
      return products;
    },
  },
});

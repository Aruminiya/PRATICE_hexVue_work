import { defineStore } from "pinia";

const Week2Store = defineStore("Week2Store", {
  //data, methods, computed
  //state, actions, getters
  state: () => ({
    products: [{ a: "測試" }],
  }),

  getters: {
    showProducts: ({ products }) => {
      return products;
    },
  },
  actions: {
    changeProducts(apiData) {
      Week2Store.$patch((state) => {
        state.products = apiData;
      });
    },
  },
});

export default Week2Store;

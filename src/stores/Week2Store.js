import { defineStore } from "pinia";
import axios from "axios";
const Week2Store = defineStore("Week2Store", {
  //data, methods, computed
  //state, actions, getters
  state: () => ({
    products: {},
  }),

  getters: {
    showProducts: ({ products }) => {
      return products;
    },
  },
  actions: {
    changeProducts() {
      const host = import.meta.env.VITE_HEXAPI_HOST;
      const path = import.meta.env.VITE_HEXAPI_PATH;
      const token = document.cookie.replace(/^hexToken=/, "");
      // console.log("token", token);

      axios
        .get(`${host}/v2/api/${path}/admin/products/all`, {
          headers: { Authorization: token },
        })
        .then((response) => {
          console.log("取得商品資料成功");
          // console.log(response);
          // 直接更新 store 的狀態
          this.products = response.data;
          // console.log(Object.keys(this.products.products).length);
        })
        .catch((error) => {
          console.log("取得商品資料失敗");
          console.log(error);
        });
    },
  },
});

export default Week2Store;

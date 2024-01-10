import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";
import router from "@/router";
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
      console.log(host, path);
      const token = document.cookie.replace(/^hexToken=/, "");
      // console.log("token", token);

      axios
        .get(`${host}/v/api/${path}/admin/products/all`, {
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
          Swal.fire({
            title: "取得商品資料失敗",
            text: "請重新登入後在嘗試",
            icon: "error",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "確定",
          }).then((result) => {
            if (result.isConfirmed) {
              router.push("/Week2");
            }
          });
        });
    },
  },
});

export default Week2Store;

import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";
import router from "@/router";
const Week3Store = defineStore("Week3Store", {
  //data, methods, computed
  //state, actions, getters
  state: () => ({
    products: {},
    dataTemp: {},

    addTemp: {
      is_enabled: 0,
      imageUrl: "",
      category: "",
      title: "",
      origin_price: "",
      price: "",
    },
  }),

  getters: {
    showProducts: ({ products }) => {
      //這邊把我資料轉成陣列
      return Object.values(products.products);
    },
  },
  actions: {
    changeProducts() {
      const host = import.meta.env.VITE_HEXAPI_HOST;
      const path = import.meta.env.VITE_HEXAPI_PATH;
      // console.log(host, path);
      //取得 hexToken 的資料
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
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

          console.log(this.products);
          // console.log(this.showProducts);
          // console.log(Object.keys(this.products.products).length);
          return this.showProducts;
        })
        .then((showProducts) => {
          //多加入編輯模式來判斷開關
          showProducts.forEach((e) => {
            e.editmode = false;
          });
          // console.log(showProducts);
        })
        .catch((error) => {
          console.log("取得商品資料失敗");
          console.log(error);
          if (token.length === 0) {
            Swal.fire({
              title: "登入時間已到期",
              text: "請重新登入後在嘗試",
              icon: "error",
              showCancelButton: false,
              confirmButtonColor: "#3085d6",
              confirmButtonText: "確定",
            }).then((result) => {
              if (result.isConfirmed) {
                router.push("/Week3");
              }
            });
          } else {
            Swal.fire({
              title: "取得商品資料失敗",
              text: "請重新登入後在嘗試",
              icon: "error",
              showCancelButton: false,
              confirmButtonColor: "#3085d6",
              confirmButtonText: "確定",
            }).then((result) => {
              if (result.isConfirmed) {
                router.push("/Week3");
              }
            });
          }
        });
    },
    editProduct(id) {
      console.log(id);
      //抓到該編輯資料
      const dataIndex = this.showProducts.findIndex(
        (productId) => productId.id === id
      );
      console.log(dataIndex);
      //這邊放入編輯資料站存區 資料必須要淺拷貝或深拷貝 不然會有 改到同記憶體位置的問題
      this.dataTemp = { ...this.showProducts[dataIndex] };
      console.log(this.dataTemp);
    },
  },
});

export default Week3Store;

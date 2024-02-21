import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";
import router from "@/router";
const Week3Store = defineStore("Week3Store", {
  //data, methods, computed
  //state, actions, getters
  state: () => ({
    products: {},

    data: {
      title: "",
      category: "",
      origin_price: "",
      price: "",
      unit: "",
      description: "",
      content: "",
      is_enabled: 1,
      imageUrl: "",
      imagesUrl: ["", "", "", "", ""],
    },
  }),

  getters: {
    showProducts: ({ products }) => {
      //這邊把我資料轉成陣列
      return Object.values(products.products);
    },
  },
  actions: {
    getProducts(page = 1) {
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
        .get(`${host}/v2/api/${path}/admin/products?page=${page}`, {
          headers: { Authorization: token },
        })
        .then((response) => {
          console.log("取得商品資料成功");
          // console.log(response);

          // 直接更新 store 的狀態
          this.products = response.data;

          console.log(this.products);
          // console.log(this.showProducts);
          // console.log(Object.keys(this.productss.products).length);
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
      //這邊放入編輯資料站存區 資料必須要淺拷貝或深拷貝 不然會有 改到同記憶體位置的問題
      this.data = { ...this.products.products[id] };
      console.log(this.data);
    },
    submitEdit(id) {
      Swal.fire({
        title: "確定要送出編輯資料嗎?",

        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "送出編輯",
        cancelButtonText: "取消",
      }).then((result) => {
        if (result.isConfirmed) {
          let valid = true;

          Object.values(this.data).forEach((e) => {
            // 判斷資料有沒有填入
            if (
              this.data.imageUrl === "" ||
              this.data.category === "" ||
              this.data.unit === "" ||
              this.data.title === "" ||
              this.data.origin_price === "" ||
              this.data.price === ""
            ) {
              Swal.fire({
                icon: "error",
                title: "資料沒填完",
                text: "請正確填寫資料",
              });
              valid = false; // 如果任何條件不滿足，將 valid 設為 false
            }
          });

          if (valid) {
            // console.log(id);
            // console.log(this.products.products[id]);
            const host = import.meta.env.VITE_HEXAPI_HOST;
            const path = import.meta.env.VITE_HEXAPI_PATH;
            //取得 hexToken 的資料
            const token = document.cookie.replace(
              /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
              "$1"
            );
            // console.log({ data: { ...this.data } });
            axios
              .put(
                `${host}/v2/api/${path}/admin/product/${id}`,
                { data: { ...this.data } },
                {
                  headers: { Authorization: token },
                }
              )
              .then((res) => {
                console.log(res);
                Swal.fire({
                  icon: "success",
                  title: "編輯產品成功",
                });
                this.products.products[id] = this.data;
                this.data = {
                  title: "",
                  category: "",
                  origin_price: "",
                  price: "",
                  unit: "",
                  description: "",
                  content: "",
                  is_enabled: 1,
                  imageUrl: "",
                  imagesUrl: ["", "", "", "", ""],
                };
              })
              .catch((err) => {
                console.error(err);
                Swal.fire({
                  icon: "error",
                  title: "編輯產品失敗",
                });
              });
          }
        }
      });
    },
    addProduct() {
      let valid = true;

      Object.values(this.data).forEach((e) => {
        // 判斷資料有沒有填入
        if (
          this.data.imageUrl === "" ||
          this.data.category === "" ||
          this.data.unit === "" ||
          this.data.title === "" ||
          this.data.origin_price === "" ||
          this.data.price === ""
        ) {
          Swal.fire({
            icon: "error",
            title: "資料沒填完",
            text: "請正確填寫資料",
          });
          valid = false; // 如果任何條件不滿足，將 valid 設為 false
        }
      });

      if (valid) {
        console.log(this.data);
        const host = import.meta.env.VITE_HEXAPI_HOST;
        const path = import.meta.env.VITE_HEXAPI_PATH;
        //取得 hexToken 的資料
        const token = document.cookie.replace(
          /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
          "$1"
        );
        //推入產品到後端
        axios
          .post(
            `${host}/v2/api/${path}/admin/product`,
            {
              data: this.data,
            },
            {
              headers: { Authorization: token },
            }
          )
          .then((res) => {
            console.log(res);
            Swal.fire({
              icon: "success",
              title: "產品建立成功",
              text: "請回到產品管理頁面查看",
            });
            //初始化 data
            this.data = {
              title: "",
              category: "",
              origin_price: "",
              price: "",
              unit: "個",
              description: "",
              content: "",
              is_enabled: 1,
              imageUrl: "",
              imagesUrl: ["", "", "", "", ""],
            };
          })
          .catch((err) => {
            console.error(err);
            Swal.fire({
              icon: "error",
              title: "產品建立失敗",
              text: "請重新填寫嘗試",
            });
            this.data = {
              title: "",
              category: "",
              origin_price: "",
              price: "",
              unit: "個",
              description: "",
              content: "",
              is_enabled: 1,
              imageUrl: "",
              imagesUrl: ["", "", "", "", ""],
            };
          });
      }
    },
    deleteProduct(id) {
      //抓到該刪除資料位置
      Swal.fire({
        title: "確定要刪除資料嗎?",
        text: "刪除後資料無法還原",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "確定刪除",
        cancelButtonText: "取消",
      }).then((result) => {
        if (result.isConfirmed) {
          // console.log(id);
          // console.log(this.products.product[id]);
          const host = import.meta.env.VITE_HEXAPI_HOST;
          const path = import.meta.env.VITE_HEXAPI_PATH;
          //取得 hexToken 的資料
          const token = document.cookie.replace(
            /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
            "$1"
          );
          // console.log(`${host}/v2/api/${path}/admin/product/${id}`);
          axios
            .delete(`${host}/v2/api/${path}/admin/product/${id}`, {
              headers: { Authorization: token },
            })
            .then((res) => {
              console.log(res);
              Swal.fire({
                icon: "success",
                title: "刪除產品成功",
              });
              delete this.products.products[id];
            })
            .catch((err) => {
              console.error(err);
              Swal.fire({
                icon: "error",
                title: "刪除產品失敗",
              });
            });
        }
      });
    },
  },
});

export default Week3Store;

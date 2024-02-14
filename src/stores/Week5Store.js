import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";
import router from "@/router";
const Week5Store = defineStore("Week5Store", {
  //data, methods, computed
  //state, actions, getters
  state: () => ({
    loadingStatus: {
      loadingItem: "",
    },
    isLoading: false,
    products: [],
    product: {},
    form: {
      user: {
        name: "",
        email: "",
        tel: "",
        address: "",
      },
      message: "",
    },
    cart: {},
  }),

  getters: {
    showProducts: ({ products }) => {
      //這邊把我資料轉成陣列
      return Object.values(products.products);
    },
  },
  actions: {
    getProducts() {
      const host = import.meta.env.VITE_HEXAPI_HOST;
      const path = import.meta.env.VITE_HEXAPI_PATH;

      const url = `${host}/api/${path}/products`;
      axios
        .get(url)
        .then((response) => {
          this.products = response.data.products;
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "產品取得錯誤",
            text: err.response.data.message,
          });
        });
    },
    getProduct(id) {
      this.isLoading = true;
      const host = import.meta.env.VITE_HEXAPI_HOST;
      const path = import.meta.env.VITE_HEXAPI_PATH;

      const url = `${host}/api/${path}/product/${id}`;
      this.loadingStatus.loadingItem = id;
      axios
        .get(url)
        .then((response) => {
          this.loadingStatus.loadingItem = "";
          this.product = response.data.product;
          this.isLoading = false;
          //   this.isProductModal = true;
          //   this.$refs.userProductModal.openModal();
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "產品取得錯誤",
            text: err.response.data.message,
          });
        });
    },
    addToCart(id, qty = 1) {
      // this.isLoading = true;
      const host = import.meta.env.VITE_HEXAPI_HOST;
      const path = import.meta.env.VITE_HEXAPI_PATH;

      const url = `${host}/api/${path}/cart`;
      this.loadingStatus.loadingItem = id;
      const cart = {
        product_id: id,
        qty,
      };
      //   this.isProductModal = false;
      //   this.$refs.userProductModal.hideModal();
      axios
        .post(url, { data: cart })
        .then((response) => {
          Swal.fire({
            title: "新增購物車成功",
            text: response.data.message,
            icon: "success",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "確定",
          }).then((result) => {
            this.loadingStatus.loadingItem = "";
            this.getCart();
            this.isLoading = false;
          });
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "新增購物車失敗",
            text: err.response.data.message,
          });
        });
    },
    updateCart(data) {
      // this.isLoading = true;
      const host = import.meta.env.VITE_HEXAPI_HOST;
      const path = import.meta.env.VITE_HEXAPI_PATH;

      this.loadingStatus.loadingItem = data.id;
      const url = `${host}/api/${path}/cart/${data.id}`;
      const cart = {
        product_id: data.product_id,
        qty: data.qty,
      };
      axios
        .put(url, { data: cart })
        .then((response) => {
          Swal.fire({
            title: "編輯購物車成功",
            text: response.data.message,
            icon: "success",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "確定",
          }).then((result) => {
            this.loadingStatus.loadingItem = "";
            this.getCart();
            this.isLoading = false;
          });
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "編輯購物車失敗",
            text: err.response.data.message,
          }).then((result) => {
            this.loadingStatus.loadingItem = "";
          });
        });
    },
    deleteAllCarts() {
      // this.isLoading = true;
      const host = import.meta.env.VITE_HEXAPI_HOST;
      const path = import.meta.env.VITE_HEXAPI_PATH;

      const url = `${host}/api/${path}/carts`;
      axios
        .delete(url)
        .then((response) => {
          Swal.fire({
            title: "刪除購物車成功",
            text: response.data.message,
            icon: "success",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "確定",
          }).then((result) => {
            this.getCart();
            this.isLoading = false;
          });
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "刪除購物車失敗",
            text: err.response.data.message,
          });
        });
    },
    getCart() {
      // this.isLoading = true;
      const host = import.meta.env.VITE_HEXAPI_HOST;
      const path = import.meta.env.VITE_HEXAPI_PATH;

      const url = `${host}/api/${path}/cart`;
      axios
        .get(url)
        .then((response) => {
          this.cart = response.data.data;
          this.isLoading = false;
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "取得購物車失敗",
            text: err.response.data.message,
          });
        });
    },
    removeCartItem(id) {
      // this.isLoading = true;
      const host = import.meta.env.VITE_HEXAPI_HOST;
      const path = import.meta.env.VITE_HEXAPI_PATH;

      const url = `${host}/api/${path}/cart/${id}`;
      this.loadingStatus.loadingItem = id;
      axios
        .delete(url)
        .then((response) => {
          Swal.fire({
            title: "刪除購物車成功",
            text: response.data.message,
            icon: "success",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "確定",
          }).then((result) => {
            this.loadingStatus.loadingItem = "";
            this.getCart();
            this.isLoading = false;
          });
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "刪除購物車失敗",
            text: err.response.data.message,
          });
        });
    },
    createOrder() {
      // this.isLoading = true;
      const host = import.meta.env.VITE_HEXAPI_HOST;
      const path = import.meta.env.VITE_HEXAPI_PATH;

      const url = `${host}/api/${path}/order`;
      const order = this.form;
      axios
        .post(url, { data: order })
        .then((response) => {
          Swal.fire({
            title: "結帳成功",
            text: response.data.message,
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "確定",
          }).then((result) => {
            this.getCart();
            this.isLoading = false;
          });
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "結帳失敗",
            text: err.response.data.message,
          });
        });
    },
  },
});

export default Week5Store;

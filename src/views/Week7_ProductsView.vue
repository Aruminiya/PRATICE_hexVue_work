<script>
import { mapActions } from "pinia";
import { Week7_ToastMessages } from "../stores/Week7_useToastMessageStore.js";

export default {
  data() {
    return {
      isLoading: false,
      product: {},
      id: "",
    };
  },
  methods: {
    ...mapActions(Week7_ToastMessages, ["pushMessage"]),
    getProduct() {
      const api = `${import.meta.env.VITE_API}/api/${
        import.meta.env.VITE_PATH
      }/product/${this.id}`;
      this.isLoading = true;
      this.$http.get(api).then((response) => {
        this.product = response.data.product;
        this.isLoading = false;
      });
    },
    addToCart(id, qty = 1) {
      const url = `${import.meta.env.VITE_API}/api/${
        import.meta.env.VITE_PATH
      }/cart`;
      const cart = {
        product_id: id,
        qty,
      };
      this.isLoading = true;
      this.$http
        .post(url, { data: cart })
        .then((response) => {
          this.isLoading = false;
          this.pushMessage({
            style: "success",
            title: "成功加入購物車",
            content: response.data.message,
          });
          this.$router.push("/user/cart");
        })
        .catch((error) => {
          this.isLoading = false;
          this.pushMessage({
            style: "danger",
            title: "加入購物車失敗",
            content: error.response.data.message,
          });
        });
    },
  },
  created() {
    this.id = this.$route.params.productId;
    this.getProduct();
  },
};
</script>

<template>
  <Loading v-model:isLoading="isLoading" />
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <RouterLink to="/user/cart">購物車</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ product.title }}
        </li>
      </ol>
    </nav>
    <div class="row justify-content-center">
      <article class="col-8">
        <h2>{{ product.title }}</h2>
        <div>{{ product.content }}</div>
        <div>{{ product.description }}</div>
        <img
          :src="product.imageUrl"
          class="img-fluid mb-3"
          :alt="product.title"
        />
      </article>
      <div class="col-4">
        <div class="h5" v-if="!product.price">
          {{ product.origin_price }} 元
        </div>
        <del class="h6" v-if="product.price"
          >原價 {{ product.origin_price }} 元</del
        >
        <div class="h5" v-if="product.price">
          現在只要 {{ product.price }} 元
        </div>
        <hr />
        <button
          type="button"
          class="btn btn-outline-danger"
          @click="addToCart(product.id)"
        >
          加到購物車
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "pinia";

export default {
  data() {
    return {
      isLoading: false,
      user: {},
    };
  },
  methods: {
    signIn() {
      const host = import.meta.env.VITE_HEXAPI_HOST;
      const path = import.meta.env.VITE_HEXAPI_PATH;

      const url = `${host}/v2/admin/signin`;
      this.isLoading = true;
      this.$http
        .post(url, this.user)
        .then((response) => {
          const { token, expired } = response.data;
          document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
          this.isLoading = false;
          this.$router.push("/week7/products");
        })
        .catch((error) => {
          this.isLoading = false;
          this.pushMessage({
            style: "danger",
            title: "登入失敗",
            content: error.response.data.message,
          });
        });
    },
  },
};
</script>

<template>
  <h1 class="text-center">Week7 作業</h1>
  <hr />
  <LoadingIcon v-model:isLoading="isLoading" />
  <div class="container mt-5">
    <form class="row justify-content-center" @submit.prevent="signIn">
      <div class="col-md-6">
        <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
        <div class="mb-2">
          <label for="inputEmail" class="sr-only">Email address</label>
          <input
            type="email"
            id="inputEmail"
            class="form-control"
            placeholder="Email address"
            v-model="user.username"
            required
            autofocus
          />
        </div>
        <div class="mb-2">
          <label for="inputPassword" class="sr-only">Password</label>
          <input
            type="password"
            id="inputPassword"
            class="form-control"
            v-model="user.password"
            placeholder="Password"
            required
          />
        </div>
        <div class="text-end mt-4">
          <button class="btn btn-lg btn-primary btn-block" type="submit">
            登入
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

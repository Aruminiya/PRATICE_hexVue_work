<script>
const host = import.meta.env.VITE_HEXAPI_HOST;
const path = import.meta.env.VITE_HEXAPI_PATH;

export default {
  data() {
    return {
      email: "",
      password: "",
      loginState: {
        isSuccess: true,
      },
    };
  },
  methods: {
    logIn() {
      this.axios
        .post(`${host}/v2/admin/signin`, {
          username: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log("登入成功");
          const { token, expired } = response.data;
          //   console.log(token, expired);
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
          //   console.log(document.cookie);
          this.email = "";
          this.password = "";
        })
        .catch((error) => {
          console.log("登入失敗");
          console.log(error);
        });
    },
  },
};
</script>

<template>
  <h1 class="text-center">Week2 作業</h1>
  <hr />
  <main>
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col-6">
          <div class="alert alert-primary" role="alert">
            A simple primary alert—check it out!
          </div>
        </div>

        <div class="col-12 d-flex justify-content-center">
          <div
            class="loginArea d-flex flex-column justify-content-center align-items-sm-center"
          >
            <h1>請先登入</h1>
            <input
              type="email"
              class="form-control"
              placeholder="請輸入 Email"
              v-model="email"
            />
            <input
              type="password"
              class="form-control"
              placeholder="請輸入密碼"
              v-model="password"
            />
            <button
              type="button"
              class="btn btn-primary w-100"
              @click="logIn()"
            >
              登入
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<style lang="scss" scoped>
.loginArea {
  max-width: 300px;
}
</style>

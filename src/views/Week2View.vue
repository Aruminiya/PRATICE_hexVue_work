<script>
const host = import.meta.env.VITE_HEXAPI_HOST;
const path = import.meta.env.VITE_HEXAPI_PATH;

export default {
  data() {
    return {
      email: "",
      password: "",
      loginFail: false,
    };
  },
  methods: {
    logIn() {
      this.loginFail = false;
      this.axios
        .post(`${host}/v2/admin/signin`, {
          username: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log("登入成功");
          const { token, expired } = response.data;
          //   console.log(token, expired);
          document.cookie = `hexToken=${token}; expires=${new Date(
            expired
          )}; SameSite=None; Secure`;

          // console.log(document.cookie);

          this.email = "";
          this.password = "";

          this.$swal({
            title: "登入成功",
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "確定",
          }).then((result) => {
            if (result.isConfirmed) {
              this.$router.push("/Week2_showPreductView");
            }
          });
        })
        .catch((error) => {
          console.log("登入失敗");
          console.log(error);
          this.loginFail = true;
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
          <div v-if="loginFail" class="alert alert-danger" role="alert">
            登入失敗
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

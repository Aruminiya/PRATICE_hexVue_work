<script>
import * as bootstrap from "bootstrap/dist/js/bootstrap.min.js";
import Week4_Modal from "../components/Week4_Modal.vue";

const host = import.meta.env.VITE_HEXAPI_HOST;
const path = import.meta.env.VITE_HEXAPI_PATH;

export default {
  components: { Week4_Modal },
  data() {
    return {
      productModal: null,
      products: [],
      isNew: false,
      tempProduct: {
        imagesUrl: [],
      },
    };
  },
  mounted() {
    // 取出 Token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    this.axios.defaults.headers.common.Authorization = token;

    this.checkAdmin();
  },
  methods: {
    productModalShow() {
      this.productModal.show();
    },
    productModalHide() {
      this.productModal.hide();
    },
    // 接收 modal 元件 的 productModalCreate
    getProductModalCreate(productModal) {
      this.productModal = productModal;
      console.log(productModal);
    },

    checkAdmin() {
      const url = `${host}/v2/api/user/check`;
      this.axios
        .post(url)
        .then(() => {
          this.getData();
        })
        .catch((err) => {
          console.error(err);
          this.$swal({
            title: "登入驗證失敗",
            text: err.response.data.message,
            icon: "error",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "確定",
          }).then((result) => {
            if (result.isConfirmed) {
              // 頁面跳轉
              this.$router.push("/Week4");
            }
          });
        });
    },
    getData() {
      const url = `${host}/api/${path}/admin/products/all`;
      this.axios
        .get(url)
        .then((response) => {
          this.products = response.data.products;
        })
        .catch((err) => {
          // alert(err.response.data.message);
          this.$swal({
            title: "資料取得失敗",
            text: err.response.data.message,
            icon: "error",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "確定",
          }).then((result) => {
            if (result.isConfirmed) {
              // 頁面跳轉
              this.$router.push("/Week4");
            }
          });
        });
    },
    updateProduct() {
      let url = `${host}/api/${path}/admin/product`;
      let http = "post";

      if (!this.isNew) {
        url = `${host}/api/${path}/admin/product/${this.tempProduct.id}`;
        http = "put";
      }

      this.axios[http](url, { data: this.tempProduct })
        .then((response) => {
          this.$swal({
            title: response.data.message,
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "確定",
          }).then((result) => {
            if (result.isConfirmed) {
              this.productModal.hide();
              this.getData();
            }
          });

          // 隱藏 BS5 Modal
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    openModal(isNew, item) {
      if (isNew === "new") {
        this.tempProduct = {
          imagesUrl: [],
        };
        this.isNew = true;
        this.productModal.show();
      } else if (isNew === "edit") {
        this.tempProduct = { ...item };
        this.isNew = false;
        this.productModal.show();
      }
    },
    delProduct(id) {
      this.$swal({
        title: "確定要刪除此筆商品嗎?",
        text: "刪除後將無法恢復操作",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "是的 我要刪除",
        cancelButtonText: "取消",
      }).then((result) => {
        if (result.isConfirmed) {
          const url = `${host}/api/${path}/admin/product/${id}`;
          this.axios
            .delete(url)
            .then((response) => {
              this.$swal({
                title: response.data.message,
                icon: "success",
                showCancelButton: false,
                confirmButtonColor: "#3085d6",
                confirmButtonText: "確定",
              }).then((result) => {
                if (result.isConfirmed) {
                  this.getData();
                }
              });
            })
            .catch((err) => {
              this.$swal({
                title: err.response.data.message,
                icon: "error",
                showCancelButton: false,
                confirmButtonColor: "#3085d6",
                confirmButtonText: "確定",
              }).then((result) => {
                if (result.isConfirmed) {
                  this.getData();
                }
              });
            });
        }
      });
    },
    createImages() {
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push("");
    },
  },
};
</script>

<template>
  <h1 class="text-center">Week4 元件化</h1>
  <hr />
  <main>
    <div class="container">
      <div class="text-end mt-4">
        <button
          type="button"
          class="btn btn-primary"
          ref="productModal"
          @click="openModal('new')"
        >
          建立新的產品
        </button>
      </div>
      <table class="table mt-4">
        <thead>
          <tr>
            <th width="120">分類</th>
            <th>產品名稱</th>
            <th width="120">原價</th>
            <th width="120">售價</th>
            <th width="100">是否啟用</th>
            <th width="120">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <td>{{ item.category }}</td>
            <td>{{ item.title }}</td>
            <td class="text-end">
              {{ item.origin_price }}
            </td>
            <td class="text-end">
              {{ item.price }}
            </td>
            <td>
              <span v-if="item.is_enabled" class="text-success">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td>
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  ref="productModal"
                  data-bs-toggle="modal"
                  data-bs-target="#productModalLabel"
                  @click="openModal('edit', item)"
                >
                  編輯
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="delProduct(item.id)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Button trigger modal -->

    <!-- Modal -->

    <hr />

    <Week4_Modal
      :tempProduct="tempProduct"
      :isNew="isNew"
      @productModalCreate="getProductModalCreate($event)"
      @getDataEmit="getData()"
    />
  </main>
</template>
<style lang="scss">
img {
  object-fit: contain;
  max-width: 100%;
}

.primary-image {
  height: 300px;
}

.images {
  height: 150px;
}
.editTextShow {
  opacity: 0.5;
}
.modal-header {
  background-color: rgb(112, 112, 112);
  color: white;
}
</style>

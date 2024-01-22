<script>
const host = import.meta.env.VITE_HEXAPI_HOST;
const path = import.meta.env.VITE_HEXAPI_PATH;

let productModal = null;
let delProductModal = null;

export default {
  data() {
    return {
      // apiUrl: "https://vue3-course-api.hexschool.io/v2",
      // apiPath: "hexschoolvue",
      products: [],
      isNew: false,
      tempProduct: {
        imagesUrl: [],
      },
    };
  },
  mounted() {
    // productModal = new bootstrap.Modal(this.$refs.productModal, {
    //   keyboard: false,
    // });

    // delProductModal = new bootstrap.Modal(this.$refs.delProductModal, {
    //   keyboard: false,
    // });

    // 取出 Token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    this.axios.defaults.headers.common.Authorization = token;

    this.checkAdmin();
  },
  methods: {
    hideProductModal() {
      // 透過 Vue 的方式來隱藏 Modal
      this.$refs.productModalRef.classList.remove("show");
      this.$el.ownerDocument.body.classList.remove("modal-open");
      // Modal 隱藏時觸發，清空 body 的樣式
      this.$el.ownerDocument.body.style.paddingRight = "";
      this.$el.ownerDocument.body.style.overflow = "";
      // 移除 modal-backdrop
      const modalBackdrop =
        this.$el.ownerDocument.querySelector(".modal-backdrop");
      if (modalBackdrop) {
        modalBackdrop.parentNode.removeChild(modalBackdrop);
      }
    },
    // showProductModal() {
    //   // 透過 $refs.productModalRef.show() 顯示 Modal
    //   this.$refs.productModalRef.show();
    // },
    // hideProductModal() {
    //   // 透過 $refs.productModalRef.hide() 隱藏 Modal
    //   this.$refs.productModalRef.hide();
    // },
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
          // alert(err.response.data.message);
          // 頁面跳轉
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
          alert(err.response.data.message);
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
          alert(response.data.message);
          // productModal.hide();
          this.hideProductModal();
          this.getData();
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
        // this.$refs.productModal.show();
      } else if (isNew === "edit") {
        this.tempProduct = { ...item };
        this.isNew = false;
        // this.$refs.productModal.show();
      } else if (isNew === "delete") {
        this.tempProduct = { ...item };
        // this.$refs.delProductModal.show();
      }
    },
    delProduct() {
      const url = `${host}/api/${path}/admin/product/${this.tempProduct.id}`;

      this.axios
        .delete(url)
        .then((response) => {
          alert(response.data.message);
          delProductModal.hide();
          this.getData();
        })
        .catch((err) => {
          alert(err.response.data.message);
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
          data-bs-toggle="modal"
          data-bs-target="#productModalLabel"
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
                  class="btn btn-outline-primary"
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
                  @click="openModal('delete', item)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <hr />
    <!-- Button trigger modal -->

    <!-- Modal -->
    <div
      class="modal fade"
      id="productModalLabel"
      tabindex="-1"
      aria-labelledby="productModalLabel"
      aria-hidden="true"
      ref="productModalRef"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="productModalLabel">
              <span v-if="isNew">新增產品</span> <span v-else>編輯產品</span>
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="mb-3">
                  <label for="imageUrl" class="form-label">主要圖片</label>
                  <input
                    id="imageUrl"
                    v-model="tempProduct.imageUrl"
                    type="text"
                    class="form-control mb-2"
                    placeholder="請輸入圖片連結"
                  />
                  <img class="img-fluid" :src="tempProduct.imageUrl" />
                </div>
                <h3 class="mb-3">多圖新增</h3>
                <div v-if="Array.isArray(tempProduct.imagesUrl)">
                  <div
                    class="mb-1"
                    v-for="(image, key) in tempProduct.imagesUrl"
                    :key="key"
                  >
                    <div class="mb-3">
                      <label :for="`imagesUrl${key}`" class="form-label"
                        >圖片網址</label
                      >
                      <input
                        :id="`imagesUrl${key}`"
                        v-model="tempProduct.imagesUrl[key]"
                        type="text"
                        class="form-control"
                        placeholder="請輸入圖片連結"
                      />
                    </div>
                    <img class="img-fluid" :src="image" />
                  </div>
                  <div
                    v-if="
                      !tempProduct.imagesUrl.length ||
                      tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]
                    "
                  >
                    <button
                      class="btn btn-outline-primary btn-sm d-block w-100"
                      @click="tempProduct.imagesUrl.push('')"
                    >
                      新增圖片
                    </button>
                  </div>
                  <div v-else>
                    <button
                      class="btn btn-outline-danger btn-sm d-block w-100"
                      @click="tempProduct.imagesUrl.pop()"
                    >
                      刪除圖片
                    </button>
                  </div>
                </div>
                <div v-else>
                  <button
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="createImages"
                  >
                    新增圖片
                  </button>
                </div>
              </div>
              <div class="col-sm-8">
                <div class="mb-3">
                  <label for="title" class="form-label">標題</label>
                  <input
                    id="title"
                    v-model="tempProduct.title"
                    type="text"
                    class="form-control"
                    placeholder="請輸入標題"
                  />
                </div>

                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="category" class="form-label">分類</label>
                    <input
                      id="category"
                      v-model="tempProduct.category"
                      type="text"
                      class="form-control"
                      placeholder="請輸入分類"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="unit" class="form-label">單位</label>
                    <input
                      id="unit"
                      v-model="tempProduct.unit"
                      type="text"
                      class="form-control"
                      placeholder="請輸入單位"
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="origin_price" class="form-label">原價</label>
                    <input
                      id="origin_price"
                      v-model.number="tempProduct.origin_price"
                      type="number"
                      min="0"
                      class="form-control"
                      placeholder="請輸入原價"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">售價</label>
                    <input
                      id="price"
                      v-model.number="tempProduct.price"
                      type="number"
                      min="0"
                      class="form-control"
                      placeholder="請輸入售價"
                    />
                  </div>
                </div>
                <hr />

                <div class="mb-3">
                  <label for="description" class="form-label">產品描述</label>
                  <textarea
                    id="description"
                    v-model="tempProduct.description"
                    type="text"
                    class="form-control"
                    placeholder="請輸入產品描述"
                  >
                  </textarea>
                </div>
                <div class="mb-3">
                  <label for="content" class="form-label">說明內容</label>
                  <textarea
                    id="content"
                    v-model="tempProduct.content"
                    type="text"
                    class="form-control"
                    placeholder="請輸入說明內容"
                  >
                  </textarea>
                </div>
                <div class="mb-3">
                  <div class="form-check">
                    <input
                      id="is_enabled"
                      v-model="tempProduct.is_enabled"
                      class="form-check-input"
                      type="checkbox"
                      :true-value="1"
                      :false-value="0"
                    />
                    <label class="form-check-label" for="is_enabled"
                      >是否啟用</label
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              <span v-if="isNew">取消新增</span> <span v-else>取消編輯</span>
            </button>
            <button v-if="isNew" type="button" class="btn btn-primary">
              確定新增產品</button
            ><button
              v-else
              type="button"
              class="btn btn-primary"
              @click="updateProduct()"
            >
              確定編輯產品
            </button>
          </div>
        </div>
      </div>
    </div>
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

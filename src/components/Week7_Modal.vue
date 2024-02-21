<script>
import * as bootstrap from "bootstrap/dist/js/bootstrap.min.js";
const host = import.meta.env.VITE_HEXAPI_HOST;
const path = import.meta.env.VITE_HEXAPI_PATH;

export default {
  props: { tempProduct: { type: Object }, isNew: { type: Boolean } },
  emits: ["getDataEmit", "productModalCreate"],
  data() {
    return {
      products: {},
      productModal: null,
    };
  },
  methods: {
    modalShow() {
      this.productModal.show();
    },
    modalHide() {
      this.productModal.hide();
    },
  },
  watch: {
    tempProduct(newVal, oldVal) {
      this.products = newVal;
    },
  },
  mounted() {
    // 在內層元件建立 Modal BS5 實體
    this.productModal = new bootstrap.Modal(this.$refs.productModal, {
      keyboard: true, // 按下ESC是否可以關閉
    });
  },
};
</script>

<template>
  <div
    class="modal fade"
    id="productModal"
    ref="productModal"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="productModalLabel">
            <span v-if="isNew">新增產品</span> <span v-else>編輯產品</span>
          </h5>
          <button
            type="button"
            class="btn-close btn btn-danger"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="this.productModal.hide()"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="imageUrl" class="form-label">主要圖片</label>
                <input
                  id="imageUrl"
                  v-model="products.imageUrl"
                  type="text"
                  class="form-control mb-2"
                  placeholder="請輸入圖片連結"
                />
                <img class="img-fluid" :src="products.imageUrl" />
              </div>
              <h3 class="mb-3">多圖新增</h3>
              <!--JS 判別是否為陣列Array-->
              <div v-if="Array.isArray(products.imagesUrl)">
                <div v-for="(image, key) in products.imagesUrl" :key="key">
                  <div class="mb-3">
                    <label :for="`imagesUrl${key}`" class="form-label"
                      >圖片網址</label
                    >
                    <input
                      :id="`imagesUrl${key}`"
                      v-model="products.imagesUrl[key]"
                      type="text"
                      class="form-control"
                      placeholder="請輸入圖片連結"
                    />
                  </div>
                  <img class="img-fluid" :src="image" />
                </div>
                <div
                  v-if="
                    !products.imagesUrl.length ||
                    products.imagesUrl[products.imagesUrl.length - 1]
                  "
                >
                  <button
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="products.imagesUrl.push('')"
                  >
                    新增圖片
                  </button>
                </div>
                <div v-else>
                  <button
                    class="btn btn-outline-danger btn-sm d-block w-100"
                    @click="products.imagesUrl.pop()"
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
                  v-model="products.title"
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
                    v-model="products.category"
                    type="text"
                    class="form-control"
                    placeholder="請輸入分類"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="unit" class="form-label">單位</label>
                  <input
                    id="unit"
                    v-model="products.unit"
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
                    v-model.number="products.origin_price"
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
                    v-model.number="products.price"
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
                  v-model="products.description"
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
                  v-model="products.content"
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
                    v-model="products.is_enabled"
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
            @click="this.productModal.hide()"
          >
            <span v-if="isNew">取消新增</span> <span v-else>取消編輯</span>
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="updateProduct()"
          >
            <span v-if="isNew">確定新增產品</span>
            <span v-else>確定編輯產品</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Week3Store from "../stores/Week3Store.js";
import { mapState, mapActions } from "pinia";

export default {
  data() {
    return {
      temp: {},
    };
  },
  computed: {
    ...mapState(Week3Store, ["showProducts", "products", "editTemp"]),
  },
  methods: { ...mapActions(Week3Store, ["changeProducts", "editProduct"]) },
  mounted() {
    this.changeProducts();
    // console.log(document.cookie);
  },
};
</script>

<template>
  <h1 class="text-center">
    Week3 串接 API 完成一頁式的產品新增、刪除、修改的頁面
  </h1>
  <hr />
  <main>
    <div class="container">
      <div class="text-end mt-4">
        <button class="btn btn-primary">建立新的產品</button>
      </div>
      <h2 v-if="Object.keys(products).length === 0">Loading...</h2>
      <table v-else class="table mt-4">
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
          <p>{{ editTemp }}</p>
          <tr v-for="item in showProducts" :key="item.id">
            <td>
              <span>{{ item.category }}</span>
            </td>
            <td>
              <span>{{ item.title }}</span
              ><span></span>
            </td>
            <td class="text-end">
              <span>{{ item.origin_price }}</span>
            </td>
            <td class="text-end">
              <span>{{ item.price }}</span>
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
                  @click="editProduct(item.id)"
                >
                  編輯
                </button>
                <button type="button" class="btn btn-outline-danger btn-sm">
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
        <div class="col-md-6">
          <h2>編輯產品細節</h2>
          <template v-if="Object.keys(editTemp).length">
            <div class="card mb-3">
              <img
                :src="editTemp.imageUrl"
                class="card-img-top primary-image"
                alt="主圖"
              />
              <div class="card-body">
                <p class="card-text">
                  商品分類：<input type="text" :value="editTemp.category" />
                </p>
                <p class="card-text">
                  商品名稱：<input type="text" :value="editTemp.title" />
                </p>
                <p class="card-text">
                  商品原價：<input type="text" :value="editTemp.origin_price" />
                </p>
                <p class="card-text">
                  商品價格：<input type="text" :value="editTemp.price" />
                </p>
                <p class="card-text">
                  是否啟用：{{ editTemp.is_enabled }}

                  <input type="checkbox" :value="editTemp.is_enabled" />
                </p>
              </div>
            </div>
            <template v-for="(item, index) in temp.imagesUrl" :key="index">
              <img :src="item" alt="" class="images m-2" />
            </template>
            <br />
          </template>
          <p v-else class="text-secondary">請選擇一個商品查看</p>
        </div>
      </table>
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
</style>

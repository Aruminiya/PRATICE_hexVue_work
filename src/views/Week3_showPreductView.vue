<script>
import Week3Store from "../stores/Week3Store.js";
import { mapState, mapActions } from "pinia";

export default {
  data() {
    return {
      temp: {},
    };
  },
  computed: { ...mapState(Week3Store, ["showProducts", "products"]) },
  methods: { ...mapActions(Week3Store, ["changeProducts"]) },
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
          <tr v-for="item in showProducts" :key="item.id">
            <td>{{ item.category }}</td>
            <td>{{ item.title }}</td>
            <td class="text-end">{{ item.origin_price }}</td>
            <td class="text-end">{{ item.price }}</td>
            <td>
              <span v-if="item.is_enabled" class="text-success">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td>
              <div class="btn-group">
                <button type="button" class="btn btn-outline-primary btn-sm">
                  編輯
                </button>
                <button type="button" class="btn btn-outline-danger btn-sm">
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
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

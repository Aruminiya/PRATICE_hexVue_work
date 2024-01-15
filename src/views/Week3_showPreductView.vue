<script>
import Week3Store from "../stores/Week3Store.js";
import { mapState, mapActions } from "pinia";

import Week3_temp from "../components/Week3_temp.vue";

export default {
  components: { Week3_temp },
  data() {
    return {
      temp: {},
    };
  },
  computed: {
    ...mapState(Week3Store, ["showProducts", "products", "dataTemp"]),
  },
  methods: {
    ...mapActions(Week3Store, [
      "changeProducts",
      "editProduct",
      "deleteProduct",
    ]),
  },
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
      <div class="row">
        <div class="text-end mt-4">
          <RouterLink
            to="/Week3_addPreductView"
            class="nav-item nav-link active"
            href="#"
            ><button class="btn btn-primary">建立新的產品</button></RouterLink
          >
        </div>
      </div>
      <div class="row">
        <div class="col-8">
          <h2 v-if="Object.keys(products).length === 0">Loading...</h2>
          <table v-else class="table mt-4">
            <thead>
              <tr>
                <th width="120">產品圖</th>
                <th width="120">分類</th>
                <th width="120">產品名稱</th>
                <th width="120">產品敘述</th>
                <th width="120">原價</th>
                <th width="120">售價</th>
                <th width="100">是否啟用</th>
                <th width="120">編輯</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in showProducts" :key="item.id">
                <td><img :src="item.imageUrl" alt="產品圖" /></td>
                <td>
                  {{ item.category }}
                </td>

                <td>{{ item.title }}</td>
                <td>{{ item.description }}</td>
                <td>
                  {{ item.origin_price }}
                </td>
                <td>
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
                      @click="editProduct(item.id)"
                    >
                      編輯
                    </button>
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm"
                      @click="deleteProduct(item.id)"
                    >
                      刪除
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-4">
          <h2>編輯產品細節</h2>
          <template v-if="Object.keys(dataTemp).length"
            ><Week3_temp
          /></template>

          <div v-else class="h-100 d-flex justify-content-center">
            <h4 class="editTextShow mt-5">編輯產品資料顯示</h4>
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
</style>

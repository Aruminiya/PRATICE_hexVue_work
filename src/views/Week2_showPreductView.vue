<script>
import Week2Store from "../stores/Week2Store.js";
import { mapState, mapActions } from "pinia";

export default {
  data() {
    return {
      temp: {},
    };
  },
  computed: { ...mapState(Week2Store, ["showProducts", "products"]) },
  methods: { ...mapActions(Week2Store, ["changeProducts"]) },
  mounted() {
    this.changeProducts();
  },
};
</script>

<template>
  <h1 class="text-center">Week2 作業_登入後產品串接後端展現</h1>
  <hr />
  <main>
    <!-- <p>{{ products }}</p> -->

    <div class="container">
      <div class="row py-3">
        <h2 v-if="Object.keys(products).length === 0">Loading...</h2>
        <template v-else
          ><div class="col-md-6">
            <h2>產品列表</h2>
            <table class="table table-hover mt-4">
              <thead>
                <tr>
                  <th width="150">產品名稱</th>
                  <th width="120">原價</th>
                  <th width="120">售價</th>
                  <th width="150">是否啟用</th>
                  <th width="120">查看細節</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in products.products" :key="item.id">
                  <td width="150">{{ item.title }}</td>
                  <td width="120">
                    {{ item.origin_price }}
                  </td>
                  <td width="120">
                    {{ item.price }}
                  </td>
                  <td width="150">
                    <span v-if="item.is_enabled > 0" class="text-success"
                      >啟用</span
                    >
                    <span v-else>未啟用</span>
                  </td>
                  <td width="120">
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="temp = item"
                    >
                      查看細節
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <p>
              目前有
              <span>{{ Object.keys(products.products).length }}</span> 項產品
            </p>
          </div>
          <div class="col-md-6">
            <h2>單一產品細節</h2>
            <template v-if="temp.id">
              <div class="card mb-3">
                <img
                  :src="temp.imageUrl"
                  class="card-img-top primary-image"
                  alt="主圖"
                />
                <div class="card-body">
                  <h5 class="card-title">
                    {{ temp.title }}
                    <span class="badge bg-primary ms-2">{{
                      temp.category
                    }}</span>
                  </h5>
                  <p class="card-text">商品描述：{{ temp.description }}</p>
                  <p class="card-text">商品內容：{{ temp.content }}</p>
                  <div class="d-flex">
                    <p class="card-text me-2">{{ temp.origin_price }}</p>
                    <p class="card-text text-secondary">
                      <del>{{ temp.price }}</del>
                    </p>
                    元 / {{ temp.unit }}
                  </div>
                </div>
              </div>
              <template v-for="(item, index) in temp.imagesUrl" :key="index">
                <img :src="item" alt="" class="images m-2" />
              </template>
              <br />
              <button class="btn btn-primary" @click="temp = {}">
                清空產品細節
              </button>
            </template>
            <p v-else class="text-secondary">請選擇一個商品查看</p>
          </div></template
        >
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
</style>

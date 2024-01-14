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
    ...mapState(Week3Store, [
      "showProducts",
      "products",
      "dataTemp",
      "addTemp",
    ]),
  },
  methods: {
    ...mapActions(Week3Store, [
      "changeProducts",
      "editProduct",
      "handleImageError",
    ]),
  },
  mounted() {
    this.changeProducts();
    // console.log(document.cookie);
  },
};
</script>
<template>
  <div>
    <h2>新增產品</h2>
    <!-- <p>{{ dataTemp }}</p> -->

    <div class="card mb-3">
      <div class="card-body">
        <p class="card-text">
          <img
            :src="addTemp.imageUrl"
            class="card-img-top primary-image"
            alt="主圖"
          />
          <input
            type="text"
            placeholder="請輸入圖片網址"
            v-model.lazy="addTemp.imageUrl"
          />
        </p>

        <p class="card-text">
          商品分類：<input type="text" v-model="addTemp.category" />
        </p>
        <p class="card-text">
          商品名稱：<input type="text" v-model="addTemp.title" />
        </p>
        <p class="card-text">
          商品敘述：<textarea
            type="text"
            v-model="addTemp.description"
          ></textarea>
        </p>
        <p class="card-text">
          商品原價：<input type="number" v-model="addTemp.origin_price" />
        </p>
        <p class="card-text">
          商品價格：<input type="number" v-model="addTemp.price" />
        </p>
        <p class="card-text">
          是否啟用：
          <label for="is_enabled">{{
            addTemp.is_enabled === 1 ? "啟用" : "未啟用"
          }}</label>
          <input
            id="is_enabled"
            type="checkbox"
            :checked="addTemp.is_enabled === 1"
            @change="addTemp.is_enabled = addTemp.is_enabled === 1 ? 0 : 1"
          />
        </p>
        <button class="btn btn-primary" type="button">新增商品</button>
      </div>
    </div>
    <template v-for="(item, index) in temp.imagesUrl" :key="index">
      <img :src="item" alt="" class="images m-2" />
    </template>
    <br />
  </div>
</template>
<style lang="scss" scoped></style>

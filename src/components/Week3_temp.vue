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
    ...mapState(Week3Store, ["showProducts", "products", "dataTemp"]),
  },
  methods: { ...mapActions(Week3Store, ["changeProducts", "editProduct"]) },
  mounted() {
    this.changeProducts();
    // console.log(document.cookie);
  },
};
</script>
<template>
  <div class="editBlock">
    <!-- <p>{{ dataTemp }}</p> -->

    <div class="card mb-3">
      <img
        :src="dataTemp.imageUrl"
        class="card-img-top primary-image"
        alt="主圖"
      />
      <div class="card-body">
        <p class="card-text">
          商品分類：<input type="text" v-model="dataTemp.category" />
        </p>
        <p class="card-text">
          商品名稱：<input type="text" v-model="dataTemp.title" />
        </p>
        <p class="card-text">
          商品敘述：<textarea
            type="text"
            v-model="dataTemp.description"
          ></textarea>
        </p>
        <p class="card-text">
          商品原價：<input type="number" v-model="dataTemp.origin_price" />
        </p>
        <p class="card-text">
          商品價格：<input type="number" v-model="dataTemp.price" />
        </p>
        <p class="card-text">
          是否啟用：
          <label for="is_enabled">{{
            dataTemp.is_enabled === 1 ? "啟用" : "未啟用"
          }}</label>
          <input
            id="is_enabled"
            type="checkbox"
            :checked="dataTemp.is_enabled === 1"
            @change="dataTemp.is_enabled = dataTemp.is_enabled === 1 ? 0 : 1"
          />
        </p>
        <button class="btn btn-primary" type="button">完成編輯</button>
      </div>
    </div>
    <template v-for="(item, index) in temp.imagesUrl" :key="index">
      <img :src="item" alt="" class="images m-2" />
    </template>
    <br />
  </div>
</template>
<style lang="scss" scoped></style>

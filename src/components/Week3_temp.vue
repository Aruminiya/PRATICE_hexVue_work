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
    ...mapState(Week3Store, ["showProducts", "products", "data"]),
  },
  methods: {
    ...mapActions(Week3Store, ["changeProducts", "editProduct", "submitEdit"]),
  },
  mounted() {
    this.changeProducts();
    // console.log(document.cookie);
  },
};
</script>
<template>
  <div class="editBlock">
    <!-- <p>{{ data }}</p> -->

    <div class="card mb-3">
      <div class="card-body">
        <p class="card-text mainImg">
          <img
            :src="data.imageUrl"
            class="card-img-top primary-image"
            width="100"
          />
          <br />
        </p>
        <p class="card-text">
          <label for="">主圖：</label>
          <input
            type="text"
            placeholder="請輸入圖片網址"
            v-model.lazy="data.imageUrl"
          />
        </p>
        <p class="card-text">
          商品分類：<input type="text" v-model="data.category" />
        </p>
        <p class="card-text">
          商品單位：<input type="text" v-model="data.unit" />
        </p>
        <p class="card-text">
          商品名稱：<input type="text" v-model="data.title" />
        </p>
        <p class="card-text">
          商品敘述：<textarea type="text" v-model="data.description"></textarea>
        </p>
        <p class="card-text">
          商品原價：<input type="number" v-model="data.origin_price" />
        </p>
        <p class="card-text">
          商品價格：<input type="number" v-model="data.price" />
        </p>
        <p class="card-text">
          是否啟用：
          <label for="is_enabled">{{
            data.is_enabled === 1 ? "啟用" : "未啟用"
          }}</label>
          <input
            id="is_enabled"
            type="checkbox"
            :checked="data.is_enabled === 1"
            @change="data.is_enabled = data.is_enabled === 1 ? 0 : 1"
          />
        </p>
        <button
          class="btn btn-primary"
          type="button"
          @click="submitEdit(data.id)"
        >
          完成編輯
        </button>
      </div>
    </div>
    <template v-for="(item, index) in data.imagesUrl" :key="index">
      <img :src="item" alt="" class="images m-2" />
    </template>
    <br />
  </div>
</template>
<style lang="scss" scoped></style>

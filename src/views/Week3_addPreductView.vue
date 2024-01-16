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
    ...mapState(Week3Store, ["showProducts", "products", "dataTemp", "data"]),
  },
  methods: {
    ...mapActions(Week3Store, [
      "changeProducts",
      "editProduct",
      "handleImageError",
      "addProduct",
    ]),
  },
};
</script>
<template>
  <div>
    <h2>新增產品</h2>
    <!-- <p>{{ dataTemp }}</p> -->

    <div class="card mb-3">
      <div class="card-body">
        <p class="card-text productImg">
          <img
            :src="data.imageUrl"
            class="card-img-top primary-image"
            width="100"
          />
          <br />
        </p>
        <p class="card-text">
          <label for="mainImg">主圖：</label>
          <input
            id="mainImg"
            type="text"
            placeholder="請輸入圖片網址"
            v-model.lazy="data.imageUrl"
          />
        </p>
        <p class="card-text">
          商品分類：<input type="text" v-model="data.category" />
        </p>
        <p class="card-text">
          商品名稱：<input type="text" v-model="data.title" />
        </p>
        <p class="card-text">
          商品單位：<input type="text" v-model="data.unit" />
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
        <p class="card-text sideProductImg">
          <img
            :src="data.imagesUrl[0]"
            class="card-img-top primary-image"
            width="100"
          />
          <br />
        </p>
        <p class="card-text">
          <label for="img_01">產品圖1：</label>
          <input
            id="img_01"
            type="text"
            placeholder="請輸入圖片網址"
            v-model.lazy="data.imagesUrl[0]"
          />
        </p>
        <p class="card-text sideProductImg">
          <img
            :src="data.imagesUrl[1]"
            class="card-img-top primary-image"
            width="100"
          />
          <br />
        </p>
        <p class="card-text">
          <label for="img_02">產品圖2：</label>
          <input
            id="img_02"
            type="text"
            placeholder="請輸入圖片網址"
            v-model.lazy="data.imagesUrl[1]"
          />
        </p>
        <p class="card-text sideProductImg">
          <img
            :src="data.imagesUrl[2]"
            class="card-img-top primary-image"
            width="100"
          />
          <br />
        </p>
        <p class="card-text">
          <label for="img_03">產品圖3：</label>
          <input
            id="img_03"
            type="text"
            placeholder="請輸入圖片網址"
            v-model.lazy="data.imagesUrl[2]"
          />
        </p>
        <p class="card-text sideProductImg">
          <img
            :src="data.imagesUrl[3]"
            class="card-img-top primary-image"
            width="100"
          />
          <br />
        </p>
        <p class="card-text">
          <label for="img_04">產品圖4：</label>
          <input
            id="img_04"
            type="text"
            placeholder="請輸入圖片網址"
            v-model.lazy="data.imagesUrl[3]"
          />
        </p>
        <p class="card-text sideProductImg">
          <img
            :src="data.imagesUrl[4]"
            class="card-img-top primary-image"
            width="100"
          />
          <br />
        </p>
        <p class="card-text">
          <label for="img_05">產品圖5：</label>
          <input
            id="img_05"
            type="text"
            placeholder="請輸入圖片網址"
            v-model.lazy="data.imagesUrl[4]"
          />
        </p>
        <div class="d-flex">
          <button
            class="btn btn-primary mx-1"
            type="button"
            @click="addProduct()"
          >
            新增商品
          </button>
          <RouterLink
            to="/Week3_showPreductView"
            class="nav-item nav-link active mx-1"
            href="#"
          >
            <button class="btn btn-outline-primary" type="button">
              回到商品管理
            </button></RouterLink
          >
        </div>
      </div>
    </div>
    <template v-for="(item, index) in temp.imagesUrl" :key="index">
      <img :src="item" alt="" class="images m-2" />
    </template>
    <br />
  </div>
</template>
<style lang="scss" scoped>
.productImg {
  overflow: hidden;
  height: 300px;
  width: 300px;
  background-image: url("https://as2.ftcdn.net/v2/jpg/02/45/49/25/1000_F_245492548_Rqq1vuVKr2SCbmhizERoIxNsY2JPpzz7.jpg");
  background-size: 300px;
  background-repeat: no-repeat;
  Img {
    object-fit: cover;
    height: 300px;
  }
}

.sideProductImg {
  overflow: hidden;
  height: 100px;
  width: 100px;
  background-image: url("https://as2.ftcdn.net/v2/jpg/02/45/49/25/1000_F_245492548_Rqq1vuVKr2SCbmhizERoIxNsY2JPpzz7.jpg");
  background-size: 100px;
  background-repeat: no-repeat;
  Img {
    object-fit: cover;
    height: 100px;
    width: 100px;
  }
}
</style>

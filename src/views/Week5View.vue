<script>
import Week5_userProductModal from "../components/Week5_userProductModal.vue";

// pinia
import Week5Store from "../stores/Week5Store.js";
import { mapState, mapActions } from "pinia";

// 把需要的語系 驗證 驗證規則引入
import * as VeeValidate from "vee-validate";
import * as VeeValidateI18n from "@vee-validate/i18n";
import * as VeeValidateRules from "@vee-validate/rules";

// 中文語系 JSON
import zh_TW from "../assets/zh_TW.json";

// 表單驗證規則全部引入使用
Object.keys(VeeValidateRules).forEach((rule) => {
  VeeValidate.defineRule(rule, VeeValidateRules[rule]);
});

// 讀取語系外部的資源
VeeValidateI18n.localize({
  zh_TW,
});
// Activate the locale
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize("zh_TW"),
  validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});

export default {
  components: {
    VForm: VeeValidate.Form,
    VField: VeeValidate.Field,
    ErrorMessage: VeeValidate.ErrorMessage,
    Week5_userProductModal,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(Week5Store, [
      "loadingStatus",
      "showProducts",
      "product",
      "products",
      "form",
      "cart",
      "isLoading",
    ]),
  },
  methods: {
    ...mapActions(Week5Store, [
      "addToCart",
      "createOrder",
      "addToCart",
      "getProducts",
      "getProduct",
      "getCart",
      "removeCartItem",
      "deleteAllCarts",
    ]),
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : "需要正確的電話號碼";
    },
    submitForm() {
      this.createOrder();
      // this.$refs.form.resetForm();
    },
  },
  mounted() {
    this.getProducts();
    this.getCart();
  },
  watch: {
    isLoading(newVal, oldVal) {
      console.log(newVal, oldVal);
      if (newVal === false) {
        this.$refs.userProductModal.openModal();
      }
    },
  },
};
</script>

<template>
  <h1 class="text-center">Week5 作業</h1>
  <hr />
  <main>
    <div class="container">
      <div class="my-5 row justify-content-center">
        <div class="col-12">
          <!-- 產品列表 -->
          <Week5_userProductModal
            ref="userProductModal"
            :product="product"
            @add-to-cart="addToCart"
          ></Week5_userProductModal>
          <table class="table align-middle">
            <thead>
              <tr>
                <th>圖片</th>
                <th>商品名稱</th>
                <th>價格</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in products" :key="item.id">
                <td style="width: 200px">
                  <div
                    style="
                      height: 100px;
                      background-size: cover;
                      background-position: center;
                    "
                    :style="{ backgroundImage: `url(${item.imageUrl})` }"
                  ></div>
                </td>
                <td>
                  {{ item.title }}
                </td>
                <td>
                  <div class="h5" v-if="!item.price">
                    {{ item.origin_price }} 元
                  </div>
                  <del class="h6" v-if="item.price"
                    >原價 {{ item.origin_price }} 元</del
                  >
                  <div class="h5" v-if="item.price">
                    現在只要 {{ item.price }} 元
                  </div>
                </td>
                <td>
                  <div class="btn-group btn-group-sm">
                    <button
                      type="button"
                      class="btn btn-outline-secondary d-flex"
                      @click="getProduct(item.id)"
                      :disabled="
                        loadingStatus.loadingItem === item.id ||
                        !item.is_enabled
                      "
                    >
                      <i
                        class="fas fa-spinner fa-pulse"
                        v-if="loadingStatus.loadingItem === item.id"
                      ></i>
                      <span v-if="isLoading">
                        <img
                          src="../../public/Loading.gif"
                          alt="Loading"
                          width="16"
                          height="16"
                      /></span>

                      查看更多
                    </button>
                    <button
                      type="button"
                      class="btn btn-outline-danger"
                      @click="addToCart(item.id)"
                      :disabled="
                        loadingStatus.loadingItem === item.id ||
                        !item.is_enabled
                      "
                    >
                      <i
                        class="fas fa-spinner fa-pulse"
                        v-if="loadingStatus.loadingItem === item.id"
                      ></i>
                      <span v-if="isLoading">
                        <img
                          src="../../public/Loading.gif"
                          alt="Loading"
                          width="16"
                          height="16"
                      /></span>
                      加到購物車
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 購物車列表 -->
        <div class="col-12">
          <div class="text-end">
            <button
              class="btn btn-outline-danger"
              type="button"
              @click="deleteAllCarts"
            >
              清空購物車
            </button>
          </div>
          <table class="table align-middle">
            <thead>
              <tr>
                <th></th>
                <th>品名</th>
                <th style="width: 150px">數量/單位</th>
                <th>單價</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="cart.carts">
                <tr v-for="item in cart.carts" :key="item.id">
                  <td>
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm"
                      @click="removeCartItem(item.id)"
                      :disabled="loadingStatus.loadingItem === item.id"
                    >
                      <i
                        class="fas fa-spinner fa-pulse"
                        v-if="loadingStatus.loadingItem === item.id"
                      ></i>
                      x
                    </button>
                  </td>
                  <td>
                    {{ item.product.title }}
                    <div class="text-success" v-if="item.coupon">
                      已套用優惠券
                    </div>
                  </td>
                  <td>
                    <div class="input-group input-group-sm">
                      <div class="input-group mb-3">
                        <input
                          v-model.number="item.qty"
                          @blur="updateCart(item)"
                          :disabled="loadingStatus.loadingItem === item.id"
                          min="1"
                          type="number"
                          class="form-control"
                        />
                        <span class="input-group-text" id="basic-addon2">{{
                          item.product.unit
                        }}</span>
                      </div>
                    </div>
                  </td>
                  <td class="text-end">
                    <small
                      v-if="cart.final_total !== cart.total"
                      class="text-success"
                      >折扣價：</small
                    >
                    {{ item.final_total }}
                  </td>
                </tr>
              </template>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="text-end">總計</td>
                <td class="text-end">{{ cart.total }}</td>
              </tr>
              <tr v-if="cart.final_total !== cart.total">
                <td colspan="3" class="text-end text-success">折扣價</td>
                <td class="text-end text-success">{{ cart.final_total }}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <!-- 表單驗證 -->
        <div class="col-12 d-flex justify-content-center">
          <v-form
            ref="form"
            class="col-md-6"
            v-slot="{ errors }"
            @submit="submitForm"
          >
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <v-field
                id="email"
                name="email"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': errors['email'] }"
                placeholder="請輸入 Email"
                rules="email|required"
                v-model="form.user.email"
              ></v-field>
              <error-message
                name="email"
                class="invalid-feedback"
              ></error-message>
            </div>

            <div class="mb-3">
              <label for="name" class="form-label">收件人姓名</label>
              <v-field
                id="name"
                name="姓名"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors['姓名'] }"
                placeholder="請輸入姓名"
                rules="required"
                v-model="form.user.name"
              ></v-field>
              <error-message
                name="姓名"
                class="invalid-feedback"
              ></error-message>
            </div>

            <div class="mb-3">
              <label for="tel" class="form-label">收件人電話</label>
              <v-field
                id="tel"
                name="電話"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors['電話'] }"
                placeholder="請輸入電話"
                rules="required|min:8|max:10"
                v-model="form.user.tel"
              ></v-field>
              <error-message
                name="電話"
                class="invalid-feedback"
              ></error-message>
            </div>

            <div class="mb-3">
              <label for="address" class="form-label">收件人地址</label>
              <v-field
                id="address"
                name="地址"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors['地址'] }"
                placeholder="請輸入地址"
                rules="required"
                v-model="form.user.address"
              ></v-field>
              <error-message
                name="地址"
                class="invalid-feedback"
              ></error-message>
            </div>

            <div class="mb-3">
              <label for="message" class="form-label">留言</label>
              <textarea
                name=""
                id="message"
                class="form-control"
                cols="30"
                rows="10"
                v-model="form.message"
              ></textarea>
            </div>
            <div class="text-end">
              <button type="submit" class="btn btn-danger">送出訂單</button>
            </div>
          </v-form>
        </div>
      </div>
    </div>
  </main>
</template>
<style lang="scss" scoped></style>

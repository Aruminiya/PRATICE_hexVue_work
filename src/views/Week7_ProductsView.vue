<script>
import { mapState, mapActions } from "pinia";
import Week7_productStore from "../stores/Week7_productStore.js";

export default {
  data() {
    return {
      isLoading: false,
      //   product: "",
      id: "",
    };
  },
  computed: {
    ...mapState(Week7_productStore, ["data", "products"]),
  },
  methods: {
    ...mapActions(Week7_productStore, ["getProducts"]),
  },
  mounted() {
    this.getProducts();
  },
};
</script>

<template>
  <!-- {{ products }} -->
  <div class="text-end mt-4">
    <button class="btn btn-primary" type="button" @click="openModal(true)">
      建立新的產品
    </button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否啟用</th>
        <th width="200">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products.products" :key="item.id">
        <td>{{ item.category }}</td>
        <td>{{ item.title }}</td>
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
              class="btn btn-outline-primary btn-sm"
              type="button"
              @click="openModal(false, item)"
            >
              編輯
            </button>
            <button
              class="btn btn-outline-danger btn-sm"
              type="button"
              @click="openDelProductModal(item)"
            >
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

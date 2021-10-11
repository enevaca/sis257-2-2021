<template>
  <div class="nav-bar">
    <div class="cart">Carro {{ state.cart.length }}</div>
    <ProductDisplay :premium="state.premium" @add-to-cart="updateCart" />
  </div>
</template>

<script>
// @ is an alias to /src
import ProductDisplay from "@/components/ProductDisplay.vue";
import { reactive } from "vue";

export default {
  name: "Home",
  components: {
    ProductDisplay,
  },
  setup() {
    const state = reactive({
      cart: [],
      premium: true,
    });

    const updateCart = (id) => {
      state.cart.push(id);
    };

    return {
      state,
      updateCart,
    };
  },
};
</script>

<style scoped>
.nav-bar {
  background: linear-gradient(-90deg, #84cf6a, #16c0b0);
  height: 60px;
  margin-bottom: 25px;
  -webkit-box-shadow: 0px 2px 15px -12px rgba(0, 0, 0, 0.57);
  -moz-box-shadow: 0px 2px 15px -12px rgba(0, 0, 0, 0.57);
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.57);
}
.cart {
  margin: 5rem 6rem;
  float: right;
  border: 1px solid #d8d8d8;
  padding: 10px 30px;
  background-color: white;
  -webkit-box-shadow: 0px 2px 15px -12px rgba(0, 0, 0, 0.57);
  -moz-box-shadow: 0px 2px 15px -12px rgba(0, 0, 0, 0.57);
  box-shadow: 2px 15px -12px rgba(0, 0, 0, 0.57);
}
</style>

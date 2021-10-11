<template>
  <div class="product-display">
    <div class="product-container">
      <div class="product-image">
        <img :src="image" alt="Camiseta" />
      </div>
      <div class="product-info">
        <h1>{{ title }}</h1>
        <p v-if="inStock">En Stock</p>
        <p v-else>Agotado</p>
        <p>Envío: {{ shipping }}</p>
        <ul>
          <li v-for="(detail, index) in details" :key="index">{{ detail }}</li>
        </ul>
        <div
          v-for="(variant, index) in variants"
          :key="variant.id"
          @mouseover="updateVariant(index)"
          class="color-circle"
          :style="{ backgroundColor: variant.color }"
        ></div>
        <button
          class="button"
          :class="{ disabledButton: !inStock }"
          :disabled="!inStock"
          @click="addToCart"
        >
          Agregar al carro
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";

export default {
  name: "ProductDisplay",
  props: {
    premium: Boolean,
  },
  setup(props, { emit }) {
    const product = ref("Camiseta");
    const brand = ref("Alfredo");
    const selectedImage = ref(0);
    const details = ref(["50% algodón", "30% lana", "20% poliéster"]);
    const variants = ref([
      {
        id: 7820,
        color: "green",
        image: require("../assets/images/t-shirt-green-bolivia.jpg"),
        quantity: 15,
      },
      {
        id: 7821,
        color: "white",
        image: require("../assets/images/t-shirt-white-bolivia.jpg"),
        quantity: 0,
      },
    ]);

    const addToCart = () => {
      emit("add-to-cart", variants.value[selectedImage.value].id);
    };

    const updateVariant = (index) => {
      selectedImage.value = index;
    };

    const title = computed(() => `${brand.value} ${product.value}`);
    const image = computed(() => variants.value[selectedImage.value].image);
    const inStock = computed(
      () => variants.value[selectedImage.value].quantity
    );
    const shipping = computed(() => (props.premium ? "Gratis" : 2.99));

    return {
      product,
      brand,
      selectedImage,
      details,
      variants,
      addToCart,
      updateVariant,
      title,
      image,
      inStock,
      shipping,
    };
  },
};
</script>

<style scoped>
.button {
  margin: 30px;
  background-color: #39495c;
  border-radius: 5px;
  font-size: 18px;
  width: 180px;
  height: 60px;
  color: white;
  padding: 20px;
  box-shadow: inset 0 -0.6em 1em -0.35em rgba(0, 0, 0, 0.17),
    inset 0 0.6em 2em -0.3em rgba(255, 255, 255, 0.15),
    inset 0 0 0em 0.05em rgba(255, 255, 255, 0.12);
  text-align: center;
  cursor: pointer;
}

.color-circle {
  width: 50px;
  height: 50px;
  margin-top: 8px;
  border: 2px solid #a8a4a4;
  border-radius: 50%;
  cursor: grabbing;
}

.disabledButton {
  background-color: #d8d8d8;
  cursor: not-allowed;
}

h1 {
  font-size: 50px;
}

h3 {
  font-size: 25px;
}

img {
  border: 2px solid #d8d8d8;
  width: 70%;
  margin: 40px;
  padding: 15px;
  -webkit-box-shadow: 0px 2px 15px -12px rgba(0, 0, 0, 0.57);
  -moz-box-shadow: 0px 2px 15px -12px rgba(0, 0, 0, 0.57);
  box-shadow: 2px 15px -12px rgba(0, 0, 0, 0.57);
}

input {
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
}

label {
  font-size: 20px;
  margin-bottom: 5px;
}

li {
  font-size: 18px;
}

p {
  font-size: 22px;
}

.product-display {
  display: flex;
  flex-direction: column;
  padding: 2rem;
}

.product-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.product-image,
.product-info {
  width: 50%;
}

.review-form {
  display: flex;
  flex-direction: column;
  width: 425px;
  padding: 20px;
  margin: 40px;
  border: 2px solid #d8d8d8;
  background-color: white;
  -webkit-box-shadow: 0px 2px 15px -12px rgba(0, 0, 0, 0.57);
  -moz-box-shadow: 0px 2px 15px -12px rgba(0, 0, 0, 0.57);
  box-shadow: 2px 15px -12px rgba(0, 0, 0, 0.57);
}

.review-container {
  width: 425px;
  padding: 20px;
  background-color: white;
  -webkit-box-shadow: 0px 2px 20px -12px rgba(0, 0, 0, 0.57);
  -moz-box-shadow: 0px 2px 20px -12px rgba(0, 0, 0, 0.57);
  box-shadow: 2px 20px -12px rgba(0, 0, 0, 0.57);
  margin-left: 40px;
  border: 2px solid #d8d8d8;
}

.review-container li {
  margin-bottom: 30px;
}

.review-form .button {
  display: block;
  margin: 30px auto;
}

select {
  height: 40px;
  font-size: 20px;
  background-color: white;
  cursor: pointer;
}

textarea {
  width: 95%;
  height: 70px;
  padding: 10px;
  font-size: 20px;
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
}

@media only screen and (max-width: 600px) {
  .container {
    flex-direction: column;
  }

  .product-image,
  .product-info {
    margin-left: 10px;
    width: 100%;
  }

  .review-form {
    width: 90%;
  }
}
</style>

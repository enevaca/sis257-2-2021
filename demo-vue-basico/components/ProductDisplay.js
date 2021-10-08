app.component("product-display", {
  props: {
    premium: {
      type: Boolean
    }
  },
  /*html*/
  template: `
  <div class="product-display">
    <div class="product-container">
      <div class="product-image">
        <img :src="image" alt="Camiseta">
      </div>
      <div class="product-info">
        <h1>{{ title }}</h1>
        <p v-if="inStock">En Stock</p>
        <p v-else>Agotado</p>
        <p>Envío: {{ shipping }}</p>
        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>
        <div v-for="(variant, index) in variants" :key="variant.id" @mouseover="updateVariant(index)"
          class="color-circle" :style="{ backgroundColor: variant.color }"></div>
        <button class="button" :class="{ disabledButton: !inStock }" :disabled="!inStock" 
          @click="addToCart">Agregar al carro</button>
      </div>
    </div>
  </div>
    `,
  data() {
    return {
      product: 'Camiseta',
      brand: 'Vue',
      selectedImage: 0,
      details: ['50% algodón', '30% lana', '20% poliéster'],
      variants: [
        { id: 7820, color: 'green', image: './assets/images/t-shirt-green-bolivia.jpg', quantity: 15 },
        { id: 7821, color: 'white', image: './assets/images/t-shirt-white-bolivia.jpg', quantity: 0 }
      ]
    };
  },
  methods: {
    addToCart() {
      //this.cart += 1
      this.$emit('add-to-cart', this.variants[this.selectedImage].id)
    },
    updateVariant(index) {
      this.selectedImage = index
    }
  },
  computed: {
    title() {
      return `${this.brand} ${this.product}`
    },
    image() {
      return this.variants[this.selectedImage].image
    },
    inStock() {
      return this.variants[this.selectedImage].quantity
    },
    shipping() {
      return this.premium? 'Gratis' : 2.99
    }
  },
});

<template>
    <div class="card">
        <img :src="require('../assets/' + image_name)" :alt="alt" style="width:50%">
        <h1>{{ name }}</h1>
        <p class="price">{{currencySymbol}} {{ price }}</p>
        <p>{{ blurb }}</p>
        <p>
            <button @click="updateCart">Add To Cart</button>
        </p>
    </div>
</template>

<script>
import { currencyHelper } from '../mixins/CurrencyMixin';
export default {
  name: 'Product',
  props:['image_name', 'name', 'price', 'blurb', 'alt', 'currency'],
  emits: ['addToCart'],
  mixins: [currencyHelper],
  computed: {
      currencySymbol() {
          return currencyHelper.methods.currencySymbol(this.currency);
      }
  },
  methods: {
      updateCart() {
          const item = {
              name: this.name,
              amount: parseInt(this.price),
          };

          this.$emit('addToCart', item);
      }
  }

}
</script>

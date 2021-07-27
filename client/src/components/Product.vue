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

export default {
  name: 'Product',
  props:['image_name', 'name', 'price', 'blurb', 'alt', 'currency'],
  emits: ['addToCart'],
  computed: {
      currencySymbol() {
          switch (this.currency) {
              case "GBP":
                  return "£";
              case "EUR":
                  return "€";
              case "USD": 
                  return "$";
              default:
                  return "£";
          }
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

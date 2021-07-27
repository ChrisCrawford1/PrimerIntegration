<template>
    <div class="card">
        <img :src="require('../assets/' + image_name)" :alt="alt" style="width:50%">
        <h1>{{ name }}</h1>
        <p class="price">£{{ price }}</p>
        <p>{{ blurb }}</p>
        <p>
            <button @click="updateCart">Add To Cart</button>
        </p>
    </div>
</template>

<script>

export default {
  name: 'Product',
  props:['image_name', 'name', 'price', 'blurb', 'alt'],
  emits: ['addToCart'],
  data: function () {
    return {

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

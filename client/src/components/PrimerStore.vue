<template>
  <div class="hello">

    <span>Currency: </span>
    <select name="currencySelector" id="currencySelector" v-model="currency">
      <option value="GBP" selected>GBP</option>
      <option value="EUR">EUR</option>
      <option value="USD">USD</option>
    </select>

    <div class="grid-container">
      <div class="grid-child">
        <div class="grid-container">
          <Product 
            image_name="ducky.jpeg"
            name="Programmers Friend"
            price="12"
            blurb="For all of those debugging needs."
            alt="Rubber Duck"
            :currency="currency"
            @addToCart="addToCart"
          />

          <Product 
            image_name="keyboard.jpeg" 
            name="Mechanical Keyboard"
            price="150"
            blurb="Tactile goodness."
            alt="Mechanical Keyboard"
            :currency="currency"
            @addToCart="addToCart"
          />
        </div>
      </div>

      <!-- Will only render if items are in the cart -->
      <div class="grid-child green">
        <div class="parent-checkout">
          <div class="checkout-container" id="checkout-container"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { loadPrimer } from "@primer-io/checkout-web";
import Product from './Product.vue';

export default {
  name: 'PrimerStore',
  mixins: [],
  components: {
    "Product": Product,
  },
  data: function () {
    return {
      baseUrl: "http://localhost:5000",
      clientToken: null,
      expirationDate: null,
      countryCode: "GB",
      currency: "GBP",
      cart: [],
      checkoutInitialised: false,
    }
  },

  computed: {
    fetchTokenUrl() {
      return this.baseUrl + '/auth/fetch-token'
    },
    authorizeUrl() {
      return this.baseUrl + '/payments/create';
    },
    totalAmount() {
      let total = 0;

      this.cart.forEach((item) => {
        total += item.amount;
      });
      return total * 100;
    }
  },

  methods: {
    addToCart(data) {
      this.cart.push(data);
    },

    async processPurchase(data) {
      let payload = {
        amount: this.totalAmount,
        currencyCode: this.currency,
        orderId: "Order " + Math.floor(1000 + Math.random() * 9000),
        token: data.token,
        statement: "Primer Store Purchase"
      }

      let response = await axios.post(this.authorizeUrl, payload);
      let returnedData = response.data;


      if (returnedData.status === 'DECLINED' || returnedData.status === 'FAILED') {
        throw new Error(returnedData.lastPaymentError.processorMessage);
      }

      return response.data;
    },

    processError(data) {
      alert(data);
    },

    async initialiseCheckout() {
      try {
        let response = await axios.get(this.fetchTokenUrl);
        
        this.clientToken = response.data.clientToken;
        this.expirationDate = response.data.expirationDate;
        let clientToken = this.clientToken;

        const Primer = await loadPrimer();
        const client = new Primer({
          credentials: {clientToken: clientToken},
          uxFlow: Primer.CheckoutUXFlow.MANAGE_PAYMENT_METHODS,
        });

        client.checkout(
          {
            uxFlow: Primer.CheckoutUXFlow.CHECKOUT,
            container: "#checkout-container",
            onTokenizeSuccess: async (data) => {
              try {
                await this.processPurchase(data);
              } catch (e) {
                throw new Error(e.message);
              }
              
            },
            onTokenizeError: (data) => {
              this.processError(data);
            },
          }
        );
      } catch (error) {
        alert(error);
      }
    }
  },

  watch: {
    // Only when items are added, then kick off the checkout.
    cart: {
      handler(val) {
        if (val.length > 0 && !this.checkoutInitialised) {
          this.checkoutInitialised = true;
          this.initialiseCheckout();
        }
      },
      deep: true
  },
  }
}
</script>

<style scoped lang="scss">
@import"https://assets.primer.io/primer-sdk-web/v1.10.0/Checkout.css";
</style>

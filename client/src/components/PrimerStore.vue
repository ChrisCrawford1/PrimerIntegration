<template>
  <div class="hello">
    <div class="grid-container">
      <div class="grid-child purple">
        <div class="grid-container">
          <div class="card">
            <img src="../assets/ducky.jpeg" alt="Rubber Duck" style="width:50%">
            <h1>Programmers Friend</h1>
            <p class="price">£6.99</p>
            <p>For all of those debugging needs.</p>
            <p>
              <button >Add To Cart</button>
            </p>
        </div>
        <div class="card">
            <img src="../assets/ducky.jpeg" alt="Rubber Duck" style="width:50%">
            <h1>Programmers Friend</h1>
            <p class="price">£18.99</p>
            <p>For all of those debugging needs.</p>
            <p>
              <button>Add To Cart</button>
            </p>
        </div>
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

export default {
  name: 'PrimerStore',
  mixins: [],
  data: function () {
    return {
      baseUrl: "http://localhost:5000",
      clientToken: null,
      expirationDate: null,
      countryCode: "GB",
      currency: "GBP",
      selectedItem: null,
      cart: {}
    }
  },

  computed: {
    fetchTokenUrl() {
      return this.baseUrl + '/auth/fetch-token'
    },
    authorizeUrl() {
      return this.baseUrl + '/payments/create';
    }
  },

  methods: {
    processPurchase(data) {
      let payload = {
        amount: 1899,
        currencyCode: "GBP",
        orderId: "Order " + Math.floor(1000 + Math.random() * 9000),
        token: data.token,
        statement: "Random Item Purchase"
      }

      axios.post(this.authorizeUrl, payload)
      .then((response) => {
        console.log(response.data);
      })
    },

    processError(data) {
      console.log(data);
    },

    async initialiseCheckout() {
      try {
        let response = await axios.get(this.fetchTokenUrl);
        this.clientToken = response.data.clientToken;
        this.expirationDate = response.data.expirationDate;
        let clientToken = this.clientToken;
        const Primer = await loadPrimer();
        const client = new Primer({
          credentials: { clientToken:clientToken },
          uxFlow: Primer.CheckoutUXFlow.CHECKOU
        });
        client.checkout(
          {
            uxFlow: Primer.CheckoutUXFlow.CHECKOUT,
            container: "#checkout-container",
            onTokenizeStart: () => {
              console.log('Start');
            },
            onTokenizeSuccess: (data) => {
              this.processPurchase(data);
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
    // Only when items are selected, then kick off the checkout.
    selectedItem: function(val) {
        if (val !== null) {
          this.initialiseCheckout();
        }
      },
  }
}
</script>

<style scoped lang="scss">
@import"https://assets.primer.io/primer-sdk-web/v1.10.0/Checkout.css"
</style>

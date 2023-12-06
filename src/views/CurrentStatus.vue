<template>
    <div class="body">
      <Navbar/>
      <div class="container">
        <table>
          <thead>
            <tr>
              <th>CRIPTOMONEDA</th>
              <th>CANTIDAD</th>
              <th>DINERO</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(coin, index) in wallet.filter((coin) => coin.crypto_amount > 0)" :key="coin._id">
              <td>{{ nameCriptos(coin.crypto_code) }}</td>
              <td>{{ coin.crypto_amount }}</td>
              <td>{{ currentMoney[index] }}</td>
            </tr>
          </tbody>
          <tr class="total">
            <td></td>
            <th>TOTAL</th>
            <td>{{ "$ " + actualTotalMoney.toFixed(2) }}</td>
          </tr>
        </table>
      </div>
    </div>
</template>
  
<script>
  import { mapGetters } from 'vuex';
  import Navbar from "@/components/Navbar.vue";
  import CryptoApi from "@/services/CryptoApi";
  
  export default {
    name: 'CurrentStatus',
    components: { Navbar },
    data() {
      return {
        actualTotalMoney: 0,
        currentMoney: [],
      };
    },
    computed: {
      ...mapGetters({
        wallet: "getCurrentStatus",
      }),

    },
    methods: {
      nameCriptos(crypto_code) {
        if (crypto_code == "btc")
          return "Bitcoin";
        if (crypto_code == "eth")
          return "Ethereum";
        if (crypto_code == "usdt")
          return "Theter";
        if (crypto_code == "usdc")
          return "USDCoin";
        if (crypto_code == "dai")
          return "Dai";
      },

      fetchData() {
      const cryptoData = {};

      const apiRequests = this.wallet.map((coin) => {
        return CryptoApi.getPriceMoney(coin.crypto_code)
          .then((res) => {
            const data = {
              crypto_amount: coin.crypto_amount,
              money: parseFloat(coin.money),
              actualPrice: res.data.totalBid,
            };
            cryptoData[coin.crypto_code] = data;
            return data.crypto_amount * data.actualPrice;
          })
          .catch(() => {
            this.$toast.error("Error");
            return 0;
          });
      });

      Promise.all(apiRequests)
        .then((values) => {
          this.currentMoney = values;
          this.actualTotalMoney = values.reduce((total, value) => total + value, 0);
        })
        .catch((error) => {
          console.error("Error al obtener datos de la API:", error);
        });
      },
    },
    mounted(){
      this.fetchData();
      
    },
  };
</script>

<style>
  div {
    display: block;
    flex-direction: center;
    align-items: center;
    justify-content: center;
    margin: 0;
  }
  table {
    display: inline-block;
    flex-direction: center;
    align-items: center;
    justify-content: center;
    color: rgb(21, 4, 4);
    font-size: 14px;
    table-layout: fixed;
    border-collapse: collapse;
    background: #fbfbfbae;
  }
  thead {
    background: rgba(105, 11, 186, 0.4);
  }
  th {
    padding: 20px 15px;
    font-weight: 700;
    text-transform: uppercase;
  }
  td {
    padding: 20px 15px;
    font-weight: 700;
    text-transform: uppercase;
    border-bottom: solid 1px rgb(255, 255, 255, 0.2);
  }
  tbody tr {
      cursor: pointer;
  }
  tbody tr:hover {
    background: rgb(243, 103, 199, 0.4);
  }
  .total {
    background: rgb(243, 103, 199, 0.4);
  }
</style>
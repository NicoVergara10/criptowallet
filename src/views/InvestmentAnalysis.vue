<template>
  <div>
    <Navbar />
    <div class="container">
      <div v-if="loading" class="loader"></div>
      <table v-if="!loading">
        <thead>
          <tr>
            <th>CRIPTOMONEDA</th>
            <th>CANTIDAD</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(coin, index) in wallet" :key="coin.crypto_code">
            <td>{{ nameCriptos(coin.crypto_code) }}</td>
            <td>{{ investment[index] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Navbar from '@/components/Navbar.vue';
  import CryptoApi from "@/services/CryptoApi";
  
  export default {
    name: 'Analysis',
    components: { Navbar },
    data(){
      return {
        transactions: null,
        investment: [],
        loading: false,
      };
    },
    computed:{
      ...mapGetters({
        wallet: "getCurrentStatus",
      }),
    },
    mounted(){

      this.loading = true;
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

          if (data.crypto_amount > 0) {
            const valueMoney = data.crypto_amount * data.actualPrice;
            const difference = ((valueMoney - data.money) * -1).toFixed(2);
            return difference;
          } else {
            return (data.money * -1).toFixed(2);
          }
        })
        .catch(() => {
          this.$toast.error("Error");
          return "0.00";
        })
        .finally(() => {
          this.loading = false;
        });
      });

      Promise.all(apiRequests)
        .then((values) => {
          this.investment = values;
        })
        .catch((error) => {
          console.error("Error al obtener datos de la API:", error);
      });
    },
    methods:{
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
    },
  }
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
  .loader {
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 1s linear infinite;
    margin: 50px auto;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }  
</style>
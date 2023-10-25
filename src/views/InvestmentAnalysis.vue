<template>
  <div>
    <Navbar />
    <div class="container">
        <table>
          <thead>
            <tr>
              <th>CRIPTOMONEDA</th>
              <th>CANTIDAD</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="coin in wallet" :key="coin._id">
              <td>{{ nameCriptos(coin.crypto_code) }}</td>
              <td>{{ coin.money }}</td>
            </tr>
          </tbody>
        </table>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Navbar from '@/components/Navbar.vue';

export default {
    name: 'Analysis',
    components: { Navbar },
    data(){
        return {};
    },
    computed:{
        ...mapGetters({
          wallet: "getCurrentStatus",
        }),
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

</style>
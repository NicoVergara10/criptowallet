import axios from "axios";

const clienteAPI = axios.create({
  baseURL: "https://criptoya.com/api",
  withCredentials: false,
});

export default {
  getAgenciesInformation(coin) {
    return clienteAPI.get(`/${coin}/ars/1`);
  },
  // getTransactionCrypto(exchange, coin) {
  //   return clienteAPI.get(`/${exchange}/${coin}/ars/0.01`);
  // },
  // getCryptoMoney() {
  //   return clienteAPI.get("/cryptomkt/btc/ars/0.21");
  // },
  getPriceMoney(coin) {
    return clienteAPI.get(`/bitex/${coin}`);
  },
};
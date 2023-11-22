import axios from "axios";

const clienteAPI = axios.create({
  baseURL: "https://criptoya.com/api",
  withCredentials: false,
});

export default {
  getAgenciesInformation(coin) {
    return clienteAPI.get(`/${coin}/ars/1`);
  },
  
  getPriceMoney(coin) {
    return clienteAPI.get(`/belo/${coin}`);
  },
};
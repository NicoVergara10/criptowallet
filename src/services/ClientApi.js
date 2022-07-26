import axios from "axios";

const clienteAPI = axios.create({
    baseURL: "https://laboratorio3-f36a.restdb.io/rest",
    headers: { 'x-apikey': "60eb09146661365596af552f" },
});

export default {
    getHistory(idUser) {
        return clienteAPI.get(`/transactions?q={"user_id": "${idUser}"}`);
    },
    getTransaccionesById(id) {
        return clienteAPI.get(`/transactions/${id}`);
    },
    newTransaction(buySale) {
        return clienteAPI.post("/transactions", buySale);
    },
    editTransaction(id, transactionModifi) {
        return clienteAPI.patch(`/transactions/${id}`, transactionModifi);
    },
    deleteTransaction(id) {
        return clienteAPI.delete(`/transactions/${id}`);
    },
};
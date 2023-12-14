import axios from "axios";
import store from "@/store";

const clienteAPI = axios.create({
    baseURL: "https://laboratorio3-f36a.restdb.io/rest",
    headers: { 'x-apikey': "60eb09146661365596af552f" },
});

export default {
    getTransactions(idUser) {
        return clienteAPI.get(`/transactions?q={"user_id": "${idUser}"}`);
    },
    getTransactionsById(id) {
        return clienteAPI.get(`/transactions/${id}`);
    },
    newTransaction(buySale) {
        return clienteAPI.post("/transactions", buySale);
    },
    editTransaction(id, transactionModify) {
        return clienteAPI.patch(`/transactions/${id}`, transactionModify)
        .then(response => {
            const updatedTransaction = response.data;
            store.commit("updateTransaction", updatedTransaction);
        });
    },
    deleteTransaction(id) {
        return clienteAPI.delete(`/transactions/${id}`)
        .then(() => {
            store.commit("deleteTransaction", id);
        });
    },
};
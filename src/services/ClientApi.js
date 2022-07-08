import axios from "axios";

const clienteAPI = axios.create({
    baseURL: "https://laboratorio3-f36a.restdb.io/rest",
    headers: { 'x-apikey': "60eb09146661365596af552f" },
});

export default {
    getTransacciones(idUser) {
        return clienteAPI.get(`/transactions?q={"user_id": "${idUser}"}`);
    },
    getTransaccionesById(id) {
        return clienteAPI.get(`/transactions/${id}`);
    },

    newTransaction(newSale) {
        return clienteAPI.post("/transactions", newSale);
    },
    modificarTransaccion(id, transaccionEditada) {
        return clienteAPI.put(`/transactions/${id}`, transaccionEditada);
    },
    eliminarTransaccion(id) {
        return clienteAPI.delete(`/transactions/${id}`);
    },
};
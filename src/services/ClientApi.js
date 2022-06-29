import axios from "axios";

const clienteAPI = axios.create({
    baseURL: "https://laboratorio3-f36a.restdb.io/rest",
    headers: { 'x-apikey': "60eb09146661365596af552f" },
});

export default {
    getTransacciones(idUsuario) {
        return clienteAPI.get(`/transactions?q={"user_id": "${idUsuario}"}`);
    },
    getTransaccionesById(id) {
        return clienteAPI.get(`/transactions/${id}`);
    },

    ingresarNuevaTransaccion(nuevaTransaccion) {
        return clienteAPI.post("/transactions", nuevaTransaccion);
    },
    modificarTransaccion(id, transaccionEditada) {
        return clienteAPI.put(`/transactions/${id}`, transaccionEditada);
    },
    eliminarTransaccion(id) {
        return clienteAPI.delete(`/transactions/${id}`);
    },
};
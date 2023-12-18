<template>
    <div class="body">
        <Navbar/>
        <div class="history">
            <div class="container">
                <div v-if="loading" class="loader"></div>
                <table v-if="!loading">
                    <thead>
                        <tr>
                            <th>CRIPTOMONEDA</th>
                            <th>CANTIDAD</th>
                            <th>PRECIO</th>
                            <th>TIPO DE OPERACION</th>
                            <th>FECHA DE OPERACION</th>
                            <th>EDICION | BORRADO</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr 
                            v-for="transaction in sortedTransactions" 
                            :key="transaction._id" :class="{ selected: selectRow === transaction._id }">
                            <td class="row">{{ nameCriptos(transaction.crypto_code) }}</td>
                            <td class="row">{{ transaction.crypto_amount }}</td>
                            <td class="row"> $ {{ transaction.money }}</td>
                            <td class="row">{{ typeAction(transaction.action) }}</td>
                            <td class="row">{{ time(transaction.datetime) }}</td>
                            <td>
                                <router-link
                                    :to="{
                                        name: 'Modify',
                                        query: {
                                            id: selectRow,
                                        },
                                    }"
                                >
                                    <span class="icon" 
                                    @click="edit(transaction._id)"
                                    >
                                        <ion-icon name="create"></ion-icon>
                                    </span>
                                </router-link>
                                <span class="icon" 
                                @click="deleteRow(transaction._id)"
                                >
                                    <ion-icon name="trash">
                                </ion-icon></span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-if="!loading && sortedTransactions.length === 0">La tabla está vacía.</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import ClientApi from '@/services/ClientApi.js';
import Navbar from "@/components/Navbar.vue";
export default {
    name: "History",
    components: { Navbar },
    data() {
        return {
            selectRow: null,
            loading: false,
        };
    },
    computed:{
        ...mapGetters({
            transactions: "getTransactions",
        }),
        sortedTransactions() {
            return [...this.transactions].sort((a, b) => {
                return new Date(b.datetime) - new Date(a.datetime);
            });
        },
    },
    methods: {
        edit(id){
            if(this.selectRow !== id){
                this.selectRow = id;
                console.log(this.selectRow)
            }else{
                this.selectRow = null;
            }
        },
        deleteRow(id){
            this.loading = true;

            if(confirm("Está seguro que desea eliminar esta transacción?")) {
                ClientApi.deleteTransaction(id)
                .then(() => {
                    this.$toast.info("Eliminado con exito");
                })
                .catch(() => {
                    this.$toast.error("Error al Eliminar la Transacción");
                }).finally(() => {
                    this.loading = false;
                });
            }
        },
        nameCriptos(crypto_code) {
            if (crypto_code == "btc")
                return "Bitcoin";
            if (crypto_code == "eth")
                return "Ethereum";
            if (crypto_code == "usdt")
                return "Theter";
            if (crypto_code == "usdc")
                return "USD Coin";
            if (crypto_code == "dai")
                return "Dai";
        },
        typeAction(action) {
            if (action === "purchase") {
                return "Compra";
            }
            else {
                return "Venta";
            }
        },
        time(datetime) {
            return datetime.slice(0, 10) + " " + datetime.slice(11, 16) + "Hs";
        },
    },
}
</script>

<style scoped>
    .history {
        display: inline-block;
        margin: 0;
        margin-top: 30px;
        padding: 0;
        box-sizing: border-box;
    }
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
        /* box-shadow: inset 8px 8px 8px #cbced1, inset -8px -8px 8px #fff; */
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
    .icon {
        font-size: 1.5em;
        padding: 8px;
        color: rgb(15, 40, 149);
    }
    .icon:hover{
        cursor: pointer;
        text-decoration: underline;
    }
    tbody tr {
        cursor: pointer;
    }
    tbody tr:hover {
        background: rgb(243, 103, 199, 0.4);
    }
    button:hover{
        border: none;
        padding: 15px;
        border-radius: 15px;
        box-shadow: inset 0 0 8px #f9f8fc;
    } 
    #foot{
        position: relative;
        top: 15px;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        border: none;
        padding: 15px;
        border-radius: 15px;
        box-shadow: 0 0 8px #d9d4e7;
        width: 250px;
        height: 65px;
        background-color: #d9d4e7;
        animation-duration: 5s;
    }
    .button-os{
        position: absolute;
        width: 250px;
        height: 65px;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        background-color: #f9f8fc86;
        /* border: 0.5px #0e172c; */
        border-radius: 15px;
        transition: background-color 2.2s;
        transition-duration: 3s;
        transition: 1.5s;
    }
    .button-os:hover{
        position: absolute;
        top: 30px;
        background-color: #fec7d7;
    }
    .button-os a{
        font-size: 20px;
        display: block;
        text-decoration: none;
        color:#0e172c;
        transition: 1.5s;
    }
    .button-os a:hover{
        letter-spacing: 5px;
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
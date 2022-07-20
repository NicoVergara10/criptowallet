<template>
    <div class="body">
        <nav>
            <div class="view">
                <button id="view" @click="(table = true)">VER HISTORIAL</button>
            </div>
            <div class="modife">
                <button @click="(edit = true)">EDITAR TRANSACCION</button>
            </div>
            <div class="delete">
                <button>ELIMINAR TRANSACCION</button>
            </div>
        </nav>
        <div class="container">
            <table v-show="table">
                <thead>
                    <tr>
                        <!-- <th>TRANSACCION</th> -->
                        <th>CRIPTOMONEDA</th>
                        <th>CANTIDAD</th>
                        <th>PRECIO</th>
                        <th>TIPO DE OPERACION</th>
                        <th>FECHA DE OPERACION</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="transaction in transactions" :key="transaction._id">
                        <!-- <td>{{ (transaction._id + 1) }}</td> -->
                        <td>{{ nameCriptos(transaction.crypto_code) }}</td>
                        <td>{{ transaction.crypto_amount }}</td>
                        <td> $ {{ transaction.money }}</td>
                        <td>{{ typeAction(transaction.action) }}</td>
                        <td>{{ time(transaction.datetime) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import ClientApi from '@/services/ClientApi.js';

    export default {
        name: "history",
        data(){
            return {
                countTransaction: 0,
                transactions: [],
                table: false,
                edit:"",
            }
        },
        props:{},
        computed: {},
        methods: {
            insertTransaction(){
                ClientApi.getHistory(state.idUser)
                .then((response) => {
                    state.transactions = response.data;
                }).catch(() => {
                    alert("Error");
                });
            },
            nameCriptos(crypto_code){
                if(crypto_code == "bitcoin") return "Bitcoin";
                if(crypto_code == "ethereum") return "Ethereum";
                if(crypto_code == "theter") return "Theter";
                if(crypto_code == "usdc") return "USD Coin";
                if(crypto_code == "binance") return "Binance USD";
            },
            typeAction(action){
                // if (action === "purchase" ? "COMPRA" : "VENTA");
                if(action === "purchase"){
                    return "Compra";
                }else{
                    return "Venta";
                }
            },
            time(datetime){
                return (datetime.slice(0, 10) + "  " + datetime.slice(12,16) + " Hs");
            },
            editRow(){
                
            },
        },
        mounted() {
            ClientApi.getHistory(this.$store.state.idUser).then((response) => {
                this.transactions = response.data;
                this.countTransaction = this.transactions.length;
            }).catch(() => {this.$toast.error("Error");});
        }
    }
</script>

<style scoped>
    .body {
        display: inline-block;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    nav {
        display: flex;
        flex-direction: center;
        align-items: center;
        justify-content: center;
        margin: 0;

    }
    nav button {
        cursor: pointer;
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
        background: rgba(226, 126, 194, 0.4);
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
</style>
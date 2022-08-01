<template>
    <div class="body">
        <div class="history">
            <div>
                <div class="view">
                    <button id="view" @click="(table = true)">VER HISTORIAL</button>
                </div>
            </div>
            <div class="container">
                <table v-show="table">
                    <thead>
                        <tr>
                            <th>CRIPTOMONEDA</th>
                            <th>CANTIDAD</th>
                            <th>PRECIO</th>
                            <th>TIPO DE OPERACION</th>
                            <th>FECHA DE OPERACION</th>
                            <th>EDICION-BORRADO</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr 
                            v-for="transaction in transactions" 
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
                                        <ion-icon name="create">
                                    </ion-icon></span>
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
            </div>
        </div>
    </div>
</template>

<script>
    import ClientApi from '@/services/ClientApi.js';
    export default {
    name: "history",
    data() {
        return {
            countTransaction: 0,
            transactions: [],
            table: false,
            selectRow: null,
        };
    },
    props: {},
    computed: {},
    methods: {
        edit(id){
            if(this.selectRow !== id){
                this.selectRow = id;
            }else{
                this.selectRow = null;
            }
        },
        deleteRow(id){
            if(this.selectRow !== id){
                this.selectRow = id;
                if(confirm("Está seguro que desea eliminar esta transacción?")) {
                    ClientApi.deleteTransaction(this.selectRow)
                    .then(() => {
                        this.$toast.info("Eliminado con exito");
                        // this.$router.push("/history");
                    })
                    .catch(() => {
                        this.$toast.error("Error al Eliminar la Transacción");
                    }).finally(() => {
                        this.loading = true;
                    });
                }
            }else{
                this.selectRow = null;
            } 
        },
        insertTransaction() {
            ClientApi.getHistory(this.$store.state.idUser)
                .then((response) => {
                state.transactions = response.data;
            }).catch(() => {
                this.$toast.error("Error");
            });
        },
        nameCriptos(crypto_code) {
            if (crypto_code == "bitcoin")
                return "Bitcoin";
            if (crypto_code == "ethereum")
                return "Ethereum";
            if (crypto_code == "theter")
                return "Theter";
            if (crypto_code == "usdc")
                return "USD Coin";
            if (crypto_code == "binance")
                return "Binance USD";
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
    mounted() {
        ClientApi.getHistory(this.$store.state.idUser)
        .then((response) => {
            this.transactions = response.data;
            this.countTransaction = this.transactions.length;
        }).catch(() => { 
            this.$toast.error("Error");
        });
    },
}
</script>

<style scoped>
    .history {
        display: inline-block;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    div {
        display: flex;
        flex-direction: center;
        align-items: center;
        justify-content: center;
        margin: 0;

    }
    div button {
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
    .icon {
        font-size: 1.5em;
        padding: 8px;
        color: rgb(15, 40, 149);
    }
    .icon:hover{
        cursor: pointer;
        text-decoration: underline;
    }
    /* tbody tr {
        cursor: pointer;
    } */
    tbody tr:hover {
        background: rgb(243, 103, 199, 0.4);
    }
    .vertical{
        writing-mode: vertical-lr;
    }
</style>
<template>
    <div class="body">
        <nav>
            <div class="view">
                <button id="view" @click="viewHistory">VER HISTORIAL</button>
            </div>
            <div class="modife">
                <button>EDITAR TRANSACCION</button>
            </div>
            <div class="delete">
                <button>ELIMINAR TRANSACCION</button>
            </div>
        </nav>
        <div class="container">
            <table>
                <thead>
                    <tr>
                        <th>TRANSACCION</th>
                        <th>CRIPTOMONEDA</th>
                        <th>CANTIDAD</th>
                        <th>PRECIO</th>
                        <th>TIPO DE OPERACION</th>
                        <th>FECHA DE OPERACION</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="transaction in transactions" :key="transaction.id">
                        <td>{{ (this.transaction[0] + 1) }}</td>
                        <td>{{ transaction.cripto_code }}</td>
                        <td>{{ transaction.cripto_amount }}</td>
                        <td>{{ transaction.action }}</td>
                        <td>{{ transaction.datetime }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import ClientApi from '@/services/ClientApi.js';
    export default {
        name: history,
        data(){
            return {
                idUser: "",
                transactions: [],
            }
        },
        methods: {
            
        }
    }
</script>

<style scoped>
    .body {
        display: inline-block;
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
    /* .container {
        border: solid 1px rgb(255, 255, 255, 0.2);
    } */
    table {
        display: flex;
        flex-direction: center;
        align-items: center;
        justify-content: center;
        color: rgb(21, 4, 4);
        font-size: 14px;
        table-layout: fixed;
        border-collapse: collapse;
    }
    thead {
        background: rgb(243, 140, 210, 0.4);
    }
    th {
        padding: 20px 15px;
        font-weight: 700;
        text-transform: uppercase;
    }
    td {
        padding: 15px;
        border-bottom: solid 1px rgb(255, 255, 255, 0.2);
    }
    tbody tr {
        cursor: pointer;
    }
    tbody tr:hover {
        background: rgb(243, 103, 199, 0.4);
    }

</style>
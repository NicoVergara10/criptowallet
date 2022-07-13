<template>
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
                    <td>{{ transaction.id }}</td>
                    <td>{{ transaction.cripto_code }}</td>
                    <td>{{ transaction.cripto_amount }}</td>
                    <td>{{ transaction.action }}</td>
                    <td>{{ transaction.datetime }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import ClientApi from '@/services/ClientApi.js';

    export default {
        name: history,
        data(){
            return {
               transactions: [],
            }
        }
    }
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .container {
        border: solid 1px rgb(255, 255, 255, 0.2);
    }
    table {
        color: #fff;
        font-size: 14px;
        table-layout: fixed;
        border-collapse: collapse;
    }
    thead {
        background: rgb(243, 140, 210, 0.4);
    }
    th {
        padding: 20px 15 px;
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
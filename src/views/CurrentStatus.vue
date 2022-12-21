<template>
    <div class="body">
        <div class="container">
            <table>
                <thead>
                    <tr>
                        <th>CRIPTOMONEDA</th>
                        <th>CANTIDAD</th>
                        <th>DINERO</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="coin in wallet" :key="coin._id">
                        <td>{{ nameCriptos(coin.crypto_code) }}</td>
                        <td>{{ coin.crypto_amount }}</td>
                        <td>{{ coin.money }}</td>
                    </tr>
                    <tr>
                        <td>MONTO TOTAL</td>
                        <td></td>
                        <td>{{totalActual}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        name: 'CurrentStatus',
        data(){
            return {};
        },
        computed:{
            ...mapGetters({
                wallet: "getCurrentStatus",
            }),
            totalActual(){
                let suma = 0;
                suma = suma + this.wallet.money;
            },
        },
        methods:{
            nameCriptos(crypto_code) {
                if (crypto_code == "btc")
                    return "Bitcoin";
                if (crypto_code == "eth")
                    return "Ethereum";
                if (crypto_code == "usdt")
                    return "Theter";
                if (crypto_code == "usdc")
                    return "USDCoin";
                if (crypto_code == "dai")
                    return "Dai";
            },
        },
    }
</script>

<style>
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
    tbody tr {
        cursor: pointer;
    }
    tbody tr:hover {
        background: rgb(243, 103, 199, 0.4);
    }
</style>
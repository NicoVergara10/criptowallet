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
                    <tr v-for="data in currentData" :key="data._id">
                        <td>{{ nameCriptos(data.crypto_code) }}</td>
                        <td>{{ data.crypto_amount }}</td>
                        <td>{{ priceNow }}</td>
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
    import ClientApi from '@/services/ClientApi';
    import CryptoApi from '@/services/CryptoApi';
    export default {
        name: 'CurrentStatus',
        data(){
            return {
                transactions: null,
                totalMoney: 0,
                // priceNow:{btc: null, eth: null, usdt: null, usdc: null, dai: null},
                bitcoin:[],
                ethereum:[],
                theter:[],
                uSDCoin:[],
                dai:[],
                currentData:[]
            };
        },
        computed:{
            totalActual() {
                let suma = 0;
                this.currentData.forEach((data) => {
                    suma += data.priceNow * data.crypto_amount;
                });
                return suma;
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
            typeAction(action) {
                if (action === "purchase") {
                    return "Compra";
                }
                else {
                    return "Venta";
                }
            },
        },
        mounted() {
            ClientApi.getHistory(this.$store.state.idUser)
            .then((response) => {
                this.transactions = response.data;
                bitCount= 0,
                ethCount= 0,
                theCount= 0,
                uSDCount= 0,
                daiCount= 0,
                this.transactions.forEach((transaction) => {
                    if(transaction.action === "purchase"){
                        if(transaction.crypto_code === "btc"){
                            this.bitCount += parseFloat(transaction.crypto_amount);
                        }
                        if(transaction.crypto_code === "eth"){
                            this.ethCount += parseFloat(transaction.crypto_amount);
                        }
                        if(transaction.crypto_code === "usdt"){
                            this.theCount += parseFloat(transaction.crypto_amount);
                        }
                        if(transaction.crypto_code === "usdc"){
                            this.uSDCount += parseFloat(transaction.crypto_amount);
                        }
                        if(transaction.crypto_code === "dai"){
                            this.daiCount += parseFloat(transaction.crypto_amount);
                        }
                    }
                    if(transaction.action === "sale"){
                        if(transaction.crypto_code === "btc"){
                            this.bitCount -= parseFloat(transaction.crypto_amount);
                        }
                        if(transaction.crypto_code === "eth"){
                            this.ethCount -= parseFloat(transaction.crypto_amount);
                        }
                        if(transaction.crypto_code === "usdt"){
                            this.theCount -= parseFloat(transaction.crypto_amount);
                        }
                        if(transaction.crypto_code === "usdc"){
                            this.uSDCount -= parseFloat(transaction.crypto_amount);
                        }
                        if(transaction.crypto_code === "dai"){
                            this.daiCount -= parseFloat(transaction.crypto_amount);
                        }
                    }
                });
                if(this.bitCount > 0){
                    CryptoApi.getPriceMoney("btc")
                    .then((response) => {
                        this.bitcoin = {
                            crypto_code: btc,
                            crypto_amount: this.bitCount,
                            priceNow: response.data.totalBid,
                        }
                        this.currentData.push(this.bitcoin);
                        this.totalMoney += parseFloat(
                            this.bitCount * this.bitcoin.priceNow
                        );
                    }).catch(() => { 
                        this.$toast.error("Error al cargar los datos");
                    });
                }
                if(this.ethCount > 0){
                    CryptoApi.getPriceMoney("eth")
                    .then((response) => {
                        this.ethereum = {
                            crypto_code: eth,
                            crypto_amount: this.ethCount,
                            priceNow: response.data.totalBid,
                        }
                        this.currentData.push(this.ethereum);
                        this.totalMoney += parseFloat(
                            this.ethCount * this.ethereum.priceNow
                        );
                    }).catch(() => { 
                        this.$toast.error("Error al cargar los datos");
                    });
                }
                if(this.theCount > 0){
                    CryptoApi.getPriceMoney("usdt")
                    .then((response) => {
                        this.theter = {
                            crypto_code: eth,
                            crypto_amount: this.theCount,
                            priceNow: response.data.totalBid,
                        }
                        this.currentData.push(this.theter);
                        this.totalMoney += parseFloat(
                            this.theCount * this.theter.actualPrice
                        );
                    }).catch(() => { 
                        this.$toast.error("Error al cargar los datos");
                    });
                }
                if(this.uSDCount > 0){
                    CryptoApi.getPriceMoney("usdc")
                    .then((response) => {
                        this.uSDCoin = {
                            crypto_code: eth,
                            crypto_amount: this.uSDCount,
                            priceNow: response.data.totalBid,
                        }
                        this.currentData.push(this.uSDCoin);
                        this.totalMoney += parseFloat(
                            this.uSDCount * this.uSDCoin.actualPrice
                        );
                    }).catch(() => { 
                        this.$toast.error("Error al cargar los datos");
                    });
                }
                if(this.daiCount > 0){
                    CryptoApi.getPriceMoney("dai")
                    .then((response) => {
                        this.dai = {
                            crypto_code: eth,
                            crypto_amount: this.daiCount,
                            priceNow: response.data.totalBid,
                        }
                        this.currentData.push(this.dai);
                        this.totalMoney += parseFloat(
                            this.daiCount * this.dai.actualPrice
                        );
                    }).catch(() => { 
                        this.$toast.error("Error al cargar los datos");
                    });
                }
            }).catch(() => { 
                this.$toast.error("Error");
            });
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
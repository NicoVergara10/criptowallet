<template>
    <div class="purchase">
        <form action="#" method="post">
            <div class="criptos">
                <div class="select">
                    <select id="standard-select" v-model="buySale.crypto_code"  @change="getAgencies(buySale.crypto_code)">
                        <option value="" disabled selected hidden>CRIPTOMONEDA</option>
                        <option value="btc">BITCOIN</option>
                        <option value="eth">ETHEREUM</option>
                        <option value="usdt">THETER</option>
                        <option value="usdc">USD COIN</option>
                        <option value="dai">DAI</option>
                    </select>
                    <i></i>
                </div>
                <div class="select">
                    <select
                    id="standard-select"
                    v-model="selectedAgency"
                    @change="enableAmount()"
                    :disabled="selectAgenciesDisabled"
                    >
                        <option value="" disabled selected hidden>Select agency</option>
                        <option v-for="agency in agencies" :key="agency.agency" :value="agency">
                            {{ agency.agency.toUpperCase() + " - Purchase price: " + agency.values.totalAsk }}
                        </option>
                    </select>
                    <i></i>
                </div>
            </div>
            <div class="cantCompra">
                <input type="number" id="cantBuy" name="cantBuy" v-model="buySale.crypto_amount" placeholder="CANTIDAD A COMPRAR" required :disabled="setAmountDisabled"
                @input="calculateAmount()">
            </div>
            <div class="pagoCompra">
                <input type="number" id="amount" name="amount" v-model="buySale.money" placeholder="IMPORTE $" required disabled>
            </div>
            <button class="btn" type="submit" @click.prevent="buyCripto">COMPRAR</button>
        </form>
    </div>
</template>

<script>
    import ClientApi  from "@/services/ClientApi.js";
    import CryptoApi from "@/services/CryptoApi";
    export default {
        name: "FormPurchase",
        data() {
            return {
                buySale: {
                    user_id: this.$store.state.idUser,
                    action: "purchase",
                    crypto_code: "",
                    crypto_amount: "",
                    money: "",
                    datetime: "",
                },
                selectedAgency: "",
                agencies: [],
                selectAgenciesDisabled: true,
                setAmountDisabled: true,
            };
        },
        methods: {
            buyCripto() {
                if(this.buySale.crypto_amount === "") {
                    this.$toast.error("Ingrese la cantidad a comprar");
                }else if(!parseFloat(this.buySale.crypto_amount)) {
                    this.$toast.error("Debe ingresar un valor numérico");
                }else if(parseFloat(this.buySale.crypto_amount) <= 0) {
                    this.$toast.error("La cantidad a ingresar debe ser mayor a 0");
                }else if(this.buySale.money === "") {
                    this.$toast.error("Ingrese el valor de la comprar");
                }else if(!parseFloat(this.buySale.money)){
                    this.$toast.error("Debe ingresar un valor numérico");
                }else if(parseFloat(this.buySale.money) <= 0) {
                    this.$toast.error("El monto a ingresar debe ser mayor a 0");
                }else if(this.buySale.crypto_code === "") {
                    this.$toast.error("Debe seleccionar una criptomoneda");
                }else {
                    this.buySale.datetime.now = new Date();
                    ClientApi.newTransaction(this.buySale)
                    .then(() => {
                        this.$toast.info("Compra realizada con Éxito");
                        this.$store.commit("insertTransactions");
                    })
                    .catch(() => {this.$toast.error("Error al realizar la Compra");});
                }
            },
            getAgencies(crypto) {
                CryptoApi.getAgenciesInformation(crypto)
                .then((res) => {
                this.agencies = Object.keys(res.data).map((agency, index) => {
                    return { agency: agency, values: Object.values(res.data)[index] };
                });
                this.selectAgenciesDisabled = false;
                })
                .catch();
            },
            enableAmount() {
                this.setAmountDisabled = false;
            },
            calculateAmount() {
                this.buySale.money = (
                    this.buySale.crypto_amount * this.selectedAgency.values.totalAsk
                ).toFixed(2);
            },
        },
    }
</script>

<style scoped>
    .select select {
        appearance: none;
	    -webkit-appearance: none;
	    -moz-appearance: none;
    }
    .select select::-ms-expand {
        display: none;
    }
    .select {
        width: 100%;
	    position: relative;
    }
    .select select {
        display: inline-block;
        width: 100%;
        cursor: pointer;
        padding: 7px 10px;
        padding-left: 20px;
        margin-bottom: 25px;
        height: 42px;
        outline: 0; 
        border: 0;
        border-radius: 0;
        background: #f0f0f0;
        color: #7b7b7b;
        font-size: 1em;
        color: #999;
        font-family: 
        'Quicksand', sans-serif;
        border:2px solid rgba(0,0,0,0.2);
        border-radius: 12px;
        transition: all 0.25s ease;
    }
    .select select:hover {
	    background: #B1E8CD;
    }
    .select i{
        position: absolute;
        right: 20px;
        top: calc(50% - 26px);
        width: 16px;
        height: 16px;
        display: block;
        border-left:4px solid #2AC176;
        border-bottom:4px solid #2AC176;
        transform: rotate(-45deg);
        transition: all 0.25s ease;
    }
    .select:hover i{
        margin-top: 3px;
    }
    .purchase input {
        width: 100%;
        display: block;
        border: none;
        outline: none;
        background: none;
        font-size: 1.2rem;
        color: #666;
        padding: 10px 15px 15px 10px;
        padding-left: 20px;
        margin-bottom: 25px;
        border-radius: 15px;
        box-shadow: inset 8px 8px 8px #cbced1, inset -8px -8px 8px #fff;
    }
    .btn {
        box-shadow: none;
        width: 100%;
        height: 40px;
        background-color: #0a70a0;
        color: #fff;
        border-radius: 25px;
        box-shadow: 3px 3px 3px #b1b1b1,
            -3px -3px 3px #fff;
        letter-spacing: 1.3px;
        cursor: pointer;
        transition: background 0.3s ease-in-out;
    }
</style>
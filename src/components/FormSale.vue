<template>
    <div class="sale">
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
                        <option value="" disabled selected hidden>SELECCIONAR AGENCIA</option>
                        <option v-for="agency in agencies" :key="agency.agency" :value="agency">
                            {{ agency.agency.toUpperCase() + " - Precio: " + agency.values.totalBid }}
                        </option>
                    </select>
                    <i></i>
                </div>
            </div>
            <div class="cantVenta">
                <input type="number" min="0" id="cantSale" name="cantBuy" v-model="buySale.crypto_amount" placeholder="CANTIDAD A VENDER" required :disabled="setAmountDisabled"
                @input="calculateAmount()">
            </div>
            <div class="pagoVenta">
                <input type="number" id="amount" name="amount" v-model="buySale.money" placeholder="IMPORTE $" required disabled>
            </div>
            <button class="btn" type="submit" @click.prevent="saleCripto">
                <span v-if="!loading">VENDER</span>
                <div v-if="loading" class="loader"></div>
            </button>
        </form>
    </div>
</template>

<script>
    import ClientApi  from "@/services/ClientApi";
    import CryptoApi from "@/services/CryptoApi";
    import { mapGetters } from "vuex";

    export default {
        name: "FormSale",
        data() {
            return {
                loading: false,
                buySale: {
                    user_id: this.$store.state.idUser,
                    action: "sale",
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
        computed:{
            ...mapGetters({
                wallet: "getCurrentStatus",
            }),
        },
        methods: {
            saleCripto(){
                this.loading = true;

                if(this.buySale.crypto_amount === "") {
                    this.$toast.error("Ingrese la cantidad a vender");
                }else if(!parseFloat(this.buySale.crypto_amount)) {
                    this.$toast.error("Debe ingresar un valor numérico");
                }else if(parseFloat(this.buySale.crypto_amount) <= 0) {
                    this.$toast.error("La cantidad a ingresar debe ser mayor a 0");
                }else if(this.buySale.money === "") {
                    this.$toast.error("El campo no debe estar vacío");
                }else if(!parseFloat(this.buySale.money)){
                    this.$toast.error("Debe ingresar un valor numérico");
                }else if(parseFloat(this.buySale.money) <= 0) {
                    this.$toast.error("El monto a ingresar debe ser mayor a 0");
                }else if(this.buySale.crypto_code === "") {
                    this.$toast.error("Debe seleccionar una criptomoneda");
                }else {
                    const cryptoAmountToSell = this.buySale.crypto_code;
                    const userCryptoBalance = this.getAmountInWallet(cryptoAmountToSell);

                    if (parseFloat(this.buySale.crypto_amount) <= userCryptoBalance) {
                        this.buySale.datetime = new Date();
                        this.buySale.datetime.setHours(this.buySale.datetime.getHours()-3);
                        ClientApi.newTransaction(this.buySale)
                        .then(() => {
                            this.$toast.info("Venta realizada con Éxito");
                            this.$store.commit("insertTransaction");
                            this.buySale.crypto_code = "";
                            this.buySale.crypto_amount = "";
                            this.buySale.money = "";
                            this.selectedAgency = "";
                        })
                        .catch(() => {this.$toast.error("Error al realizar la Venta");
                        })
                        .finally(() => {this.loading = false;
                        });
                    }else{
                        this.$toast.error("No tienes suficientes criptomonedas para realizar esta venta");
                    }
                }
            },
            getAmountInWallet(crypto_code){
                const inWallet = this.wallet.find((entry) => entry.crypto_code === crypto_code);
                return inWallet ? parseFloat(inWallet.crypto_amount) : 0;
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
                    this.buySale.crypto_amount * this.selectedAgency.values.totalBid
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
    .sale input{
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
    .loader {
        border: 4px solid rgba(0, 0, 0, 0.1);
        border-top: 4px solid #3498db;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        animation: spin 1s linear infinite;
        margin: 0 5px;
        display: inline-block;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>
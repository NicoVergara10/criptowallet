<template>
    <div class="purchase">
        <form action="#" method="post">
            <div class="criptos">
                <div class="select">
                    <select id="standard-select" v-model="buySale.crypto_code">
                        <option value="cript0"></option>
                        <option value="cript1">BITCOIN</option>
                        <option value="cript2">ETHEREUM</option>
                        <option value="cript3">THETER</option>
                        <option value="cript4">USD COIN</option>
                        <option value="cript5">BINANCE USD</option>
                    </select>
                </div>
            </div>
            <div class="cantCompra">
                <input type="number" id="cantBuy" name="cantBuy" v-model="buySale.crypto_amount" placeholder="CANTIDAD A COMPRAR" required>
            </div>
            <div class="pagoCompra">
                <input type="number" id="amount" name="amount" v-model="buySale.money" placeholder="IMPORTE $" required>
            </div>
            <div class="fechaCompra">
                <input type="datetime-local" id="timeHour" name="timeHour" v-model="buySale.datetime" required>
            </div>
            <button class="btn" type="button" @click="buyCripto">COMPRAR</button>
        </form>
    </div>
</template>

<script>
    import ClientApi  from "@/services/ClientApi";
    export default {
        name: "FormPurchase",
        data() {
            return {
                buySale: {
                    user_id: this.$store.state.idUser,
                    action: "purchase",
                    crypto_code: "cript0",
                    crypto_amount: "",
                    money: "",
                    datetime: "",
                },
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
                }else if(this.buySale.datetime === "") {
                    this.$toast.error("Debe ingresar la fecha y la hora de la compra");
                }else {
                    ClientApi.newTransaction(this.buySale)
                    .then(() => {this.$toast.info("Compra realizada con Éxito");})
                    .catch(() => {this.$toast.error("Error al realizar la Compra");});
                }
            }
        },
        created() {},
        computed: {},
    }
</script>

<style scoped>
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
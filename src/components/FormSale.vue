<template>
    <div class="body">
        <form action="#" method="post">
            <div class="criptos">
                <label for="standard-select">VENTA CRIPTOMONEDAS</label>
                <div class="select">
                    <select id="standard-select" v-model="newSale.crypto_code" required>
                        <option value="cript0"></option>
                        <option value="cript1">BITCOIN</option>
                        <option value="cript2">ETHEREUM</option>
                        <option value="cript3">THETER</option>
                        <option value="cript4">USD COIN</option>
                        <option value="cript5">BINANCE USD</option>
                    </select>
                </div>
            </div>
            <div class="cantVenta">
                <input type="number" id="cantSale" name="cantBuy" v-model="newSale.crypto_amount" placeholder="CANTIDAD A VENDER" required>
            </div>
            <div class="pagoVenta">
                <input type="number" id="amount" name="amount" v-model="newSale.money" placeholder="IMPORTE $" required>
            </div>
            <div class="fechaVenta">
                <input type="datetime-local" id="timeHour" name="timeHour" v-model="newSale.datetime" required>
            </div>
            <button class="btn" type="button" @click="saleCripto">VENDER</button>
        </form>
    </div>
</template>

<script>
    import ClientApi  from "@/services/ClientApi";
    export default {
        name: "FormSale",
        data() {
            return {
                newSale: {
                    user_id: this.$store.state.idUser,
                    action: "buy",
                    crypto_code: "cript0",
                    crypto_amount: "",
                    money: "",
                    datetime: ""
                },
            };
        },
        methods: {
            saleCripto(){
                if(this.newSale.crypto_amount.trim() === "") {
                    this.$toast.error("El campo no debe estar vacío");
                }else if(!parseFloat(this.newSale.crypto_amount)) {
                    this.$toast.error("Debe ingresar un valor numérico");
                }else if(parseFloat(this.newSale.crypto_amount) <= 0) {
                    this.$toast.error("La cantidad a ingresar debe ser mayor a 0");
                }else if(this.newSale.money.trim() === "") {
                    this.$toast.error("El campo no debe estar vacío");
                }else if(!parseFloat(this.newSale.money)){
                    this.$toast.error("Debe ingresar un valor numérico");
                }else if(parseFloat(this.newSale.money) <= 0) {
                    this.$toast.error("El monto a ingresar debe ser mayor a 0");
                }else if(this.newSale.datetime.trim() === "") {
                    this.$toast.error("El campo no debe estar vacío");
                }else {
                    ClientApi.newTransaction(this.newSale)
                    .then(() => {this.$toast.info("Venta realizada con Éxito");})
                    .catch(() => {this.$toast.error("Error al realizar la Venta");});
                }
            }
        },
    }
</script>

<style>

</style>
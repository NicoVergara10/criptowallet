<template>
    <div class="body">
        <form action="#" method="post">
            <div class="criptos">
                <label for="standard-select">VENTA CRIPTOMONEDAS</label>
                <div class="select">
                    <select id="standard-select">
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
                <input type="number" id="cantSale" name="cantBuy" placeholder="CANTIDAD A VENDER" required>
            </div>
            <div class="fechaVenta">
                <input type="datetime-local" id="timeHour" name="timeHour" required>
            </div>
            <div class="pagoVenta">
                <input type="number" id="amount" name="amount" placeholder="IMPORTE $" required>
            </div>
            <button class="btn" type="button">VENDER</button>
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
            
        }
    }
</script>

<style>

</style>
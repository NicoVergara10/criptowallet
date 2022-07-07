<template>
    <div class="body">
        <form action="#" method="post">
            <div class="criptos">
                <label for="standard-select">VENTA CRIPTOMONEDAS</label>
                <div class="select">
                    <select id="standard-select">
                        <option value="Option 0"></option>
                        <option value="Option 1">BITCOIN</option>
                        <option value="Option 2">ETHEREUM</option>
                        <option value="Option 3">THETER</option>
                        <option value="Option 4">USD COIN</option>
                        <option value="Option 5">BINANCE USD</option>
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
        </form>
    </div>
</template>

<script>

</script>

<style>

</style>
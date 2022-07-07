<template>
    <div class="body">
        <form action="#" method="post">
            <div class="criptos">
                <label for="standard-select">COMPRA CRIPTOMONEDAS</label>
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
            <div class="cantCompra">
                <input type="number" id="cantBuy" name="cantBuy" placeholder="CANTIDAD A COMPRAR" required>
            </div>
            <div class="fechaCompra">
                <input type="datetime-local" id="timeHour" name="timeHour" required>
            </div>
            <div class="pagoCompra">
                <input type="number" id="amount" name="amount" placeholder="IMPORTE $" required>
            </div>
        </form>
    </div>
</template>

<script>

</script>

<style>
    
</style>
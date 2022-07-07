<template>
    <div class="body">
        <form action="#" method="post">
            <div class="criptos">
                <label for="standard-select">COMPRA CRIPTOMONEDAS</label>
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
            <div class="cantCompra">
                <input type="number" id="cantBuy" name="cantBuy" placeholder="CANTIDAD A COMPRAR" required>
            </div>
            <div class="fechaCompra">
                <input type="datetime-local" id="timeHour" name="timeHour" required>
            </div>
            <div class="pagoCompra">
                <input type="number" id="amount" name="amount" placeholder="IMPORTE $" required>
            </div>
            <button class="btn" type="button" >COPRAR</button>
        </form>
    </div>
</template>

<script>

</script>

<style>
    
</style>
<template>
    <div class="body">
        <div class="new">
            <form action="#" method="post">
                <div class="criptos">
                    <div class="select">
                        <select id="standard-select" v-model="transactionModify.crypto_code">
                            <option value="">CRIPTOMONEDA</option>
                            <option value="bitcoin">BITCOIN</option>
                            <option value="ethereum">ETHEREUM</option>
                            <option value="theter">THETER</option>
                            <option value="usdc">USD COIN</option>
                            <option value="binance">BINANCE USD</option>
                        </select>
                        <i></i>
                    </div>
                </div>
                <div class="cantModi">
                    <input type="number" id="cantModi" name="cantModi" v-model="transactionModify.crypto_amount" placeholder="CANTIDAD A MODIFICAR" required>
                </div>
                <div class="pagoModi">
                    <input type="number" id="amount" name="amount" v-model="transactionModify.money" placeholder="IMPORTE $" required>
                </div>
                <div class="fechaModi">
                    <input type="datetime-local" id="timeHour" name="timeHour" v-model="transactionModify.datetime" required>
                </div>
                <div class="select">
                    <select id="standard-select" v-model="transactionModify.action">
                        <option value="">TRANSACCION</option>
                        <option value="purchase">COMPRAR</option>
                        <option value="sale">VENDER</option>
                    </select>
                    <i></i>
                </div>
                <button class="btn" type="submit" @click.prevent="edit">GUARDAR</button>
                <button class="btn" type="submit" @click.prevent="cancel">CANCELAR</button>
            </form>
        </div>
    </div>
</template>

<script>
    import ClientApi from "@/services/ClientApi.js";
    export default {
        name:"Modify",
        // props:{
        //     id: {
        //         required: true,
        //         type: String,
        //     }
        // },
        data(){
            return {
                transactionModify:{
                    user_id: this.$store.state.idUser,
                    action: "",
                    crypto_code: "",
                    crypto_amount: "",
                    money: "",
                    datetime: "",
                },
            }
        },
        computed:{
            id(){
                return this.$route.query.id;
            }
        },
        mounted(){
            ClientApi.getTransactionsById(this.id)
            .then((response) => {
            this.transactionModify = response.data;
            }).catch(() => {
                this.$toast.error("Error");
            });
        },
        methods:{
            edit(){
                if(this.transactionModify.crypto_amount === "") {
                    this.$toast.error("Ingrese una cantidad");
                }else if(!parseFloat(this.transactionModify.crypto_amount)) {
                    this.$toast.error("Debe ingresar un valor numérico");
                }else if(parseFloat(this.transactionModify.crypto_amount) <= 0) {
                    this.$toast.error("La cantidad a ingresar debe ser mayor a 0");
                }else if(this.transactionModify.money === "") {
                    this.$toast.error("Ingrese un valor númerico");
                }else if(!parseFloat(this.transactionModify.money)){
                    this.$toast.error("Debe ingresar un valor numérico");
                }else if(parseFloat(this.transactionModify.money) <= 0) {
                    this.$toast.error("El monto a ingresar debe ser mayor a 0");
                }else if(this.transactionModify.datetime === "") {
                    this.$toast.error("Debe ingresar la fecha y la hora");
                }else if(this.transactionModify.crypto_code === "") {
                    this.$toast.error("Debe seleccionar una criptomoneda");
                }else {
                    ClientApi.editTransaction(this.id, this.transactionModify)
                    .then(() => {
                        this.$toast.info("Editado correctamente");
                        this.$router.push("/history");
                    })
                    .catch(() => {
                        this.$toast.error("Error al Editar Transacción");
                    });
                }
            },
            cancel(){
                this.$router.push("/history");
            }
        },
    }
</script>

<style>
    .new {
        max-width: 350px;
        min-height: 500px;
        margin: 20px 20px;
        padding: 40px 30px 30px 30px;
        background-color: #ecf0f3d8;
        border-radius: 15px;
        /* box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #fff; */
        background: #ecf0f3d8;
    }
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
    input {
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
        margin: 5px;
    }
</style>
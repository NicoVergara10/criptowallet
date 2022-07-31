<template>
    <div class="body">
        <div class="commerce">
            <div class="btnP">
                <h2>COMPRAR CRIPTOS</h2>
                <div class="form"> 
                    <FormPurchase />
                </div>
            </div>
            <div class="btnS">
                <h2>VENDER CRIPTOS</h2>
                <div class="fom">
                    <FormSale />
                </div>
            </div>
        </div>
        <button @click="history()">historial</button>
    </div>
</template>

<script>
    import FormPurchase from "@/components/FormPurchase.vue";
    import FormSale from "@/components/FormSale.vue";

    export default {
        name: "Transactions",
        components: { FormPurchase, FormSale },
        data() {
            return {};
        },
        methods: {
            history: function() {
                this.$router.push("/history");
            },
        },
    };
</script>

<style>
    .commerce {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .btnP, .btnS {
        max-width: 350px;
        min-height: 500px;
        margin: 20px 20px;
        padding: 40px 30px 30px 30px;
        background-color: #ecf0f3d8;
        border-radius: 15px;
        /* box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #fff; */
        background: #ecf0f3d8;
    }
</style>
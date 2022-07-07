<template>
    <div class="body">
        <div class="purchase">
            <FormPurchase />
        </div>
        <div class="sale">
            <FormSale />
        </div>
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
    }
</script>

<style>
    
</style>
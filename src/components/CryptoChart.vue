<template>
  <div class="chart-container">
    <line-chart :data="chartData" :options="chartOptions"></line-chart>
  </div>
</template>

<script>
import { Line } from 'vue-chartjs';

export default {
  name: 'CryptoChart',
  extends: Line,
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    chartOptions: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.renderChart(this.chartData, this.chartOptions);
  },
};
</script>

<style scoped>
.chart-container {
  margin-top: 20px;
}
</style>

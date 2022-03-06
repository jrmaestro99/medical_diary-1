<template>
  <Chart/>
</template>

<script>
    import Chart from "@/components/Chart.vue";

    export default {
        name: 'HealthStatus',
        components: {
            Chart
        }
    }
</script>

<style>
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
</style>
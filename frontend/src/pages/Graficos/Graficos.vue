<template>
  <div class="charts-overview">
    <ol class="breadcrumb">
      <li class="breadcrumb-item active">Gráficos</li>
    </ol>
    <h1 class="page-title">
      Nuestros -
      <span class="fw-semi-bold">Gráficos</span>
    </h1>
    <div>
      <b-row>
        <b-col xs="12" lg="6">
          <Widget
            title="<h5>Cantidad de Personajes <span class='fw-semi-bold'>vs Estado (Chart.Js)</span></h5>"
            close
            collapse
            customHeader
          >
            <LineChart></LineChart>
          </Widget>
        </b-col>
        <b-col xs="12" lg="6">
          <Widget
            title="<h5>Cantidad de Personajes Favoritos <span class='fw-semi-bold'>vs Estado (Chart.js)</span></h5>"
            close
            collapse
            customHeader
          >
            <LineChartFav></LineChartFav>
          </Widget>
        </b-col>
        <b-col xs="12" lg="12">
          <Widget
            title="<h5>Cantidad de Personajes <span class='fw-semi-bold'>vs Episodio (Chart.js)</span></h5>"
            close
            collapse
            customHeader
          >
            <LineChartepisode></LineChartepisode>
          </Widget>
        </b-col>
        <b-col xs="12" lg="12">
          <Widget
            title="<h5>Cantidad de Personajes <span class='fw-semi-bold'>Favoritos vs Episodio (Chart.js)</span></h5>"
            close
            collapse
            customHeader
          >
            <LineChartepisodefav></LineChartepisodefav>
          </Widget>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import Widget from "@/components/Widget/Widget";
import { chartData, liveChart, liveChartInterval } from "./mock";

import ECharts from "vue-echarts/components/ECharts";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/line";
import "echarts/lib/chart/themeRiver";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";

import Highcharts from "highcharts";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";

exporting(Highcharts);
exportData(Highcharts);

import { Chart } from "highcharts-vue";
import Sparklines from "../../components/Sparklines/Sparklines";
import LineChart from "../../components/chartjs/LineChart";
import LineChartFav from "../../components/chartjsfav/LineChartFav";
import LineChartepisode from "../../components/chartjsepisode/LineChartepisode";
import LineChartepisodefav from "../../components/chartjsepisodefav/LineChartepisodefav";



export default {
  name: "Charts",
  components: {
    Widget,
    echart: ECharts,
    highcharts: Chart,
    Sparklines,
    LineChart,
    LineChartFav,
    LineChartepisode,
    LineChartepisodefav
  },
  props: ["chartdata", "options"],
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  data() {
    return {
      cd: chartData,
      ld: liveChart,
      initEchartsOptions: {
        renderer: "canvas"
      },
      sparklineData: {
        series: [{ data: [1, 7, 3, 5, 7, 8] }],
        options1: {
          colors: ["#ffc247"],
          plotOptions: {
            bar: {
              columnWidth: "50%"
            }
          }
        },
        options2: {
          colors: ["#ffc0d9"],
          plotOptions: {
            bar: {
              columnWidth: "50%"
            }
          }
        }
      }
    };
  },
  beforeDestroy() {
    clearInterval(liveChartInterval);
  }
};
</script>
<style src="./Graficos.scss" lang="scss" scoped />

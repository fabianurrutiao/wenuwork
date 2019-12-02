<script>
import { Bar } from "vue-chartjs";
import RickService from "../../services/rick.service";

export default {
  extends: Bar,
  data: () => ({
    chartdata: {
      labels: [],
      datasets: [
        {
          label: "Cantidad de Personajes",
          backgroundColor: "#547fff",
          data: []
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  }),
  mounted() {
    this.getAllEpisodes();
  },
  methods: {
    getAllEpisodes() {
      RickService.getAllEpisodes("1").then(result => {
        result.results.forEach(element => {
          this.chartdata.labels.push(element.episode);
          this.chartdata.datasets[0].data.push(element.characters.length);
        });
        RickService.getAllEpisodes("2").then(result => {
          result.results.forEach(element => {
            this.chartdata.labels.push(element.episode);
            this.chartdata.datasets[0].data.push(element.characters.length);
          });
          this.renderChart(this.chartdata, this.options);
        });
      });
    }
  }
};
</script>

<style></style>

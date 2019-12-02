<script>
import { Bar } from "vue-chartjs";
import RickService from "../../services/rick.service";

export default {
  extends: Bar,
  data: () => ({
    chartdata: {
      labels: ["Vivo", "Muerto", "Desaparecido"],
      datasets: [
        {
          label: "Vivo",
          backgroundColor: "#6e92ff",
          data: [10, 0, 0]
        },
        {
          label: "Muerto",
          backgroundColor: "#58c9a5",
          data: [0, 10, 0]
        },
        {
          label: "Desaparecido",
          backgroundColor: "#ffcc62",
          data: [0, 0, 10]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  mounted() {
    this.getListofCharsAlive();
    this.getListofCharsDead();
    this.getListofCharsUnknow();
  },
  methods: {
    getListofCharsAlive() {
      RickService.getCharbyPageName("", "", "Alive", "").then(result => {
        this.chartdata.datasets[0].data = [result.info.count, 0, 0];
      });
    },
    getListofCharsDead() {
      RickService.getCharbyPageName("", "", "Dead", "").then(result => {
        this.chartdata.datasets[1].data = [0, result.info.count, 0];
      });
    },
    getListofCharsUnknow() {
      RickService.getCharbyPageName("", "", "unknown", "").then(result => {
        this.chartdata.datasets[2].data = [0, 0, result.info.count];
        this.renderChart(this.chartdata, this.options);
      });
    }
  }
};
</script>

<style></style>

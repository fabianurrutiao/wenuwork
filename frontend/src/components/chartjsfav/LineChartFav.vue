<script>
import { Bar } from "vue-chartjs";
import RicklocalService from "../../services/ricklocal.service";

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
      RicklocalService.getall("", "", "Alive", "").then(result => {
        this.chartdata.datasets[0].data = [result.quantity, 0, 0];
      });
    },
    getListofCharsDead() {
      RicklocalService.getall("", "", "Dead", "").then(result => {
        this.chartdata.datasets[1].data = [0, result.quantity, 0];
      });
    },
    getListofCharsUnknow() {
      RicklocalService.getall("", "", "unknown", "").then(result => {
        this.chartdata.datasets[2].data = [0, 0, result.quantity];
        this.renderChart(this.chartdata, this.options);
      });
    }
  }
};
</script>

<style></style>

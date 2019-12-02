<script>
import { Bar } from "vue-chartjs";
import RickService from "../../services/rick.service";
import RicklocalService from "../../services/ricklocal.service";

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
    this.getAllFavs();
  },
  methods: {
    getAllFavs() {
      RicklocalService.getallwp().then(charfavs => {
        //Consegui todos mis favoritos 19
        RickService.getAllEpisodes("1").then(result => {
          result.results.forEach(element => {
            this.chartdata.labels.push(element.episode);
            var qnt = 0;
            element.characters.forEach(elementinar => {
              var id = elementinar.replace(
                "https://rickandmortyapi.com/api/character/",
                ""
              );
              if (charfavs.results.includes(id)) {
                qnt++;
              }
              charfavs.results.forEach(elementinel => {
                if (elementinel.id_char == id) {
                  qnt += 1;
                }
              });
            });
            this.chartdata.datasets[0].data.push(qnt);
          });
          RickService.getAllEpisodes("2").then(result => {
            result.results.forEach(element => {
              this.chartdata.labels.push(element.episode);
              var qnt = 0;
              element.characters.forEach(elementinar => {
                var id = elementinar.replace(
                  "https://rickandmortyapi.com/api/character/",
                  ""
                );
                if (charfavs.results.includes(id)) {
                  qnt++;
                }
                charfavs.results.forEach(elementinel => {
                  if (elementinel.id_char == id) {
                    qnt += 1;
                  }
                });
              });
              this.chartdata.datasets[0].data.push(qnt);
            });
            this.renderChart(this.chartdata, this.options);
          });
        });
      });
    }
  }
};
</script>

<style></style>

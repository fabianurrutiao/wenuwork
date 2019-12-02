<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item active>Favoritos</b-breadcrumb-item>
    </b-breadcrumb>
    <h2 class="page-title">
      Lista de <span class="fw-semi-bold">Personajes Favoritos</span>
    </h2>
    <b-row>
      <b-col>
        <Widget customHeader>
          <div class="headerlik">
            <div class="float-left">
              <span
                v-if="currentname != '' || status != '' || gender != ''"
                class="filter-title"
                >Filtros Actuales:
                <a v-on:click="clearall"
                  ><span class="glyphicon glyphicon-trash"/></a
              ></span>
              <ul>
                <li v-if="currentname != ''">
                  <span class="filter-name fw-semi-bold"
                    >Nombre: {{ currentname }}</span
                  >
                  <a v-on:click="clearname"
                    ><span class="glyphicon glyphicon-trash"
                  /></a>
                </li>
                <li v-if="status != ''">
                  <span class="filter-name fw-semi-bold"
                    >Estado:
                    {{
                      status == "Alive"
                        ? "Vivo"
                        : status == "Dead"
                        ? "Muerto"
                        : status == "unknown"
                        ? "Desconocido"
                        : "Desconocido"
                    }}</span
                  >
                  <a v-on:click="clearstatus"
                    ><span class="glyphicon glyphicon-trash"
                  /></a>
                </li>
                <li v-if="gender != ''">
                  <span class="filter-name fw-semi-bold"
                    >Estado:
                    {{
                      gender == "Male"
                        ? "Hombre"
                        : gender == "Female"
                        ? "Mujer"
                        : "Hombre"
                    }}</span
                  >
                  <a v-on:click="cleargender"
                    ><span class="glyphicon glyphicon-trash"
                  /></a>
                </li>
              </ul>
            </div>
            <div class="float-right">
              <b-form class="d-sm-down-none mr-3 dinline" inline>
                <b-form-group>
                  <b-input-group class="input-group-no-border">
                    <div class="input-group-addon d-flex align-items-center">
                      <i class="la la-search px-3" />
                    </div>
                    <b-input
                      v-model="txt_name"
                      v-on:keyup.enter="searchbyname"
                      id="search-input"
                      placeholder="Buscar Por Nombre"
                    />
                  </b-input-group>
                </b-form-group>
              </b-form>
              <b-dropdown
                variant="inverse"
                class="mr-xs dinline mr-3"
                size="sm"
                text="Buscar por estado"
                right
              >
                <b-dropdown-item v-on:click="searchbystate('Alive')"
                  >Vivo</b-dropdown-item
                >
                <b-dropdown-item v-on:click="searchbystate('Dead')"
                  >Muerto</b-dropdown-item
                >
                <b-dropdown-item v-on:click="searchbystate('unknown')"
                  >Desconocido</b-dropdown-item
                >
              </b-dropdown>
              <b-dropdown
                variant="inverse"
                class="mr-xs dinline mr-3"
                size="sm"
                text="Buscar por genero"
                right
              >
                <b-dropdown-item v-on:click="searchbygen('Male')"
                  >Hombre</b-dropdown-item
                >
                <b-dropdown-item v-on:click="searchbygen('Female')"
                  >Mujer</b-dropdown-item
                >
              </b-dropdown>
            </div>
          </div>

          <div v-if="loading" class="loadingcharge">
            <img
              class="img-rounded"
              src="../../assets/loading.gif"
              alt=""
              height="100"
            />
          </div>
          <div v-if="!loading" class="table-resposive">
            <table class="table">
              <thead>
                <tr>
                  <th class="hidden-sm-down">#</th>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Estado</th>
                  <th class="hidden-sm-down">Genero</th>
                  <th class="hidden-sm-down">Tipo</th>
                  <th>Favoritos</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in tableStyles" :key="row.id">
                  <td>{{ row.id_char }}</td>
                  <td>
                    <img
                      class="img-rounded"
                      :src="row.image"
                      alt=""
                      height="100"
                    />
                  </td>
                  <td>
                    {{ row.name }}
                  </td>
                  <td>
                    {{ row.status }}
                  </td>
                  <td>
                    {{ row.gender }}
                  </td>
                  <td>
                    {{ row.species }}
                  </td>
                  <td>
                    <b-button
                      class="p-1 px-3 btn-xs btn-yellow"
                      v-on:click="
                        delfav(
                          row.id_char,
                          row.image,
                          row.name,
                          row.status,
                          row.gender,
                          row.species
                        )
                      "
                    >
                      Remover de Favoritos
                    </b-button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="clearfix">
            <div class="float-right">
              <b-button
                variant="default"
                class="mr-xs"
                size="sm"
                v-if="currentpage != 1"
                v-on:click="firstpage"
                >Primera Pagina</b-button
              >
              <b-button
                variant="default"
                class="mr-xs"
                size="sm"
                v-on:click="prevpage"
                v-if="currentpage != 1"
              >
                <i class="la la-chevron-left" /> 
              </b-button>
              <b-button variant="default" class="mr-xs" size="sm">{{
                currentpage
              }}</b-button>
              <b-button
                variant="default"
                class="mr-xs"
                size="sm"
                v-if="currentpage != totalpages"
                v-on:click="nextpage"
                ><i class="la la-chevron-right" /> </b-button
              >
              <b-button
                variant="default"
                class="mr-xs"
                size="sm"
                v-if="currentpage != totalpages"
                v-on:click="lastpage"
                >Ultima Pagina</b-button
              >
            </div>
          </div>
        </Widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Widget from "@/components/Widget/Widget";
import { Chart } from "highcharts-vue";
import RicklocalService from "../../services/ricklocal.service";

export default {
  name: "Favoritos",
  components: { Widget, highcharts: Chart },
  data() {
    return {
      currentpage: 1,
      status: "",
      gender: "",
      loading: true,
      currentname: "",
      txt_name: "",
      totalpages: 10,
      tableStyles: null
    };
  },
  mounted() {
    this.getListofChars();
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    delfav(id, image, name, status, gender, species) {
      RicklocalService.deleteone(id, image, name, status, gender, species).then(
        result => {
          if (result.success == "false") {
            this.$toasted.info("Este personaje no pudo ser eliminado.", {
              duration: 3000
            });
          } else {
            this.$toasted.success("Se elimino un personaje con exito.", {
              duration: 3000
            });
            this.loading = true;
            this.getListofChars();
          }
        }
      );
    },
    searchbyname() {
      this.loading = true;
      this.currentpage = 1;
      this.currentname = this.txt_name;
      this.getListofChars();
    },
    clearall() {
      this.loading = true;
      this.currentpage = 1;
      this.currentname = "";
      this.txt_name = "";
      this.status = "";
      this.gender = "";
      this.getListofChars();
    },
    clearname() {
      this.loading = true;
      this.currentpage = 1;
      this.currentname = "";
      this.txt_name = "";
      this.getListofChars();
    },
    clearstatus() {
      this.loading = true;
      this.currentpage = 1;
      this.status = "";
      this.getListofChars();
    },
    cleargender() {
      this.loading = true;
      this.currentpage = 1;
      this.gender = "";
      this.getListofChars();
    },
    searchbystate(state) {
      this.loading = true;
      this.currentpage = 1;
      this.status = state;
      this.getListofChars();
    },
    searchbygen(type) {
      this.loading = true;
      this.currentpage = 1;
      this.gender = type;
      this.getListofChars();
    },
    nextpage() {
      this.loading = true;
      this.currentpage += 1;
      this.getListofChars();
    },
    prevpage() {
      this.loading = true;
      this.currentpage -= 1;
      this.getListofChars();
    },
    lastpage() {
      this.loading = true;
      this.currentpage = this.totalpages;
      this.getListofChars();
    },
    firstpage() {
      this.loading = true;
      this.currentpage = 1;
      this.getListofChars();
    },
    getListofChars() {
      RicklocalService.getall(
        this.currentname,
        this.currentpage,
        this.status,
        this.gender
      ).then(result => {
        this.tableStyles = result.results;
        this.totalpages = result.TotalPages == 0 ? 1 : result.TotalPages;
        this.loading = false;
      });
    }
  }
};
</script>

<style src="./Favoritos.scss" lang="scss" scoped />

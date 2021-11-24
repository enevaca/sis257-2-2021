<template>
  <div class="index container" style="margin-top: 10px">
    <transition name="fade">
      <router-view @showParent="showParent"></router-view>
    </transition>

    <div v-if="showParentPage" class="pt-2">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/">Inicio</router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Interpretes
          </li>
        </ol>
      </nav>

      <div class="row">
        <div class="col-12">
          <h2>Lista de Intérpretes</h2>
        </div>
        <div class="col-12 text-left">
          <router-link :to="{ name: 'InterpreteCreate', params: {} }"
            ><i class="bx bx-plus"></i> Crear Nuevo</router-link
          >
        </div>
      </div>

      <div class="table-container mt-2">
        <table class="table table-bordered table-striped" id="tableLista">
          <thead>
            <tr>
              <th>N°</th>
              <th>Nombre</th>
              <th>Nacionalidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(interprete, index) in interpretes" :key="interprete.id">
              <td>{{ index + 1 }}</td>
              <td>{{ interprete.nombre }}</td>
              <td>{{ interprete.nacionalidad }}</td>
              <td>
                <button
                  class="btn btn-link"
                  @click="editInterprete(interprete.id)"
                >
                  <i class="bx bx-edit"></i> Editar
                </button>
                <button
                  class="btn btn-link"
                  @click="deleteInterprete(interprete.id)"
                >
                  <i class="bx bx-trash"></i> Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import http from "@/services/http-common";

export default {
  data() {
    return {
      interpretes: [],
      showParentPage: true,
    };
  },
  created() {
    this.getInterpretes();
  },
  beforeRouteUpdate(to, from, next) {
    const toDepth = to.path.split("/").length;
    const fromDepth = from.path.split("/").length;
    this.showParentPage = toDepth < fromDepth;
    if (this.showParentPage) this.getInterpretes();
    next();
  },
  methods: {
    async getInterpretes() {
      await http
        .get("/interpretes")
        .then((response) => (this.interpretes = response.data));
    },
    editInterprete(id) {
      this.$router.push("/interpretes/edit/" + id);
    },
    async deleteInterprete(id) {
      var r = confirm("¿Está seguro que desea eliminar el registro?");
      if (r == true) {
        await http
          .delete("interpretes/" + id)
          .then(() => this.getInterpretes());
      }
    },
    showParent(show) {
      this.showParentPage = show;
    },
  },
};
</script>

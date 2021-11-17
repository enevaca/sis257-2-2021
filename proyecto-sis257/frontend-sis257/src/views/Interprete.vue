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
            ><ion-icon name="add-outline"></ion-icon> Crear Nuevo</router-link
          >
        </div>
      </div>

      <div class="table-container mt-2">
        <table class="table table-bordered table-striped" id="tableLista">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Nacionalidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="interprete in interpretes" :key="interprete.id">
              <td>{{ interprete.nombre }}</td>
              <td>{{ interprete.nacionalidad }}</td>
              <td>
                <button
                  class="btn btn-link"
                  @click="editInterprete(interprete.id)"
                >
                  <ion-icon name="create-outline"></ion-icon> Editar
                </button>
                <button
                  class="btn btn-link"
                  @click="deleteInterprete(interprete.id)"
                >
                  <ion-icon name="trash-outline"></ion-icon> Eliminar
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
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im52YWNhIiwiY2hlY2siOnRydWUsImlhdCI6MTYzNzEwMDE1OCwiZXhwIjoxNjM3MTAxOTU4fQ.mOOmRQ436wfZJpPrQRC56p-QopDVii5BoqMdOjYI6DE";
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
      await fetch("http://localhost:3000/api/interpretes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => (this.interpretes = data));
    },
    editInterprete(id) {
      this.$router.push("/interpretes/edit/" + id);
    },
    async deleteInterprete(id) {
      var r = confirm("¿Está seguro que desea eliminar el registro?");
      if (r == true) {
        await fetch("http://localhost:3000/api/interpretes/" + id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }).then(() => this.getInterpretes());
      }
    },
    showParent(show) {
      this.showParentPage = show;
    },
  },
};
</script>

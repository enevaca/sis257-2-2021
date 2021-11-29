<template>
  <div class="pt-2">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/">Inicio</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/albums">Albums</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Editar</li>
      </ol>
    </nav>

    <div class="row">
      <div class="col-12">
        <h2 class="text-center">Editar Album</h2>
      </div>
    </div>

    <div class="row d-flex justify-content-center">
      <div class="col-6">
        <div class="card">
          <div class="card-body">
            <form @submit.prevent="sendAlbum">
              <div class="form-group mt-2">
                <select 
                  v-model="album.id_interprete"
                  class="form-select"
                  required>
                  <option 
                    v-for="interprete in interpretes" 
                    :key="interprete.id"
                    :value="interprete.id">
                    {{ interprete.nombre }}
                  </option>
                </select>
              </div>
              <div class="form-group mt-2">
                <input
                  type="text"
                  v-model="album.nombre"
                  class="form-control"
                  placeholder="Inserta el nombre"
                  required
                />
              </div>
              <div class="form-group pt-2">
                <input
                  type="date"
                  v-model="album.fecha_lanzamiento"
                  class="form-control"
                  placeholder="Inserta la fecha de lanzamiento"
                  required
                />
              </div>
              <div class="text-center mt-2">
                <button type="submit" class="btn btn-primary">
                  <i class="bx bx-save"></i> Modificar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="text-left">
      <button class="btn btn-link" @click="goBack">
        <i class="bx bx-left-arrow-alt"></i> Volver
      </button>
    </div>
  </div>
</template>
<script>
import http from "@/services/http-common";
import moment from "moment";

export default {
  data() {
    return {
      album: {
        id_interprete: 0,
        nombre: "",
        fecha_lanzamiento: "",
      },
      albumId: 0,
      interpretes: [],
    };
  },
  async created() {
    this.$emit("showParent", false);
    await http.get("interpretes").then(async (response) => { 
      this.interpretes = response.data;
      this.albumId = this.$route.params.id | 0;
      await http
        .get("albums/" + this.albumId)
        .then((response) => {
          this.album = response.data;
          console.log(this.album);
          this.album.fecha_lanzamiento = moment(response.data.fecha_lanzamiento).format("YYYY-MM-DD");
        });
    });
  },
  methods: {
    async sendAlbum() {
      await http
        .put("/albums/" + this.albumId, this.album)
        .then(() => this.$router.push("/albums"));
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

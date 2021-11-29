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
          <li class="breadcrumb-item active" aria-current="page">Albums</li>
        </ol>
      </nav>

      <div class="row">
        <div class="col-12">
          <h2>Lista de Albums</h2>
        </div>
        <div class="col-12 text-left">
          <router-link :to="{ name: 'AlbumCreate', params: {} }"
            ><i class="bx bx-plus"></i> Crear Nuevo</router-link
          >
        </div>
      </div>

      <div class="table-container mt-2">
        <table class="table table-bordered table-striped" id="tableLista">
          <thead>
            <tr>
              <th>N°</th>
              <th>Album</th>
              <th>Fecha de Lanzamiento</th>
              <th>Intérprete</th>
              <th>Nacionalidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(album, index) in albums" :key="album.id">
              <td>{{ index + 1 }}</td>
              <td>{{ album.nombre }}</td>
              <td>{{ dateTime(album.fecha_lanzamiento) }}</td>
              <td>{{ album.interprete }}</td>
              <td>{{ album.nacionalidad }}</td>
              <td>
                <button class="btn btn-link" @click="editAlbum(album.id)">
                  <i class="bx bx-edit"></i> Editar
                </button>
                <button class="btn btn-link" @click="deleteAlbum(album.id)">
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
import moment from "moment";

export default {
  data() {
    return {
      albums: [],
      showParentPage: true,
    };
  },
  created() {
    this.getAlbums();
  },
  beforeRouteUpdate(to, from, next) {
    const toDepth = to.path.split("/").length;
    const fromDepth = from.path.split("/").length;
    this.showParentPage = toDepth < fromDepth;
    if (this.showParentPage) this.getAlbums();
    next();
  },
  methods: {
    async getAlbums() {
      await http
        .get("/albums")
        .then((response) => (this.albums = response.data));
    },
    editAlbum(id) {
      this.$router.push("/albums/edit/" + id);
    },
    async deleteAlbum(id) {
      var r = confirm("¿Está seguro que desea eliminar el registro?");
      if (r == true) {
        await http.delete("albums/" + id).then(() => this.getAlbums());
      }
    },
    showParent(show) {
      this.showParentPage = show;
    },
    dateTime(value) {
      return moment(value).format("DD/MM/YYYY");
    },
  },
};
</script>

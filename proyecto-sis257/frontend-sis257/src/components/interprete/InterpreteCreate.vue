<template>
  <div class="pt-2">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/">Inicio</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/interpretes">Intérpretes</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Crear</li>
      </ol>
    </nav>

    <div class="row">
      <div class="col-12">
        <h2 class="text-center">Crear Intérprete</h2>
      </div>
    </div>

    <div class="row d-flex justify-content-center">
      <div class="col-6">
        <div class="card">
          <div class="card-body">
            <form @submit.prevent="sendInterprete">
              <div class="form-group mt-2">
                <input
                  type="text"
                  v-model="interprete.nombre"
                  class="form-control"
                  placeholder="Inserta el nombre"
                  required
                />
              </div>
              <div class="form-group pt-2">
                <input
                  type="text"
                  v-model="interprete.nacionalidad"
                  class="form-control"
                  placeholder="Inserta la nacionalidad"
                  required
                />
              </div>
              <div class="text-center mt-2">
                <button type="submit" class="btn btn-primary">
                  <ion-icon name="save-outline"></ion-icon> Enviar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="text-left">
      <button class="btn btn-link" @click="goBack">
        <ion-icon name="arrow-back-outline"></ion-icon> Volver</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      interprete: {
        nombre: "",
        nacionalidad: "",
      },
    };
  },
  created() {
    this.$emit("showParent", false);
  },
  methods: {
    async sendInterprete() {
      await fetch("http://localhost:3000/api/interpretes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.interprete),
      }).then(() => this.$router.push("/interpretes"));
    },
    goBack() {
      this.$router.go(-1);
    }
  },
};
</script>

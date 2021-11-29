<template>
  <div>
    <!-- ======= Header ======= -->
    <header id="header" class="d-flex align-items-center">
      <div class="container d-flex align-items-center justify-content-between">
        <h1 class="logo">
          <router-link to="/">SIS257<span>.</span></router-link>
        </h1>
        <!-- Uncomment below if you prefer to use an image logo -->
        <!-- <a href="index.html" class="logo"><img src="assets/img/logo.png" alt=""></a>-->

        <nav id="navbar" class="navbar">
          <ul>
            <li>
              <router-link class="nav-link scrollto" to="/">Inicio</router-link>
            </li>
            <li>
              <router-link class="nav-link scrollto" to="/about"
                >Acerca De</router-link
              >
            </li>
            <li><a class="nav-link scrollto" href="#services">Servicios</a></li>
            <li><a class="nav-link scrollto" href="#team">Equipo</a></li>
            <li v-if="authenticate" class="dropdown">
              <a href="#"
                ><span>Catálogos</span> <i class="bi bi-chevron-down"></i
              ></a>
              <ul>
                <li>
                  <router-link to="/interpretes">Interpretes</router-link>
                </li>
                <li><router-link to="/albums">Albums</router-link></li>
                <li class="dropdown">
                  <a href="#"
                    ><span>Tema 3</span> <i class="bi bi-chevron-right"></i
                  ></a>
                  <ul>
                    <li><a href="#">HTML5</a></li>
                    <li><a href="#">CSS3</a></li>
                    <li><a href="#">JS</a></li>
                    <li><a href="#">BootStrap</a></li>
                    <li><a href="#">Vue.js</a></li>
                  </ul>
                </li>
                <li><a href="#">Tema 3</a></li>
                <li><a href="#">Tema 4</a></li>
                <li><a href="#">Tema 5</a></li>
                <li><a href="#">Tema 6</a></li>
              </ul>
            </li>
            <li v-if="authenticate">
              <a class="nav-link scrollto" href="#contact"
                >Hola {{ currentUser }}</a
              >
            </li>
          </ul>
          <i class="bi bi-list mobile-nav-toggle"></i>
        </nav>
        <router-link v-if="authenticate" to="/login" @click="logout"
          >Cerrar Sesión</router-link
        >
        <!-- .navbar -->
      </div>
    </header>
    <!-- End Header -->
  </div>
</template>
<script>
import auth from "@/services/AuthDataService";

export default {
  name: "Header",
  props: ["authenticate"],
  methods: {
    logout() {
      auth.deleteUserLogged();
      localStorage.setItem("token", null);
      this.$router.go();
    },
  },
  computed: {
    currentUser() {
      if (this.authenticate) {
        var r = JSON.parse(auth.getUserLogged());
        return r.user;
      } else return "";
    },
  },
};
</script>

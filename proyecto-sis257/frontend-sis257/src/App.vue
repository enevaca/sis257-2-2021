<template>
  <div>
    <MyHeader :authenticate="authenticate" />
    <main id="main">
      <router-view @update-user="updateUser" />
    </main>
    <hr />
    <MyFooter />
    <!-- <div id="preloader"></div> -->
    <a
      href="#"
      class="back-to-top d-flex align-items-center justify-content-center"
      ><i class="bi bi-arrow-up-short"></i
    ></a>
  </div>
</template>
<script>
import MyFooter from "./components/layout/Footer.vue";
import MyHeader from "./components/layout/Header.vue";
import auth from  "./services/AuthDataService";

export default {
  components: { MyHeader, MyFooter },
  data() {
    return {
      authenticate: auth.getUserLogged()
    }
  },
  methods: {
    updateUser(user) {
      this.authenticate = user;
    }
  },
};
</script>

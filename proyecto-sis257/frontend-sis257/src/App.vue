<template>
  <div>
    <MyHeader />
    <main id="main">
      <router-view />
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
export default {
  components: { MyHeader, MyFooter },
};
</script>

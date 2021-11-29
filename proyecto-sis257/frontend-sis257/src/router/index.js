import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import auth from "@/services/AuthDataService";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/interpretes",
    name: "Interprete",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Interprete.vue"),
    children: [
      {
        path: "create",
        name: "InterpreteCreate",
        component: () =>
          import("../components/interprete/InterpreteCreate.vue"),
      },
      {
        path: "edit/:id",
        name: "InterpreteEdit",
        component: () => import("../components/interprete/InterpreteEdit.vue"),
      },
    ],
  },
  {
    path: "/albums",
    name: "Album",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Album.vue"),
    children: [
      {
        path: "create",
        name: "AlbumCreate",
        component: () => import("../components/album/AlbumCreate.vue"),
      },
      {
        path: "edit/:id",
        name: "AlbumEdit",
        component: () => import("../components/album/AlbumEdit.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/", "/login", "/about"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = auth.getUserLogged();

  if(authRequired && !loggedIn) {
    return next("/login");
  }
  next();
});

export default router;

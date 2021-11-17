import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

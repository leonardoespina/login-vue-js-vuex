import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/login/Login.vue";

import Home from "../components/Home.vue";

const routes = [
  {
    path: "/Login",
    name: "Login",
    component: Login,
  },

  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/Salir",
        component: () => import("../components/Salir.vue"),
      },

      {
        path: "/Inicio",
        component: () => import("../views/Inicio.vue"),
      },

      {
        path: "/error",
        component: () => import("../views/Found.vue"),
      },
      {
        path: "/:pathMatch(.*)*",
        component: () => import("../views/Found.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  let sessionStorage = localStorage.getItem("token");
  //validar si esta logueada
  if (to.name !== "Login" && !sessionStorage) {
    next({ name: "Login" });
  } else if (to.name == "Login" && sessionStorage) {
    next({ name: "Home" });
  } else {
    next();
  }
});
export default router;

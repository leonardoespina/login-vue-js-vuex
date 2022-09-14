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
        path: "/Users/editar/:id",
        component: () => import("../views/users/edit.vue"),
      },
      {
        path: "/Users/consultar/:id",
        component: () => import("../views/users/consultar.vue"),
      },
      {
        path: "/Users/agregar",
        component: () => import("../views/users/agregar.vue"),
      },
      {
        path: "/Users",
        component: () => import("../views/users/table.vue"),
      },
      {
        path: "/Factura",
        component: () => import("../views/factura/factura.vue"),
      },
      {
        path: "/Productos",
        component: () => import("../views/productos/table.vue"),
      },
      {
        path: "/Categorias",
        component: () => import("../views/categorias/table.vue"),
      },
      {
        path: "/Categorias/editar/:id",
        component: () => import("../views/categorias/edit.vue"),
      },
      {
        path: "/Categorias/agregar",
        component: () => import("../views/categorias/agregar.vue"),
      },
      {
        path: "/Categorias/consultar/:id",
        component: () => import("../views/categorias/consultar.vue"),
      },

      {
        path: "/Productos/editar/:id",
        component: () => import("../views/productos/edit.vue"),
      },
      {
        path: "/Productos/agregar",
        component: () => import("../views/productos/agregar.vue"),
      },
      {
        path: "/Productos/consultar/:id",
        component: () => import("../views/productos/consultar.vue"),
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

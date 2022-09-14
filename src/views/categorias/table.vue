<template><Tabla :variables="variables" /></template>
<script>
import Tabla from "../../crudBasico/index.vue";
import { column } from "../../crudBasico/column";
import { ref } from "vue";
export default {
  components: {
    Tabla,
  },
  setup() {
    const columnas = ref(column("categorias"));

    const variables = ref({
      tittleTable: "Categorias",
      urlConsulta: "/categorias/",
      urlEliminar: "/categorias/delete/",
      urlRouterEditar: "/Categorias/editar/",
      urlRouterConsulta: "/Categorias/consultar/",
      urlRouterAgregar: "/Categorias/agregar",
      urlRouterTabla: "/Categorias",
      columnas,
      user: false,
    });

    return { variables };
  },
};
</script>

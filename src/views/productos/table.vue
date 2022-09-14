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
    const columnas = ref(column("productos"));

    const variables = ref({
      tittleTable: "Productos",
      urlConsulta: "/productos/",
      urlEliminar: "/productos/delete/",
      urlRouterEditar: "/Productos/editar/",
      urlRouterConsulta: "/Productos/consultar/",
      urlRouterAgregar: "/Productos/agregar",
      urlRouterTabla: "/Productos/",
      columnas,
      user: false,
    });

    return { variables };
  },
};
</script>

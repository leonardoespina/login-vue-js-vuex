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
    const columnas = ref(column("user"));

    const variables = ref({
      tittleTable: "Usuarios",
      urlConsulta: "/users/",
      urlEliminar: "/users/deleteUser/",
      urlRouterEditar: "/Users/editar/",
      urlRouterConsulta: "/Users/consultar/",
      urlRouterAgregar: "/Users/agregar",
      columnas,
      user: true,
    });

    return { variables };
  },
};
</script>

<template><Editar /></template>
<script>
import Editar from "../../components/productos/editar.vue";
//import { ref, watchEffect } from "vue";
//import crud from "../../crudBasico/composables/index";
export default {
  components: {
    Editar,
  },
  /*setup() {
    const list = ref([]);

    const { c, consultaGetter } = crud();

    c("/categorias/getSelect/", "", false);
    watchEffect(() => {
      list.value = consultaGetter.value;
    });

    return { list };
  },*/
};
</script>

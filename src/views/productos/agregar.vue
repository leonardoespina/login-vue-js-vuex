<template><Agregar :list="list" /></template>
<script>
import Agregar from "../../components/productos/agregar.vue";
import crud from "../../crudBasico/composables/index";
import { ref, watchEffect } from "vue";
export default {
  components: {
    Agregar,
  },
  setup() {
    const list = ref([]);

    const { c, consultaGetter } = crud();

    c("/categorias/getSelect/", "", false);
    watchEffect(() => {
      list.value = consultaGetter.value;
    });

    return { list };
  },
};
</script>

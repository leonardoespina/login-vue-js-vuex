<template><Factura :productos="productos" /></template>
<script>
import { ref, watchEffect } from "vue";
import Factura from "../../components/factura/factura.vue";
import crud from "../../crudBasico/composables/index";
export default {
  components: {
    Factura,
  },
  setup() {
    const productos = ref([]);

    const { storeProductos, getterProducto } = crud();

    storeProductos("/productos/getSelect/", "", false);
    watchEffect(() => {
      productos.value = getterProducto.value;
    });

    return { productos };
  },
};
</script>

<template>
  <q-card-section>
    <q-card-section class="bg-red text-white">
      <q-btn to="/Categorias"><q-icon name="arrow_back" /></q-btn>
      <b>Consultar Categorias</b>
    </q-card-section>
    <q-form>
      <q-card-section>
        <div class="row">
          <div class="contenido">
            <q-input
              square
              v-model="cat.categorias"
              clearable
              label="Categoria"
              bg-color="field"
              lazy-rules
              required
            />
          </div>
        </div>

        <q-separator /><q-card-actions class="q-px-md">
          <q-btn
            unelevated
            color="red"
            type="submit"
            size="sm"
            label="Guardar"
            :disable="isDisable"
          />

          <q-btn
            unelevated
            color="primary"
            size="sm"
            label="Borrar"
            :disable="isDisable"
          />
        </q-card-actions>
      </q-card-section>
    </q-form>
  </q-card-section>
</template>
<script>
import { ref, onMounted, watchEffect } from "vue";
import { useRoute /*useRouter*/ } from "vue-router";
import crud from "../../crudBasico/composables/index";
//import { useQuasar } from "quasar";
//import { messages } from "../../services/validation";

export default {
  setup() {
    const cat = ref({}),
      route = useRoute(),
      // router = useRouter(),
      // $q = useQuasar(),
      isDisable = true;

    const { c, consultaGetter } = crud(),
      _id = route.params.id;

    //console.log(route.params.id);

    onMounted(() => {
      c("/categorias/getId/", `${_id}`, null);

      watchEffect(() => {
        if (consultaGetter.value.value.length > 0) {
          let { categorias } = consultaGetter.value.value[0];

          Object.assign(cat.value, { categorias });
        }
      });
    });

    return { cat, isDisable };
  },
};
</script>
<style>
.contenido {
  padding: 20px 1px 10px 10px;
  width: 300px;
}
</style>

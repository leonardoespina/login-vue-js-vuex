<template>
  <q-card-section>
    <div class="q-pa-md">
      <q-card class="my-card">
        <q-card-section class="bg-red text-white">
          <q-btn to="/Productos"><q-icon name="arrow_back" /></q-btn>
          <b>Consulta Producto</b>
        </q-card-section>
        <q-card-actions>
          <q-form disabled>
            <q-card-section>
              <div class="row">
                <div class="contenido">
                  <q-input
                    square
                    v-model="modal.producto"
                    clearable
                    label="Producto"
                    bg-color="field"
                    lazy-rules
                    required
                  />
                </div>
                <div class="contenido">
                  <q-input
                    square
                    v-model="modal.precio"
                    clearable
                    label="Precio"
                    bg-color="field"
                    lazy-rules
                    required
                  />
                </div>
                <div class="contenido">
                  <q-input
                    square
                    v-model="modal.cantidad"
                    clearable
                    label="Cantidad"
                    bg-color="field"
                    lazy-rules
                    required
                  />
                </div>
                <div class="contenido">
                  <q-select
                    class="col-12 col-sm-3"
                    v-model="modal.categoria"
                    use-input
                    label="Categoria"
                  >
                    <template v-slot:no-option>
                      <q-item
                        ><q-item-section> Registro Vacio</q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </div>
              </div>

              <q-separator /><q-card-actions class="q-px-md">
                <q-btn
                  unelevated
                  color="red"
                  type="submit"
                  size="sm"
                  label="Guardar"
                />

                <q-btn unelevated color="primary" size="sm" label="Borrar" />
              </q-card-actions>
            </q-card-section>
          </q-form>
        </q-card-actions>
      </q-card>
    </div>
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
    const modal = ref({}),
      route = useRoute(),
      // router = useRouter(),
      // $q = useQuasar(),
      isDisable = true;

    const { c, consultaGetter } = crud(),
      _id = route.params.id;

    //console.log(route.params.id);

    onMounted(() => {
      c("/productos/getId/", `${_id}`, null);

      watchEffect(() => {
        if (consultaGetter.value.value.length > 0) {
          let { producto, precio, cantidad, categorias } =
            consultaGetter.value.value[0];

          Object.assign(modal.value, {
            producto,
            precio,
            cantidad,
            categoria: {
              label: categorias[0].categorias,
              value: categorias[0]._id,
            },
          });
        }
      });
    });

    return { modal, isDisable };
  },
};
</script>
<style>
.contenido {
  padding: 20px 1px 10px 10px;
  width: 300px;
}
</style>

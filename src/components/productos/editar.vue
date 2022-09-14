<template>
  <q-card-section>
    <div class="q-pa-md">
      <q-card class="my-card">
        <q-card-section class="bg-red text-white">
          <q-btn to="/Productos"><q-icon name="arrow_back" /></q-btn>
          <b>Editar Producto</b>
        </q-card-section>
        <q-card-actions>
          <q-form @submit.prevent="update">
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
                    :options="categorias"
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
import { ref, onMounted, /*watchEffect*/ watch } from "vue";
import { useRoute /*useRouter*/ } from "vue-router";
import crud from "../../crudBasico/composables/index";
//import { useStore } from "vuex";
import { useQuasar } from "quasar";
import { messages } from "../../services/validation";

export default {
  setup() {
    const modal = ref({}),
      obje = ref({}),
      route = useRoute(),
      ir = "/Productos",
      categorias = ref([]),
      //store = useStore(),
      // router = useRouter(),
      $q = useQuasar(),
      isDisable = true;

    const { c, consultaGetter, u, msg } = crud(),
      _id = route.params.id;
    c("/categorias/getSelect/", "", false);

    onMounted(() => {
      c("/productos/getId/", `${_id}`, null);

      watch(
        () => consultaGetter.value.value,
        (productoEditar, categoria) => {
          console.log(categoria);

          categorias.value = categoria;

          for (let listCat in categorias.value) {
            Object.assign(categorias.value, {
              value: categorias.value[listCat].value,
              label: categorias.value[listCat].label,
            });
          }
          obje.value = productoEditar;

          for (let index in obje.value) {
            let cat = obje.value[index]["categorias"];

            for (let indice in cat) {
              Object.assign(modal.value, {
                producto: productoEditar[index].producto,
                precio: productoEditar[index].precio,
                cantidad: productoEditar[index].cantidad,
                categoria: {
                  label: cat[indice].categorias,
                  value: cat[indice]._id,
                },
              });
            }
          }
        }
      );
    });

    const update = () => {
      let endPoint = `productos/update/${_id}`;

      u(modal.value, endPoint);
      $q.notify(messages(msg.value, "positive", "check", "normal"));
    };

    return { modal, isDisable, categorias, update, ir };
  },
};
</script>
<style>
.contenido {
  padding: 20px 1px 10px 10px;
  width: 300px;
}
</style>

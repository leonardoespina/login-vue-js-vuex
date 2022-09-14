<template>
  <q-card-section>
    <div class="q-pa-md">
      <q-card class="my-card">
        <q-card-section class="bg-red text-white">
          <q-btn to="/Productos"><q-icon name="arrow_back" /></q-btn>
          <b>Agregar Producto</b>
        </q-card-section>
        <q-card-actions>
          <q-form @submit.prevent="agregar">
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
                    :options="categorias"
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
import { ref } from "vue";
import {
  //requeridLetter,
  //  required,
  messages,
} from "../../services/validation.js";
import { /*search*/ userCreate } from "../../services/Helper.js";

//import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import crud from "../../crudBasico/composables/index";
export default {
  props: ["list"],
  setup(props) {
    console.log(props.list);
    const modal = ref([]),
      // ruta = ref(""),
      //options = isAdmin(),
      categorias = ref(props.list),
      userCreation = userCreate(),
      //  filterFn = "",
      // router = useRouter(),
      $q = useQuasar();
    //     campo = ref("");

    const { save, msg } = crud();

    const agregar = () => {
      let payload = {
        producto: modal.value.producto,
        cantidad: modal.value.cantidad,
        precio: modal.value.precio,
        categoria: modal.value.categoria,
        userCreate: { id: userCreation.id, user: userCreation.user },

        url: "/productos/createOne",
        GETALL: "/productos/",
      };

      save(payload);
      $q.notify(messages(msg.value, "positive", "check", "normal"));
      // c("/productos/", "", "");
      modal.value = [];

      console.log(props.list);

      // router.replace("/Categoria");
    };

    /*const buscar = async (val) => {
      if (val) {
        if (typeof val == "number") {
          ruta.value = "login/getCedula/";
          campo.value = "Cedula";
        }
        if (typeof val == "string") {
          ruta.value = "login/getUser/";
          campo.value = "Usuario";
        }
        return await search(val, campo.value, ruta.value).then(function (
          response
        ) {
          return response;
        })
      }
    };*/

    return {
      /*user, buscar, /*requeridLetter, required,*/ agregar,

      modal,
      //   filterFn,
      categorias,
    };
  },
};
</script>
<style>
.contenido {
  padding: 20px 1px 10px 10px;
  width: 300px;
}
</style>

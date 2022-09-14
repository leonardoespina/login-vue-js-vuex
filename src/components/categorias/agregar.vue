<template>
  <q-card-section>
    <div class="q-pa-md">
      <q-card class="my-card">
        <q-card-section class="bg-red text-white">
          <q-btn to="/Categorias"><q-icon name="arrow_back" /></q-btn>
          <b>Agregar Categorias</b>
        </q-card-section>
        <q-card-actions>
          <q-form @submit.prevent="agregar">
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
import { isAdmin } from "../../crudBasico/column";
//import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import crud from "../../crudBasico/composables/index";
export default {
  setup() {
    const cat = ref([]),
      // ruta = ref(""),
      options = isAdmin(),
      userCreation = userCreate(),
      // router = useRouter(),
      $q = useQuasar();
    //     campo = ref("");

    const { save, msg, c } = crud();

    const agregar = () => {
      let payload = {
        categorias: cat.value.categorias,

        userCreate: { id: userCreation.id, user: userCreation.user },

        url: "/categorias/createOne",
        GETALL: "/categorias/",
      };

      save(payload);
      $q.notify(messages(msg.value, "positive", "check", "normal"));
      c("/categorias/", "", "");
      cat.value = [];
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
      options,
      cat,
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

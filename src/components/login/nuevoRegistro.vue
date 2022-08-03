<template>
  <q-dialog v-model="modal" persistent>
    <q-card style="max-width: 400px; width: 500px; height: 500px">
      <q-bar>
        <div>Nuevo Usuario</div>

        <q-space />

        <q-btn dense flat icon="close" @click="cerrar" v-close-popup>
          <q-tooltip>Cerrar</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section>
        <q-form @submit.prevent="saveRegistroNuevo">
          <q-card-section>
            <q-input
              square
              v-model.number="user.cedula"
              clearable
              type="number"
              label="Cedula"
              bg-color="field"
              lazy-rules
              :rules="[buscar]"
              required
            />
            <q-input
              square
              clearable
              label="Usuario"
              bg-color="field"
              v-model="user.username"
              lazy-rules
              :rules="[buscar]"
              required
            />
            <q-input
              square
              clearable
              label="Nombre y Apellido"
              bg-color="field"
              v-model="user.lastname"
              lazy-rules
              :rules="[requeridLetter, required]"
              required
            />
            <q-input
              square
              clearable
              label="Correo Electronico"
              bg-color="field"
              v-model="user.correo"
              type="email"
              required
            />
            <q-input
              square
              ref="pass2"
              clearable
              label="Ingrese Contraseña"
              bg-color="field"
              v-model="user.password"
              required
              type="password"
            />
            <q-input
              square
              clearable
              label="Confirme Contraseña"
              bg-color="field"
              v-model="user.passConf"
              lazy-rules
              :rules="[
                (val) => val == user.password || 'No Coincide',
                required,
              ]"
              required
              type="password"
            />
          </q-card-section>
          <q-card-section class="q-pa-md q-gutter-sm">
            <q-circular-progress
              indeterminate
              size="25px"
              color="red"
              class="q-ma-md"
              v-show="loaders"
            />
            <q-btn
              unelevated
              type="submit"
              color="primary"
              size="sm"
              label="Registrar"
              v-show="!loaders"
            />

            <q-btn
              unelevated
              color="red"
              size="sm"
              @click="borrar()"
              label="Borrar"
              v-show="!loaders"
            />
          </q-card-section>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import { ref, watchEffect } from "vue";
import {
  requeridLetter,
  required,
  messages,
} from "../../services/validation.js";
import { /* get*/ search /*save*/ } from "../../services/Helper.js";
import { useStore } from "vuex";

import { useQuasar } from "quasar";
export default {
  props: ["openDialog"],
  name: "NuevoRegistro",

  setup(props, context) {
    const modal = ref(false);
    const user = ref([]);
    const $q = useQuasar();
    const ruta = ref(""),
      store = useStore(),
      loaders = ref(false),
      campo = ref("");
    console.log(store.state.status);
    watchEffect(() => {
      if (props.openDialog) {
        modal.value = props.openDialog;
      }
    });
    const cerrar = () => {
      modal.value = false;
      context.emit("cerrar", modal.value);
      borrar();
    };
    const borrar = () => {
      user.value = [];
    };
    const saveRegistroNuevo = async () => {
      //  context.emit("saveRegistroNuevo", user.value);

      loaders.value = true;
      setTimeout(async () => {
        await store
          .dispatch("REGISTRO", {
            username: user.value.username,
            correo: user.value.correo,
            cedula: user.value.cedula,
            password: user.value.password,
          })
          .then((res) => {
            console.log(res);

            if (res.status === 200) {
              $q.notify(messages(res.data, "positive", "check"));
            } else {
              $q.notify(messages(res.messages, "negative", "close"));
            }
          });
        /*await save("/login/signUpOff", payload).then((res) => {
        console.log(res.data);
        $q.notify(messages(res.data, "positive", "save"));
      });*/
        loaders.value = store.state.status;

        cerrar();
      }, 2000);
    };
    /////OPTIMIZAR ESTA CAGADA NO PUEDE IR AQUI/////****AUTOMATIZAR ESTA BUSQUEDA RULES QUASAR
    const buscar = async (val) => {
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
        });
      }
    };

    return {
      modal,
      cerrar,
      user,
      saveRegistroNuevo,
      requeridLetter,
      required,
      buscar,
      loaders,
      borrar,
    };
  },
};
</script>

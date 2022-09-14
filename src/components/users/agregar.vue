<template>
  <q-card-section>
    <div class="q-pa-md">
      <q-card class="my-card">
        <q-card-section class="bg-red text-white">
          <b>Agregar Usuario</b>
        </q-card-section>
        <q-card-actions>
          <q-form @submit.prevent="agregar">
            <q-card-section>
              <div class="row">
                <div class="contenido">
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
                </div>
                <div class="contenido">
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
                </div>
                <div class="contenido">
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
                </div>
                <div class="contenido">
                  <q-input
                    square
                    clearable
                    label="Correo Electronico"
                    bg-color="field"
                    v-model="user.correo"
                    type="email"
                    required
                  />
                </div>
                <div class="contenido">
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
                </div>
                <div class="contenido">
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
                </div>
                <div class="contenido">
                  <q-select
                    filled
                    v-model="user.isAdminOpc"
                    :options="options"
                    lazy-rules
                    :rules="[required]"
                    label="Tipo Usuario"
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
  requeridLetter,
  required,
  messages,
} from "../../services/validation.js";
import { search, userCreate } from "../../services/Helper.js";
import { isAdmin } from "../../crudBasico/column";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import crud from "../../crudBasico/composables/index";
export default {
  setup() {
    const user = ref([]),
      ruta = ref(""),
      options = isAdmin(),
      userCreation = userCreate(),
      router = useRouter(),
      $q = useQuasar(),
      campo = ref("");

    const { save, msg } = crud();

    const agregar = () => {
      console.log(user.value.isAdminOpc);
      let payload = {
        username: user.value.username,
        password: user.value.password,
        cedula: user.value.cedula,
        lastname: user.value.lastname,
        userCreate: { id: userCreation.id, user: userCreation.user },
        isAdmin: user.value.isAdminOpc,
        correo: user.value.correo,
        url: "/users/signUp",
      };

      save(payload);
      $q.notify(messages(msg.value, "positive", "check", "normal"));
      router.push("/Users");
    };

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

    return { user, buscar, requeridLetter, required, agregar, options };
  },
};
</script>
<style>
.contenido {
  padding: 20px 1px 10px 10px;
  width: 300px;
}
</style>

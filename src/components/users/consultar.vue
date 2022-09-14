<template>
  <q-card-section>
    <q-form @submit.prevent="update">
      <q-card-section>
        <div class="row">
          <div class="contenido">
            <q-input
              square
              clearable
              label="Nombre y Apellido"
              bg-color="field"
              v-model="user.lastname"
              lazy-rules
              required
            />
          </div>
          <div class="contenido">
            <q-input
              square
              clearable
              label="Cedula"
              bg-color="field"
              v-model="user.cedula"
              lazy-rules
              :disable="isDisable"
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
              type="password"
              :disable="isDisable"
              required
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
              :rules="[(val) => val == user.password || 'No Coincide']"
              type="password"
              :disable="isDisable"
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
import { useRoute, useRouter } from "vue-router";
import crud from "../../crudBasico/composables/index";
import { useQuasar } from "quasar";
import { messages } from "../../services/validation";

export default {
  setup() {
    const user = ref({}),
      route = useRoute(),
      router = useRouter(),
      $q = useQuasar(),
      isDisable = true;

    const { c, consultaGetter, msg, u } = crud(),
      _id = route.params.id;

    //console.log(route.params.id);

    onMounted(() => {
      c("/users/getId/", `${_id}`, null);

      watchEffect(() => {
        if (consultaGetter.value.value.length > 0) {
          let { lastname, cedula } = consultaGetter.value.value[0];

          Object.assign(user.value, { lastname, cedula });
        }
      });
    });
    const update = () => {
      let endPoint = `users/updateUser/${_id}`;

      u(user.value, endPoint);
      $q.notify(messages(msg.value, "positive", "check", "normal"));
      router.push("/Productos");
    };

    return { user, isDisable, update };
  },
};
</script>
<style>
.contenido {
  padding: 20px 1px 10px 10px;
  width: 300px;
}
</style>

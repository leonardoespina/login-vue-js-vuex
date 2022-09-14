<template>
  <q-dialog v-model="modal" persistent>
    <q-card style="max-width: 360px; width: 420px; height: 420px">
      <q-bar>
        <div>
          Nuevo Usuario <q-icon name="create_new_folder" color="black" />
        </div>

        <q-space />

        <q-btn dense flat icon="close" @click="open(false)" v-close-popup>
          <q-tooltip>Cerrar</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section>
        <q-form>
         
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
import { useStore } from "vuex";
//import prueba from "./composables";
export default {
  setup() {
    const modal = ref(false);
    const store = useStore();

    //console.log(prueba());

    watchEffect(() => {
      if (store.state.open != false) {
        modal.value = store.state.open;
      }
    });

    const open = (val) => {
      store.dispatch("openDialog", val);
    };

    return { modal, open };
  },
};
</script>
<style>
.contenido {
  padding: 20px 1px 10px 10px;
  width: 150px;
}
</style>

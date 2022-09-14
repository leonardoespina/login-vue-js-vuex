<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-header elevated class="bg-red-9"> <Top /></q-header>
      <q-page class="row justify-center bg-image">
        <div class="column">
          <div class="row">
            <h5 class="text-h6 text-black text-center full-width">
              Bienvenido
            </h5>
          </div>
          <div class="row">
            <q-card square class="q-pa-lg shadow-0" style="background: none">
              <q-card-section>
                <Login @dialog="dialog" /><NuevoRegistro
                  :openDialog="openDialog"
                  @cerrar="cerrar"
                />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-page>

      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import { ref } from "vue";
import Top from "../../components/header/top";

import Login from "../../components/login/login.vue";
import NuevoRegistro from "../../components/login/nuevoRegistro.vue";

export default {
  components: {
    Top,
    Login,
    NuevoRegistro,
  },
  setup() {
    const user = ref(""),
      pass = ref(""),
      loader = ref(false),
      openDialog = ref("");

    const dialog = (dialog) => {
      openDialog.value = dialog;

      console.log(openDialog.value);
    };
    const cerrar = (cerrar) => {
      openDialog.value = cerrar;
    };

    return {
      user,
      pass,
      loader,
      cerrar,

      dialog,
      openDialog,
    };
  },
};
</script>

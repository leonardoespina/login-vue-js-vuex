<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-header elevated class="bg-red-9"> <Top /></q-header>
      <q-page class="window-height window-width row justify-center bg-image">
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
import { useStore } from "vuex";

import { useQuasar } from "quasar";
import { messages } from "../../services/validation";
import { useRouter } from "vue-router";
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
      $q = useQuasar(),
      loader = ref(false),
      openDialog = ref(""),
      router = useRouter();
    const store = useStore();

    const save = (save) => {
      loader.value = store.state.status;

      setTimeout(async () => {
        await store
          .dispatch("LOGIN", {
            user: save.user,
            pass: save.pass,
          })
          .then((res) => {
            console.log(res);
            if (res === true) {
              router.push("/");
            } else {
              $q.notify(messages(res.messages, "negative", "close"));
            }
          })
          .catch((err) => {
            console.log(err);
          });
        loader.value = store.state.status;
      }, 2000);
    };
    const dialog = (dialog) => {
      openDialog.value = dialog;

      console.log(openDialog.value);
    };
    const cerrar = (cerrar) => {
      openDialog.value = cerrar;
    };

    return {
      //  click,
      user,
      pass,
      loader,
      cerrar,
      save,
      dialog,
      openDialog,
    };
  },
};
</script>

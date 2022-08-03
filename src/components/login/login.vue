<template>
  <q-form @submit.prevent="save" class="q-gutter-md">
    <q-input
      square
      filled
      clearable
      label="login"
      v-model="user"
      bg-color="field"
      required
    >
      <template v-slot:prepend>
        <q-icon name="face" color="blue" />
      </template>
    </q-input>
    <q-input
      square
      filled
      clearable
      type="password"
      label="Password"
      v-model="pass"
      bg-color="field"
      required
    >
      <template v-slot:prepend>
        <q-icon name="lock" color="blue" />
      </template>
    </q-input>
    <q-card-actions class="q-px-md">
      <q-btn
        unelevated
        color="red"
        type="submit"
        size="sm"
        v-show="!loaders"
        label="Acceder"
      >
      </q-btn>

      <q-btn
        unelevated
        color="primary"
        size="sm"
        v-show="!loaders"
        label="Registrese"
        @click="registrese"
      />
      <q-circular-progress
        indeterminate
        size="25px"
        color="red"
        class="q-ma-md"
        v-show="loaders"
      />
    </q-card-actions>
  </q-form>
</template>
<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { messages } from "../../services/validation";

export default {
  name: "Login",
  props: ["loader"],

  setup(props, context) {
    const pass = ref(""),
      user = ref(""),
      $q = useQuasar(),
      router = useRouter(),
      store = useStore(),
      openDialog = ref(false),
      loaders = ref(false);

    const registrese = () => {
      openDialog.value = true;
      context.emit("dialog", openDialog.value);
    };

    const save = () => {
      loaders.value = true;

      setTimeout(async () => {
        await store
          .dispatch("LOGIN", { user: user.value, pass: pass.value })
          .then((res) => {
            if (res === true) {
              router.push("/");
            } else {
              $q.notify(messages(res.messages, "negative", "close"));
            }
          })
          .catch((err) => {
            $q.notify(messages(err, "negative", "close"));
          });
        loaders.value = store.state.status;
      }, 2000);
    };

    return { pass, user, save, loaders, registrese };
  },
};
</script>

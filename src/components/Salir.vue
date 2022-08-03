<template>
  <div></div>
</template>
<script>
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const router = useRouter(),
      store = useStore();

    store.dispatch("LOGOUT").then(() => {
      router.push("/");
    });
  },
};
</script>

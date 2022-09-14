<template>
  <q-layout view="hHh lpR fFf">
    <Menu />

    <q-page-container> <router-view /> </q-page-container>
    <Footer />
  </q-layout>
</template>

<script>
import Menu from "./menu/Menu.vue";
import Footer from "../components/header/Footer.vue";

import { useRouter } from "vue-router";
//import { watchEffect } from "vue";

export default {
  components: {
    Menu,
    Footer,
  },
  setup() {
    const route = useRouter();
    const url = route.options.routes[1].path;
    console.log(url);

    /* if (url === "/") {
      alert("hola");
    }*/
    /*route.push("/Inicio");
     */
    return {
      url,
    };
  },
};
</script>

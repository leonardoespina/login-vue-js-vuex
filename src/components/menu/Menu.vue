<template>
  <q-dialog v-model="perfilOpen" persistent>
    <q-card>
      <q-bar>
        <div>Perfil</div>

        <q-space />

        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip>Cerrar</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section> </q-card-section>

      <q-card-section class="q-pt-none"> </q-card-section>
    </q-card>
  </q-dialog>
  <q-header elevated class="bg-red text-white">
    <q-toolbar>
      <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

      <q-toolbar-title>
        <q-avatar> </q-avatar>
      </q-toolbar-title>
      <q-btn dense flat round icon="person">
        <q-menu>
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup @click="perfil">
              <q-item-section>Perfil</q-item-section>
            </q-item>

            <q-separator />
            <q-item clickable v-close-popup to="/Salir">
              <q-item-section>Salir</q-item-section>
            </q-item>
            <q-separator />
          </q-list>
        </q-menu>
      </q-btn>
    </q-toolbar>
  </q-header>

  <q-drawer
    v-model="leftDrawerOpen"
    side="left"
    overlay
    bordered
    :width="200"
    :breakpoint="400"
  >
    <q-scroll-area
      style="
        height: calc(100% - 50px);
        margin-top: 50px;
        border-right: 1px solid #ddd;
      "
    >
      <q-list padding>
        <!--   Inicio    -->
        <q-item
          clickable
          v-ripple
          to="/Inicio"
          exact
          active-class="my-menu-link"
        >
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>

          <q-item-section> Inicio </q-item-section>
        </q-item>
        <!--   Usuario    -->
        <q-item
          clickable
          v-ripple
          to="/Users"
          exact
          active-class="my-menu-link"
        >
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>

          <q-item-section> Usuario </q-item-section>
        </q-item>
        <!--   Otro    -->
        <q-item
          clickable
          v-ripple
          to="/Factura"
          exact
          active-class="my-menu-link"
        >
          <q-item-section avatar>
            <q-icon name="money" />
          </q-item-section>

          <q-item-section> Factura </q-item-section>
        </q-item>
        <!--   Otro    -->
        <q-item
          clickable
          v-ripple
          to="/Productos"
          exact
          active-class="my-menu-link"
        >
          <q-item-section avatar>
            <q-icon name="place" />
          </q-item-section>

          <q-item-section> Productos </q-item-section>
        </q-item>
        <!--   Otro    -->
        <q-item
          clickable
          v-ripple
          to="/Categorias"
          exact
          active-class="my-menu-link"
        >
          <q-item-section avatar>
            <q-icon name="adjust" />
          </q-item-section>

          <q-item-section> Categoria </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script>
import { ref } from "vue";
//import Title from "./Title.vue";

export default {
  name: "Menu",
  components: {
    // Title,
  },
  setup() {
    const leftDrawerOpen = ref(false);
    const perfilOpen = ref(false);
    let userName = ref(JSON.parse(localStorage.getItem("usersStorage")));
    userName = userName.value.user;

    return {
      leftDrawerOpen,

      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      perfilOpen,
      perfil() {
        perfilOpen.value = !perfilOpen.value;
      },
      userName,
    };
  },
};
</script>

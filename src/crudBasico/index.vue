<template>
  <div class="q-pa-md">
    <q-btn color="blue" @click="agregar" :icon="'add'" size="sm"
      >Agregar
    </q-btn>

    <q-table
      :title="cruds.tittleTable"
      :rows="rows"
      :columns="columns"
      :filter="filter"
      row-key="name"
    >
      <template v-slot:top-right>
        <q-input
          rounded
          filled
          clearable
          borderless
          debounce="300"
          v-model="filter"
          placeholder="Buscar"
          bg-color="field"
        >
          <template v-slot:append
            ><q-icon name="search" color="blue"
          /></template>
        </q-input>
      </template>
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width> </q-td>

          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
          <q-td auto-width>
            <q-btn
              color="green"
              :icon="'search'"
              size="sm"
              @click="consultar(props.row._id)"
            >
              <q-tooltip> Consultar</q-tooltip></q-btn
            >
            <q-btn
              @click="editar(props.row._id)"
              color="blue"
              :icon="'edit'"
              size="sm"
            >
              <q-tooltip> Editar</q-tooltip></q-btn
            >
            <q-btn
              color="red"
              :icon="'delete'"
              size="sm"
              @click="eliminar(props.row._id)"
            >
              <q-tooltip> Eliminar</q-tooltip></q-btn
            ></q-td
          >
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
<script>
import { ref, onMounted, watchEffect } from "vue";
//import { column } from "../components/users/services/colums";

/* ../../components/users/services/colums */
//import { useStore } from "vuex";
import { useRouter } from "vue-router";
import crud from "../crudBasico/composables/index";
import { useQuasar } from "quasar";
import { messages } from "../services/validation";

//import Modal from "../../components/productos/modal.vue";

//import { deleteOne } from "../../services/Helper";

//Realizar Busqueda por  Query Pendiente

export default {
  name: "Qtable",
  props: ["variables"],

  setup(props) {
    //console.log(props.variables.columnas);
    let cruds = ref(props.variables);
    const columns = ref(props.variables.columnas),
      filter = ref(""),
      //store = useStore(),
      //    msg = ref(false),
      //    p = ref(""),
      //     list = ref([]),
      $q = useQuasar(),
      router = useRouter(),
      rows = ref([]);

    const { c, e, r, msg, consultaGetter } = crud();
    onMounted(() => {
      c(`${cruds.value.urlConsulta}`, "", cruds.value.user);
      /* store.dispatch("GETALL", cruds.value.urlConsulta);*/
      // rows.value = computed(() => store.getters.islistar);
      watchEffect(() => {
        rows.value = consultaGetter.value.value;

        // rows.value = store.state.getId;
        //rows.value = consultaGetter.value.value;
      });
    });

    /* onUpdated(() => {
      watch(
        () => consultaGetter.value.value,
        (listaOld, listNew) => {
          console.dir({ listaOld, listNew });
        }
      );
    });*/

    const eliminar = (id) => {
      e(id, `${cruds.value.urlEliminar}`);
      //c(`${cruds.value.urlConsulta}`, "", cruds.value.user);
      $q.notify(messages(msg.value, "negative", "check", "normal"));
      //router.go(`${cruds.value.urlRouterTabla}`);
    };
    const editar = (id) => {
      let url = `${cruds.value.urlRouterEditar}${id}`;

      r(url);
    };
    const consultar = (id) => {
      let url = `${cruds.value.urlRouterConsulta}${id}`;

      r(url);
    };
    const agregar = () => {
      router.push(`${cruds.value.urlRouterAgregar}`);
    };

    return {
      columns,
      filter,
      rows,
      eliminar,
      editar,
      consultar,
      agregar,
      cruds,
    };
  },
};
</script>
<style>
.contenido {
  padding: 20px 1px 10px 10px;
  width: 300px;
}
</style>

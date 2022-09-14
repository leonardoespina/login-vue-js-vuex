<template>
  <div class="q-pa-md">
    <q-card class="my-card">
      <q-card-section class="bg-red text-white">FACTURA </q-card-section>
      <q-form @submit.prevent="agregarProducto(model)">
        <q-card-actions>
          <div class="row">
            <div class="contenido">
              <q-select
                ref="idRef"
                class="col-12 col-sm-3"
                v-model="model"
                use-input
                @change="valores"
                :options="selectProductos"
                label="Producto"
              >
                <template v-slot:prepend>
                  <q-icon name="search" color="black" />
                </template>
                <template v-slot:no-option>
                  <q-item
                    ><q-item-section> Registro Vacio</q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="contenido">
              <q-input
                type="text"
                v-model="model.cantidad"
                label="Stock"
                disable
                required
              />
            </div>
            <div class="contenido">
              <q-input
                type="number"
                v-model="model.precio"
                label="precio"
                disable
                required
              />
            </div>

            <div class="contenido">
              <q-input
                type="number"
                ref="cantidad"
                @change="calcular"
                v-model="model.cantidadProducto"
                label="Cantidad"
                required
                lazy-rules
                :rules="[
                  (val) =>
                    (val <= model.cantidad && val > 0) ||
                    'No puede ser cero o mayor que el Stock',
                  required,
                ]"
              />
            </div>
            <div class="contenido">
              <q-input
                type="number"
                v-model="model.totalProducto"
                label="precio"
                required
                disable
              />
            </div>
            <div class="contenido">
              <q-btn type="submit" color="red" :icon="'+'" />
            </div>
          </div>
        </q-card-actions>
      </q-form>
    </q-card>

    <q-table title="" :rows="rows" :columns="columns" row-key="name">
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
              color="red"
              :icon="'delete'"
              size="sm"
              @click="eliminar(props.row.value)"
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
import {ref /*, watchEffect */} from 'vue';
import {column} from '../../components/factura/services/colums';
import {required} from '../../services/validation.js';
import {useQuasar} from 'quasar';

//import crud from "../../crudBasico/composables/index";
//import { useStore } from "vuex";
//import { useRouter } from "vue-router";

//import { useQuasar } from "quasar";
import {messages} from '../../services/validation';
//import notificacion from "../../components/users/composables/index.js";
//import { deleteOne } from "../../services/Helper";

//Realizar Busqueda por  Query Pendiente

export default {
  name: 'Qtable',
  props: ['productos'],

  setup(props) {
    const columns = ref(column()),
      filter = ref(''),
      model = ref([]),
      //  producto = ref([]),
      //   cantidad = ref(),
      //    factura = ref({}),
      // vectorFactura = ref([]),
      //   facturaTotal = ref([]),
      selectProductos = ref(props.productos),
      //    store = useStore(),
      //   msg = ref(false),
      $q = useQuasar(),
      // route = useRouter(),
      rows = ref([]);
    //const { c, /*consultaGetter/*,storeProductosAdd/*,getterListProducto*/ } = crud();

    /*onMounted(() => {
      watch(
        () => consultaGetter.value,
        (antes, despues) => {
          console.dir({ antes, despues });
        }
      );
    });
*/

    /*   watchEffect(() => {
      console.log(getterProducto.value);
    });*/

    const eliminar = (val) => {
      rows.value = rows.value.filter((todo) => todo.value !== val);
      $q.notify(messages('Producto Eliminado', 'negative', 'check', 'normal'));
    };
    const valores = () => {
      model.value.cantidadProducto = 1;
    };
    const calcular = () => {
      if (
        parseInt(model.value.cantidadProducto) <=
          parseInt(model.value.cantidad) &&
        parseInt(model.value.cantidadProducto) > 0
      ) {
        model.value.totalProducto =
          model.value.cantidad * model.value.cantidadProducto;
      } else {
        model.value.totalProducto = 0;
      }
    };

    const agregarProducto = (val) => {
      console.log(val.cantidad, val.cantidadProducto);

      console.log(parseInt(val.cantidadProducto));

      const resultado = rows.value.find((e) => {
        if (e.value === val.value) {
          return e;
        }
      });
      if (resultado === undefined) {
        rows.value.push(val);
      }
    };

    return {
      columns,
      filter,
      rows,
      selectProductos,
      model,
      required,
      calcular,
      eliminar,

      valores,
      //  buscar,
      //   cantidad,
      agregarProducto,
    };
  },
};
</script>
<style>
.contenido {
  padding: 20px 1px 10px 10px;
  width: 190px;
}
</style>

<template>
  <div class="q-pa-md">
    <q-card class="my-card">
      <q-card-section class="bg-red text-white">FACTURA </q-card-section>
      <q-form @submit.prevent="agregarProducto">
        <q-card-actions>
          <div class="row">
            <div class="contenido">
              <q-select
                class="col-12 col-sm-3"
                v-model="model.producto"
                use-input
                :options="selectProductos"
                label="Producto"
                @update:model-value="buscar"
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
                type="number"
                v-model="cantidad"
                label="Cantidad"
                required
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
import { ref, watchEffect } from "vue";
import { column } from "../../components/factura/services/colums";
import crud from "../../crudBasico/composables/index";
//import { useStore } from "vuex";
//import { useRouter } from "vue-router";

//import { useQuasar } from "quasar";
//import { messages } from "../../services/validation";
//import notificacion from "../../components/users/composables/index.js";
//import { deleteOne } from "../../services/Helper";

//Realizar Busqueda por  Query Pendiente

export default {
  name: "Qtable",
  props: ["productos"],

  setup(props) {
    const columns = ref(column()),
      filter = ref(""),
      model = ref([]),
      producto = ref([]),
      cantidad = ref(),
      factura = ref({}),
     // vectorFactura = ref([]),
   //   facturaTotal = ref([]),
      selectProductos = ref(props.productos),
      //    store = useStore(),
      //   msg = ref(false),
      //   $q = useQuasar(),
      // route = useRouter(),
      rows = ref([]);
    const { c, consultaGetter,storeProductosAdd/*,getterListProducto*/ } = crud();

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

    const buscar = () => {
      let _id = model.value["producto"].value;
      console.log(_id);

      // c("/productos/getSelect/", "", false);

      c("/productos/getId/", `${_id}`, null);

      watchEffect(() => {
        producto.value = consultaGetter.value.value;

        console.log(producto.value);

        for (let listCat in producto.value) {
          Object.assign(factura.value, {
            _id:producto.value[listCat]._id,
            cantidad: producto.value[listCat].cantidad,
            producto: producto.value[listCat].producto,
            precio: producto.value[listCat].precio,
          });
        }

        //producto.value = producto.value[0].cantidad;
      });
      /*  Object.assign(factura.value, {
        cantidad: model.value["producto"].cantidad,
      });*/
    };

    const agregarProducto = () => {
      if (cantidad.value > 0 && factura.value["cantidad"] > 0) {
      let id=factura.value["_id"];
        
    let listProductos={
      _id:factura.value["_id"],
      cantidad:cantidad.value,
      producto: factura.value["producto"],
      precio:factura.value["precio"],

    };
   //console.log(listProductos);


           rows.value.push(listProductos);
           
          // console.log(vectorFactura.value);
            
          // let index= rows.value.findIndex(producto=>producto);

          let busqueda=rows.value.filter((producto)=> producto._id.indexOf(id)>-1);

           console.log(busqueda);
             
           storeProductosAdd(listProductos);
      //  facturaTotal.value.push(vectorFactura.value);

         /*  facturaTotal.value.findIndex((res) => {
          console.log(res.producto);
        }); */

        //facturaTotal.value

      
      //  console.log(getterListProducto.value);
      }
    };

    return {
      columns,
      filter,
      rows,
      selectProductos,
      model,
      buscar,
      cantidad,
      agregarProducto,
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

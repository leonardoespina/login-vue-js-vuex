import {ref, computed} from 'vue';
import store from '../../store/index';
import {useRouter} from 'vue-router';

const crud = () => {
  const consultaGetter = ref([]),
    route = useRouter(),
    getterListProducto = ref([]),
    getterProducto = ref([]),
    msg = ref('');

  const c = (url, id, user) => {
    let payload = {};
    payload = {
      url,
      id,
      user,
    };

    store.dispatch('GET', payload);

    consultaGetter.value = computed(() => store.getters.islistar);
  };
  const storeProductos = (url, id, user) => {
    let payload = {};
    payload = {
      url,
      id,
      user,
    };

    store.dispatch('PRODUCTOS', payload);

    getterProducto.value = computed(() => store.getters.isListProductos);
  };
  const e = (id, endPoint) => {
    let payload = {
      id,
      endPoint,
    };
    store.dispatch('eliminar', payload);
    msg.value = computed(() => store.getters.isMsg);
  };
  const r = (url) => {
    route.push(url);
  };
  const u = (pay, endPoint) => {
    let payload = {
      pay,
      endPoint,
    };

    store.dispatch('UPDATE', payload);
    msg.value = computed(() => store.getters.isMsg);
  };

  const save = (payload) => {
    store.dispatch('POST', payload);
    msg.value = computed(() => store.getters.isMsg);
  };

  const dialogOpen = (val) => {
    store.dispatch('openDialog', val);
  };
  const storeProductosList = (val) => {
    store.dispatch('PRODUCTOS_LIST', val);
  };
  const storeProductosAdd = (val) => {
    store.dispatch('PRODUCTOS_LIST', val);
    getterListProducto.value = store.getters.addProductos;
  };

  return {
    c,
    e,
    r,
    u,
    consultaGetter,

    msg,
    dialogOpen,
    save,
    storeProductos,
    storeProductosList,
    getterProducto,
    storeProductosAdd,
    getterListProducto,
  };
};

export default crud;

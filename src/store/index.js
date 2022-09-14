import {createStore} from 'vuex';

import {
  post,
  sessionStorage,
  save,
  selectToken,
  GET,
  POST,
  deleteOne,
  buscarGetId,
  update,
  GETALL,
} from '../services/Helper';

export default createStore({
  state: {
    status: false,
    open: false,
    accion: '',
    listUsers: [],
    listUpdate: [],
    getId: [],
    listProducto: [],
    vectorFactura: [],
    mensaje: '',
  },
  mutations: {
    AUTH_REQUEST(state, status) {
      state.status = status;
    },
    AUTH_SUCCESS(state, status) {
      state.status = status;
    },
    OPEN_DIALOG(state, open) {
      state.open = open;
    },
    mensajeApi(state, mensaje) {
      state.mensaje = mensaje;
    },
    async setUser(state) {
      await selectToken().then((res) => {
        state.listUsers = res.data;
      });
    },

    getUser(state, getId) {
      state.getId = getId;
      console.log(state.getId);
    },
    getProducto(state, data) {
      state.listProducto = data;
      console.log(state.data);
    },
    removeList(state, _id) {
      state.getId = state.getId.filter((todo) => todo._id !== _id);
    },
    addList(state, data) {
      state.vectorFactura.push(data);
    },
    async getUpdate(state, url) {
      await GETALL(url).then((res) => {
        console.log(res.data);
        state.listUpdate = res.data;
      });
    },
  },
  actions: {
    LOGIN({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST', true);
        post('login/signIn', {username: user.user, password: user.pass})
          .then((response) => {
            if (response.status === 200) {
              commit('AUTH_SUCCESS', false);
              sessionStorage(response.data);
              resolve(true);
            } else if (response.status === 203) {
              commit('AUTH_SUCCESS', false);
              let error = {};

              Object.assign(error, {
                status: response.status,
                messages: response.data,
              });
              resolve(error);
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    REGISTRO({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST', true);
        save('/login/signUpOff', user)
          .then((res) => {
            commit('AUTH_SUCCESS', true);

            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    LOGOUT() {
      return new Promise((resolve) => {
        //commit("AUTH_SUCCESS", false);
        localStorage.removeItem('token');
        localStorage.removeItem('usersStorage');
        resolve();
      });
    },
    OPEN({commit}, open) {
      commit('OPEN_DIALOG', open);
    },

    eliminar({commit}, payload) {
      return new Promise((resolve) => {
        //commit("AUTH_SUCCESS", false);
        const {id, endPoint} = payload;

        deleteOne(id, endPoint).then((res) => {
          resolve();

          console.log(res.status);
          if (res.status === 208) {
            commit('mensajeApi', res.data);
            commit('removeList', id);
          } else {
            commit('mensajeApi', res.data);
          }
        });
      });
    },
    buscar({commit}, payload) {
      return new Promise((resolve) => {
        const {endPoint} = payload;
        buscarGetId(endPoint).then((resul) => {
          commit('getUser', resul.data);
        });
        resolve();
      });
    },
    UPDATE({commit}, payload) {
      return new Promise((resolve) => {
        const {endPoint, pay} = payload;
        update(endPoint, pay).then((res) => {
          resolve();

          if (res.status === 208) {
            commit('mensajeApi', res.data);
          } else {
            commit('mensajeApi', 'Error');
          }
        });
      });
    },
    openDialog({commit}, Open) {
      commit('OPEN_DIALOG', Open);
    },

    async GET({commit}, payload) {
      commit('getUser', []);
      const {url, id, user} = payload;

      await GET(url, id, user).then((res) => {
        commit('getUser', res.data);
      });
    },
    async PRODUCTOS({commit}, payload) {
      const {url, id, user} = payload;

      await GET(url, id, user).then((res) => {
        commit('getProducto', res.data);
      });
    },
    PRODUCTOS_LIST({commit}, data) {
      commit('addList', data);
    },
    async POST({commit}, payload) {
      const {url} = payload;
      console.log(payload);
      await POST(url, payload).then((res) => {
        if (res.status === 208) {
          commit('mensajeApi', res.data);
        } else {
          commit('mensajeApi', 'Error');
        }
      });
    },
    GETALL({commit}, url) {
      return new Promise((resolve) => {
        commit('getUpdate', url);
        resolve();
      });
    },
  },
  getters: {
    islistar: (state) => state.getId,
    isMsg: (state) => state.mensaje,
    isListProductos: (state) => state.listProducto,
    addProductos: (state) => state.vectorFactura,
    isErase: (state) => (state.getId = []),
  },
});

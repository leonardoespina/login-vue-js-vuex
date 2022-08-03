import { createStore } from "vuex";

import { post, sessionStorage, save } from "../services/Helper";

export default createStore({
  state: {
    status: false,
    open: false,
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
  },
  actions: {
    LOGIN({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("AUTH_REQUEST", true);
        post("login/signIn", { username: user.user, password: user.pass })
          .then((response) => {
            if (response.status === 200) {
              commit("AUTH_SUCCESS", false);
              sessionStorage(response.data);
              resolve(true);
            } else if (response.status === 203) {
              commit("AUTH_SUCCESS", false);
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
    REGISTRO({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("AUTH_REQUEST", true);
        save("/login/signUpOff", user)
          .then((res) => {
            commit("AUTH_SUCCESS", true);

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
        localStorage.removeItem("token");
        localStorage.removeItem("usersStorage");
        resolve();
      });
    },
    OPEN({ commit }, open) {
      commit("OPEN_DIALOG", open);
    },
  },
});

import axios from "axios";
let data = undefined;
let user = undefined;

////01//////LOGIN

export async function post(url, payload) {
  //post de Inicio login//
  if (url) {
    data = await axios.post(url, payload);
    return data;
  }
}
////02/////LOCALSTORAGE->ALMACENAR DATOS
export function sessionStorage(data) {
  const { token, user, _id, Admin, cedula } = data;
  const ls = localStorage;
  let usersData = {
    user,
    id: _id,
    isAdmin: Admin,
    cedula,
  };
  ls.setItem("token", token);
  ls.setItem("usersStorage", JSON.stringify(usersData));
}

////03/////BUSCAR///////

export async function get(url, val) {
  if (url && val) {
    data = await axios.get(`${url}${val}`);
    return data;
  }
}
////04////
export async function search(val, campo, ruta) {
  return new Promise((resolve) => {
    setTimeout(() => {
      axios
        .get(`${ruta}${val}`)
        .then((response) => {
          let resul = response.data;

          resolve(!resul.length || `* ${campo}  ya existe`);
        })
        .catch((err) => {
          console.log(err);
          //message("Problemas de Conexion API", "negative", "delete");
        });
    }, 1000);
  });
}
///05/////GUARDAR INFORMACION///
export async function save(url, payload) {
  if (url) {
    console.log(payload);
    data = await axios.post(url, payload);
    return data;
  }

  ////if token =false hacer el post si auntenticar ///modificar
}
export async function select(url) {
  data = await axios.get(url);
  return data;
}

export function userLocal() {
  user = JSON.parse(localStorage.getItem("usersStorage"));

  user = {
    user: user.user,
    cedula: user.cedula,
  };
  return user;
}

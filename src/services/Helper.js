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
//const token = localStorage.getItem("token");

const tokens = () => {
  let data = localStorage.getItem("token");
  return data;
};
const userNames = () => {
  let data = JSON.parse(localStorage.getItem("usersStorage"));
  return data;
};
export function userCreate() {
  let data = userNames();

  data = {
    id: data.id,
    user: data.user,
  };
  return data;
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
export async function POST(url, payload) {
  if (url) {
    let token = tokens();

    console.log(payload);
    data = await axios.post(url, payload, {
      headers: { authorization: token },
    });
    return data;
  }

  ////if token =false hacer el post si auntenticar ///modificar
}

export async function update(url, pay) {
  if (url) {
    let token = tokens();
    const data = await axios.put(url, pay, {
      headers: { authorization: token },
    });
    return data;
  }
}

export async function select(url) {
  data = await axios.get(url);
  return data;
}

export async function selectToken() {
  let userName = userNames();
  let token = tokens();
  userName = userName.id;
  data = await axios.get(`users/${userName}`, {
    headers: { authorization: token },
  });
  return data;
}

export async function GET(url, id, user) {
  let userName = userNames();

  let token = tokens();
  user;

  let endPoint = "";
  userName = userName.id;

  if (id != "") {
    /*****click para acceder  */
    endPoint = `${url}${id}`;
    console.log(id);
  } else if (user === true) {
    console.log(id);
    endPoint = `${url}${userName}`;
  } else {
    endPoint = url;
  }

  data = await axios.get(endPoint, {
    headers: { authorization: token },
  });
  return data;
}

export async function GETALL(url) {
  let token = tokens();

  data = await axios.get(url, {
    headers: { authorization: token },
  });
  return data;
}

export async function deleteOne(id, endPoint) {
  let token = tokens();

  const datas = await axios.delete(endPoint, {
    headers: { authorization: token },
    data: { id: id },
  });
  return datas;
}
export async function buscarGetId(endPoint) {
  let token = tokens();
  const datas = await axios.get(endPoint, {
    headers: { authorization: token },
  });
  return datas;
}

export function userLocal() {
  user = JSON.parse(localStorage.getItem("usersStorage"));

  user = {
    user: user.user,
    cedula: user.cedula,
  };
  return user;
}

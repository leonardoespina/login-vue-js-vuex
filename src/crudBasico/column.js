const col = [
  // column Object definition

  {
    name: "Usuario",
    required: true,
    label: "Usuario",
    align: "left",
    field: (row) => row.username,
    sortable: true,
  },
  {
    name: "Cedula",
    required: true,
    label: "Cedula",
    align: "left",
    field: (row) => row.cedula,

    sortable: true,
  },
  {
    name: "lastname",
    required: true,
    label: "Nombre y Apellido",
    align: "left",
    field: (row) => row.lastname,

    sortable: true,
  },
  {
    name: "Fecha",
    required: true,
    label: "Fecha de Creacion",
    align: "left",
    field: (row) => row.createdAt,

    sortable: true,
  },
  {
    name: "FechaModificacion",
    required: true,
    label: "Fecha de Modificacion",
    align: "left",
    field: (row) => row.updatedAt,
    sortable: true,
  },
];
const categorias = [
  // column Object definition

  {
    name: "categoria",
    required: true,
    label: "Categoria",
    align: "left",
    field: (row) => row.categorias,
    sortable: true,
  },
  {
    name: "fecha",
    required: true,
    label: "Fecha de Creacion",
    align: "left",
    field: (row) => row.createdAt,
    sortable: true,
  },
  {
    name: "usuario",
    required: true,
    label: "Usuario Creador",
    align: "left",
    field: (row) => row.userCreate.user,
    sortable: true,
  },
];
const productos = [
  // column Object definition

  {
    name: "producto",
    required: true,
    label: "Producto",
    align: "left",
    field: (row) => row.producto,
    sortable: true,
  },
  {
    name: "cantidad",
    required: true,
    label: "Cantidad",
    align: "left",
    field: (row) => row.cantidad,
    sortable: true,
  },
  {
    name: "precio",
    required: true,
    label: "Precio",
    align: "left",
    field: (row) => row.precio,
    sortable: true,
  },
  {
    name: "categoria",
    required: true,
    label: "categoria",
    align: "left",
    field: (row) => row.categorias[0].categorias,
    sortable: true,
  },
];
export function column(val) {
  if (val === "user") {
    return col;
  }
  if (val === "categorias") {
    return categorias;
  }
  if (val === "productos") {
    return productos;
  }
}
const isAdminOpc = [
  {
    label: "Administrador",
    value: true,
  },
  {
    label: "Usuario",
    value: false,
  },
];
export function isAdmin() {
  return isAdminOpc;
}

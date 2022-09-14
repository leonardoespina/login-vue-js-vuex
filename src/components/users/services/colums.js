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
export function column() {
  return col;
}

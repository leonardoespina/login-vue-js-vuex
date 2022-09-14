const col = [
  // column Object definition

  {
    name: 'cantidad',
    required: true,
    label: 'Cantidad',
    align: 'left',
    field: (row) => row.cantidadProducto,
    sortable: true,
  },
  {
    name: 'producto',
    required: true,
    label: 'Producto',
    align: 'left',
    field: (row) => row.label,

    sortable: true,
  },
  {
    name: 'precio',
    required: true,
    label: 'Precio',
    align: 'left',
    field: (row) => row.precio,

    sortable: true,
  },
  /*  {
    name: "precioUnitario",
    required: true,
    label: "Precio Unitario",
    align: "left",
    field: (row) => row.createdAt,

    sortable: true,
  },*/
  {
    name: 'total',
    required: true,
    label: 'Total',
    align: 'left',
    field: (row) => {
      if (
        parseInt(row.cantidadProducto) <= parseInt(row.cantidad) &&
        parseInt(row.cantidadProducto) > 0
      ) {
        return row.totalProducto;
      } else {
        return (row.totalProducto = 0);
      }
    },
    sortable: true,
  },
];
export function column() {
  return col;
}

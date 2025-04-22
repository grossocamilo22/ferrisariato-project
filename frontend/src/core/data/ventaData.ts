
import { Venta } from "../models/Venta";
import { clientesData } from "./clienteData";
import { productosData } from "./productoData";

export const ventasData: Venta[] = [
  {
    id: "v001",
    cliente: clientesData[0],
    detalles: [
      {
        id: "dv001",
        producto: productosData[0],
        cantidad: 2,
        subtotal: 31.98
      },
      {
        id: "dv002",
        producto: productosData[1],
        cantidad: 1,
        subtotal: 5.5
      }
    ],
    total: 37.48,
    fecha: new Date("2023-05-15T09:23:45")
  },
  {
    id: "v002",
    cliente: clientesData[2],
    detalles: [
      {
        id: "dv003",
        producto: productosData[4],
        cantidad: 5,
        subtotal: 11.5
      },
      {
        id: "dv004",
        producto: productosData[5],
        cantidad: 1,
        subtotal: 12.99
      }
    ],
    total: 24.49,
    fecha: new Date("2023-05-16T14:12:30")
  },
  {
    id: "v003",
    cliente: clientesData[5],
    detalles: [
      {
        id: "dv005",
        producto: productosData[7],
        cantidad: 3,
        subtotal: 12.75
      },
      {
        id: "dv006",
        producto: productosData[8],
        cantidad: 2,
        subtotal: 7.98
      }
    ],
    total: 20.73,
    fecha: new Date("2023-05-17T11:45:15")
  },
  {
    id: "v004",
    cliente: clientesData[3],
    detalles: [
      {
        id: "dv007",
        producto: productosData[10],
        cantidad: 1,
        subtotal: 22.99
      }
    ],
    total: 22.99,
    fecha: new Date("2023-05-18T16:30:22")
  },
  {
    id: "v005",
    cliente: clientesData[7],
    detalles: [
      {
        id: "dv008",
        producto: productosData[12],
        cantidad: 4,
        subtotal: 27.96
      },
      {
        id: "dv009",
        producto: productosData[13],
        cantidad: 1,
        subtotal: 14.5
      }
    ],
    total: 42.46,
    fecha: new Date("2023-05-19T10:15:33")
  },
  {
    id: "v006",
    cliente: clientesData[1],
    detalles: [
      {
        id: "dv010",
        producto: productosData[15],
        cantidad: 20,
        subtotal: 17.0
      },
      {
        id: "dv011",
        producto: productosData[16],
        cantidad: 2,
        subtotal: 14.5
      }
    ],
    total: 31.5,
    fecha: new Date("2023-05-20T13:45:10")
  },
  {
    id: "v007",
    cliente: clientesData[4],
    detalles: [
      {
        id: "dv012",
        producto: productosData[18],
        cantidad: 1,
        subtotal: 6.5
      },
      {
        id: "dv013",
        producto: productosData[19],
        cantidad: 1,
        subtotal: 9.99
      }
    ],
    total: 16.49,
    fecha: new Date("2023-05-21T17:20:05")
  },
  {
    id: "v008",
    cliente: clientesData[6],
    detalles: [
      {
        id: "dv014",
        producto: productosData[2],
        cantidad: 10,
        subtotal: 12.0
      },
      {
        id: "dv015",
        producto: productosData[3],
        cantidad: 5,
        subtotal: 18.75
      }
    ],
    total: 30.75,
    fecha: new Date("2023-05-22T08:30:45")
  },
  {
    id: "v009",
    cliente: clientesData[9],
    detalles: [
      {
        id: "dv016",
        producto: productosData[6],
        cantidad: 2,
        subtotal: 37.0
      },
      {
        id: "dv017",
        producto: productosData[9],
        cantidad: 3,
        subtotal: 7.5
      }
    ],
    total: 44.5,
    fecha: new Date("2023-05-23T15:10:20")
  },
  {
    id: "v010",
    cliente: clientesData[8],
    detalles: [
      {
        id: "dv018",
        producto: productosData[11],
        cantidad: 1,
        subtotal: 15.75
      },
      {
        id: "dv019",
        producto: productosData[14],
        cantidad: 2,
        subtotal: 17.98
      }
    ],
    total: 33.73,
    fecha: new Date("2023-05-24T12:05:18")
  },
  {
    id: "v011",
    cliente: clientesData[10],
    detalles: [
      {
        id: "dv020",
        producto: productosData[17],
        cantidad: 1,
        subtotal: 5.99
      },
      {
        id: "dv021",
        producto: productosData[0],
        cantidad: 1,
        subtotal: 15.99
      }
    ],
    total: 21.98,
    fecha: new Date("2023-05-25T09:45:30")
  },
  {
    id: "v012",
    cliente: clientesData[12],
    detalles: [
      {
        id: "dv022",
        producto: productosData[5],
        cantidad: 2,
        subtotal: 25.98
      },
      {
        id: "dv023",
        producto: productosData[7],
        cantidad: 1,
        subtotal: 4.25
      }
    ],
    total: 30.23,
    fecha: new Date("2023-05-26T14:20:15")
  },
  {
    id: "v013",
    cliente: clientesData[14],
    detalles: [
      {
        id: "dv024",
        producto: productosData[10],
        cantidad: 1,
        subtotal: 22.99
      },
      {
        id: "dv025",
        producto: productosData[12],
        cantidad: 2,
        subtotal: 13.98
      }
    ],
    total: 36.97,
    fecha: new Date("2023-05-27T11:10:40")
  },
  {
    id: "v014",
    cliente: clientesData[16],
    detalles: [
      {
        id: "dv026",
        producto: productosData[15],
        cantidad: 50,
        subtotal: 42.5
      },
      {
        id: "dv027",
        producto: productosData[16],
        cantidad: 10,
        subtotal: 72.5
      }
    ],
    total: 115.0,
    fecha: new Date("2023-05-28T16:45:22")
  },
  {
    id: "v015",
    cliente: clientesData[18],
    detalles: [
      {
        id: "dv028",
        producto: productosData[19],
        cantidad: 1,
        subtotal: 9.99
      },
      {
        id: "dv029",
        producto: productosData[18],
        cantidad: 1,
        subtotal: 6.5
      }
    ],
    total: 16.49,
    fecha: new Date("2023-05-29T10:30:55")
  },
  {
    id: "v016",
    cliente: clientesData[1],
    detalles: [
      {
        id: "dv030",
        producto: productosData[3],
        cantidad: 3,
        subtotal: 11.25
      },
      {
        id: "dv031",
        producto: productosData[4],
        cantidad: 8,
        subtotal: 18.4
      }
    ],
    total: 29.65,
    fecha: new Date("2023-05-30T13:15:10")
  },
  {
    id: "v017",
    cliente: clientesData[3],
    detalles: [
      {
        id: "dv032",
        producto: productosData[6],
        cantidad: 1,
        subtotal: 18.5
      },
      {
        id: "dv033",
        producto: productosData[8],
        cantidad: 1,
        subtotal: 3.99
      }
    ],
    total: 22.49,
    fecha: new Date("2023-05-31T17:25:30")
  },
  {
    id: "v018",
    cliente: clientesData[5],
    detalles: [
      {
        id: "dv034",
        producto: productosData[11],
        cantidad: 2,
        subtotal: 31.5
      },
      {
        id: "dv035",
        producto: productosData[13],
        cantidad: 1,
        subtotal: 14.5
      }
    ],
    total: 46.0,
    fecha: new Date("2023-06-01T09:40:20")
  },
  {
    id: "v019",
    cliente: clientesData[7],
    detalles: [
      {
        id: "dv036",
        producto: productosData[14],
        cantidad: 3,
        subtotal: 26.97
      },
      {
        id: "dv037",
        producto: productosData[17],
        cantidad: 2,
        subtotal: 11.98
      }
    ],
    total: 38.95,
    fecha: new Date("2023-06-02T14:50:15")
  },
  {
    id: "v020",
    cliente: clientesData[9],
    detalles: [
      {
        id: "dv038",
        producto: productosData[19],
        cantidad: 1,
        subtotal: 9.99
      },
      {
        id: "dv039",
        producto: productosData[0],
        cantidad: 1,
        subtotal: 15.99
      },
      {
        id: "dv040",
        producto: productosData[1],
        cantidad: 1,
        subtotal: 5.5
      }
    ],
    total: 31.48,
    fecha: new Date("2023-06-03T11:30:45")
  }
];
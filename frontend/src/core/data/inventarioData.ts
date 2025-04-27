import { Inventario } from "../models/Inventario";
import { productosData } from "./productoData";

export const inventarioData: Inventario[] = [
    {
      id: "1",
      producto: productosData[0], // Martillo de carpintero
      stock: 42,
      ultimaActualizacion: new Date("2023-11-15")
    },
    {
      id: "2",
      producto: productosData[1], // Destornillador plano
      stock: 87,
      ultimaActualizacion: new Date("2023-11-14")
    },
    {
      id: "3",
      producto: productosData[2], // Cable eléctrico 2.5mm
      stock: 235,
      ultimaActualizacion: new Date("2023-11-16")
    },
    {
      id: "4",
      producto: productosData[3], // Interruptor simple
      stock: 56,
      ultimaActualizacion: new Date("2023-11-13")
    },
    {
      id: "5",
      producto: productosData[4], // Tubo PVC 20mm
      stock: 124,
      ultimaActualizacion: new Date("2023-11-17")
    },
    {
      id: "6",
      producto: productosData[5], // Llave inglesa ajustable
      stock: 38,
      ultimaActualizacion: new Date("2023-11-12")
    },
    {
      id: "7",
      producto: productosData[6], // Pintura blanca mate
      stock: 29,
      ultimaActualizacion: new Date("2023-11-18")
    },
    {
      id: "8",
      producto: productosData[7], // Rodillo de pintura
      stock: 73,
      ultimaActualizacion: new Date("2023-11-11")
    },
    {
      id: "9",
      producto: productosData[8], // Tornillo para madera 4x40
      stock: 512,
      ultimaActualizacion: new Date("2023-11-19")
    },
    {
      id: "10",
      producto: productosData[9], // Taco plástico 6mm
      stock: 324,
      ultimaActualizacion: new Date("2023-11-10")
    },
    {
      id: "11",
      producto: productosData[10], // Tijeras de podar
      stock: 19,
      ultimaActualizacion: new Date("2023-11-20")
    },
    {
      id: "12",
      producto: productosData[11], // Manguera de jardín
      stock: 27,
      ultimaActualizacion: new Date("2023-11-09")
    },
    {
      id: "13",
      producto: productosData[12], // Bombilla LED 9W
      stock: 94,
      ultimaActualizacion: new Date("2023-11-21")
    },
    {
      id: "14",
      producto: productosData[13], // Plafón luminoso
      stock: 15,
      ultimaActualizacion: new Date("2023-11-08")
    },
    {
      id: "15",
      producto: productosData[14], // Cemento rápido
      stock: 37,
      ultimaActualizacion: new Date("2023-11-22")
    },
    {
      id: "16",
      producto: productosData[15], // Ladrillo hueco
      stock: 850,
      ultimaActualizacion: new Date("2023-11-07")
    },
    {
      id: "17",
      producto: productosData[16], // Guantes de trabajo
      stock: 62,
      ultimaActualizacion: new Date("2023-11-23")
    },
    {
      id: "18",
      producto: productosData[17], // Gafas de seguridad
      stock: 45,
      ultimaActualizacion: new Date("2023-11-06")
    },
    {
      id: "19",
      producto: productosData[18], // Cinta métrica 5m
      stock: 31,
      ultimaActualizacion: new Date("2023-11-24")
    },
    {
      id: "20",
      producto: productosData[19], // Nivel de burbuja
      stock: 23,
      ultimaActualizacion: new Date("2023-11-05")
    }
  ];
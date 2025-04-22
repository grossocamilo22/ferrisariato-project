import { Inventario } from "../models/Inventario";
import { productosData } from "./productoData";

export const inventarioData: Inventario[] = [
    {
      id: "1",
      producto: productosData[0], // Martillo de carpintero
      cantidad: 42,
      ultimaActualizacion: new Date("2023-11-15")
    },
    {
      id: "2",
      producto: productosData[1], // Destornillador plano
      cantidad: 87,
      ultimaActualizacion: new Date("2023-11-14")
    },
    {
      id: "3",
      producto: productosData[2], // Cable eléctrico 2.5mm
      cantidad: 235,
      ultimaActualizacion: new Date("2023-11-16")
    },
    {
      id: "4",
      producto: productosData[3], // Interruptor simple
      cantidad: 56,
      ultimaActualizacion: new Date("2023-11-13")
    },
    {
      id: "5",
      producto: productosData[4], // Tubo PVC 20mm
      cantidad: 124,
      ultimaActualizacion: new Date("2023-11-17")
    },
    {
      id: "6",
      producto: productosData[5], // Llave inglesa ajustable
      cantidad: 38,
      ultimaActualizacion: new Date("2023-11-12")
    },
    {
      id: "7",
      producto: productosData[6], // Pintura blanca mate
      cantidad: 29,
      ultimaActualizacion: new Date("2023-11-18")
    },
    {
      id: "8",
      producto: productosData[7], // Rodillo de pintura
      cantidad: 73,
      ultimaActualizacion: new Date("2023-11-11")
    },
    {
      id: "9",
      producto: productosData[8], // Tornillo para madera 4x40
      cantidad: 512,
      ultimaActualizacion: new Date("2023-11-19")
    },
    {
      id: "10",
      producto: productosData[9], // Taco plástico 6mm
      cantidad: 324,
      ultimaActualizacion: new Date("2023-11-10")
    },
    {
      id: "11",
      producto: productosData[10], // Tijeras de podar
      cantidad: 19,
      ultimaActualizacion: new Date("2023-11-20")
    },
    {
      id: "12",
      producto: productosData[11], // Manguera de jardín
      cantidad: 27,
      ultimaActualizacion: new Date("2023-11-09")
    },
    {
      id: "13",
      producto: productosData[12], // Bombilla LED 9W
      cantidad: 94,
      ultimaActualizacion: new Date("2023-11-21")
    },
    {
      id: "14",
      producto: productosData[13], // Plafón luminoso
      cantidad: 15,
      ultimaActualizacion: new Date("2023-11-08")
    },
    {
      id: "15",
      producto: productosData[14], // Cemento rápido
      cantidad: 37,
      ultimaActualizacion: new Date("2023-11-22")
    },
    {
      id: "16",
      producto: productosData[15], // Ladrillo hueco
      cantidad: 850,
      ultimaActualizacion: new Date("2023-11-07")
    },
    {
      id: "17",
      producto: productosData[16], // Guantes de trabajo
      cantidad: 62,
      ultimaActualizacion: new Date("2023-11-23")
    },
    {
      id: "18",
      producto: productosData[17], // Gafas de seguridad
      cantidad: 45,
      ultimaActualizacion: new Date("2023-11-06")
    },
    {
      id: "19",
      producto: productosData[18], // Cinta métrica 5m
      cantidad: 31,
      ultimaActualizacion: new Date("2023-11-24")
    },
    {
      id: "20",
      producto: productosData[19], // Nivel de burbuja
      cantidad: 23,
      ultimaActualizacion: new Date("2023-11-05")
    }
  ];
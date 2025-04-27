import { Producto } from "../models/Producto";
import { categoriasData } from "./categoriaData";

export const productosData: Producto[] = [
  {
    id: "1",
    nombre: "Martillo de carpintero",
    cantidadUnitaria: "1 unidad",
    descripcion: "Martillo con mango de madera y cabeza de acero",
    precio: 65000, // ~15.99 USD
    categoria: categoriasData[0],
    codigoBarras: "7701234567895"
  },
  {
    id: "2",
    nombre: "Destornillador plano",
    cantidadUnitaria: "1 unidad",
    descripcion: "Destornillador de hoja plana 6x100 mm",
    precio: 22000, // ~5.5 USD
    categoria: categoriasData[0],
    codigoBarras: "7702345678906"
  },
  {
    id: "3",
    nombre: "Cable eléctrico 2.5mm",
    cantidadUnitaria: "1 metro",
    descripcion: "Cable de cobre flexible para instalaciones eléctricas",
    precio: 4800, // ~1.2 USD
    categoria: categoriasData[1],
    codigoBarras: "7703456789017"
  },
  {
    id: "4",
    nombre: "Interruptor simple",
    cantidadUnitaria: "1 unidad",
    descripcion: "Interruptor de pared para instalaciones eléctricas",
    precio: 15000, // ~3.75 USD
    categoria: categoriasData[1],
    codigoBarras: "7704567890128"
  },
  {
    id: "5",
    nombre: "Tubo PVC 20mm",
    cantidadUnitaria: "1 metro",
    descripcion: "Tubo de PVC para instalaciones de fontanería",
    precio: 9200, // ~2.3 USD
    categoria: categoriasData[2],
    codigoBarras: "7705678901239"
  },
  {
    id: "6",
    nombre: "Llave inglesa ajustable",
    cantidadUnitaria: "1 unidad",
    descripcion: "Llave ajustable de 8 pulgadas",
    precio: 52000, // ~12.99 USD
    categoria: categoriasData[2],
    codigoBarras: "7706789012340"
  },
  {
    id: "7",
    nombre: "Pintura blanca mate",
    cantidadUnitaria: "1 litro",
    descripcion: "Pintura plástica mate para interiores",
    precio: 74000, // ~18.5 USD
    categoria: categoriasData[3],
    codigoBarras: "7707890123451"
  },
  {
    id: "8",
    nombre: "Rodillo de pintura",
    cantidadUnitaria: "1 unidad",
    descripcion: "Rodillo de lana para pintar paredes",
    precio: 17000, // ~4.25 USD
    categoria: categoriasData[3],
    codigoBarras: "7708901234562"
  },
  {
    id: "9",
    nombre: "Tornillo para madera 4x40",
    cantidadUnitaria: "100 unidades",
    descripcion: "Paquete de tornillos para madera",
    precio: 16000, // ~3.99 USD
    categoria: categoriasData[4],
    codigoBarras: "7709012345673"
  },
  {
    id: "10",
    nombre: "Taco plástico 6mm",
    cantidadUnitaria: "50 unidades",
    descripcion: "Tacos para pared con tornillos incluidos",
    precio: 10000, // ~2.5 USD
    categoria: categoriasData[4],
    codigoBarras: "7710123456784"
  },
  {
    id: "11",
    nombre: "Tijeras de podar",
    cantidadUnitaria: "1 unidad",
    descripcion: "Tijeras profesionales para jardinería",
    precio: 92000, // ~22.99 USD
    categoria: categoriasData[5],
    codigoBarras: "7711234567895"
  },
  {
    id: "12",
    nombre: "Manguera de jardín",
    cantidadUnitaria: "10 metros",
    descripcion: "Manguera flexible para riego",
    precio: 63000, // ~15.75 USD
    categoria: categoriasData[5],
    codigoBarras: "7712345678906"
  },
  {
    id: "13",
    nombre: "Bombilla LED 9W",
    cantidadUnitaria: "1 unidad",
    descripcion: "Bombilla de bajo consumo equivalente a 60W",
    precio: 28000, // ~6.99 USD
    categoria: categoriasData[6],
    codigoBarras: "7713456789017"
  },
  {
    id: "14",
    nombre: "Plafón luminoso",
    cantidadUnitaria: "1 unidad",
    descripcion: "Plafón para techo con difusor opal",
    precio: 58000, // ~14.5 USD
    categoria: categoriasData[6],
    codigoBarras: "7714567890128"
  },
  {
    id: "15",
    nombre: "Cemento rápido",
    cantidadUnitaria: "5 kg",
    descripcion: "Mortero de fraguado rápido",
    precio: 36000, // ~8.99 USD
    categoria: categoriasData[7],
    codigoBarras: "7715678901239"
  },
  {
    id: "16",
    nombre: "Ladrillo hueco",
    cantidadUnitaria: "1 unidad",
    descripcion: "Ladrillo cerámico para construcción",
    precio: 3400, // ~0.85 USD
    categoria: categoriasData[7],
    codigoBarras: "7716789012340"
  },
  {
    id: "17",
    nombre: "Guantes de trabajo",
    cantidadUnitaria: "1 par",
    descripcion: "Guantes de protección para trabajos manuales",
    precio: 29000, // ~7.25 USD
    categoria: categoriasData[8],
    codigoBarras: "7717890123451"
  },
  {
    id: "18",
    nombre: "Gafas de seguridad",
    cantidadUnitaria: "1 unidad",
    descripcion: "Gafas protectoras transparentes",
    precio: 24000, // ~5.99 USD
    categoria: categoriasData[8],
    codigoBarras: "7718901234562"
  },
  {
    id: "19",
    nombre: "Cinta métrica 5m",
    cantidadUnitaria: "1 unidad",
    descripcion: "Cinta métrica flexible con bloqueo automático",
    precio: 26000, // ~6.5 USD
    categoria: categoriasData[9],
    codigoBarras: "7719012345673"
  },
  {
    id: "20",
    nombre: "Nivel de burbuja",
    cantidadUnitaria: "1 unidad",
    descripcion: "Nivel de aluminio de 60 cm",
    precio: 40000, // ~9.99 USD
    categoria: categoriasData[9],
    codigoBarras: "7710123456784"
  }
];

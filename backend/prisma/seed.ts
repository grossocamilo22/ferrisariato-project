import { faker } from "@faker-js/faker";
import {
  MetodoPago,
  PrismaClient,
  Rol,
  TipoIdentificacion,
} from "./src/generated/client";

const prisma = new PrismaClient();

async function main() {
  // 1. Crear categorías primero
  const categorias = [
    {
      id: "1",
      nombre: "Herramientas Manuales",
      descripcion: "Herramientas básicas para trabajos de bricolaje",
    },
    {
      id: "2",
      nombre: "Electricidad",
      descripcion: "Materiales y componentes eléctricos",
    },
    {
      id: "3",
      nombre: "Fontanería",
      descripcion: "Tuberías, accesorios y herramientas para plomería",
    },
    {
      id: "4",
      nombre: "Pinturas",
      descripcion: "Pinturas, barnices y accesorios para pintar",
    },
    {
      id: "5",
      nombre: "Fijaciones",
      descripcion: "Tornillos, clavos, anclajes y sistemas de sujeción",
    },
    {
      id: "6",
      nombre: "Jardinería",
      descripcion: "Herramientas y accesorios para el cuidado del jardín",
    },
    {
      id: "7",
      nombre: "Iluminación",
      descripcion: "Bombillas, lámparas y sistemas de iluminación",
    },
    {
      id: "8",
      nombre: "Materiales de Construcción",
      descripcion: "Materiales básicos para construcción",
    },
    {
      id: "9",
      nombre: "Seguridad",
      descripcion: "Equipos de protección personal",
    },
    {
      id: "10",
      nombre: "Ferretería General",
      descripcion: "Productos varios de ferretería",
    },
  ];

  await prisma.categoria.createMany({
    data: categorias,
  });

  // 2. Insertar TODOS los productos
  const productos = [
    {
      codigoBarras: "7701234567895",
      nombre: "Martillo de carpintero",
      cantidadUnitaria: "1 unidad",
      descripcion: "Martillo con mango de madera y cabeza de acero",
      precio: 65000,
      categoriaId: "1", // Herramientas Manuales
    },
    {
      codigoBarras: "7702345678906",
      nombre: "Destornillador plano",
      cantidadUnitaria: "1 unidad",
      descripcion: "Destornillador de hoja plana 6x100 mm",
      precio: 22000,
      categoriaId: "1", // Herramientas Manuales
    },
    {
      codigoBarras: "7703456789017",
      nombre: "Cable eléctrico 2.5mm",
      cantidadUnitaria: "1 metro",
      descripcion: "Cable de cobre flexible para instalaciones eléctricas",
      precio: 4800,
      categoriaId: "2", // Electricidad
    },
    {
      codigoBarras: "7704567890128",
      nombre: "Interruptor simple",
      cantidadUnitaria: "1 unidad",
      descripcion: "Interruptor de pared para instalaciones eléctricas",
      precio: 15000,
      categoriaId: "2", // Electricidad
    },
    {
      codigoBarras: "7705678901239",
      nombre: "Tubo PVC 20mm",
      cantidadUnitaria: "1 metro",
      descripcion: "Tubo de PVC para instalaciones de fontanería",
      precio: 9200,
      categoriaId: "3", // Fontanería
    },
    {
      codigoBarras: "7706789012340",
      nombre: "Llave inglesa ajustable",
      cantidadUnitaria: "1 unidad",
      descripcion: "Llave ajustable de 8 pulgadas",
      precio: 52000,
      categoriaId: "3", // Fontanería
    },
    {
      codigoBarras: "7707890123451",
      nombre: "Pintura blanca mate",
      cantidadUnitaria: "1 litro",
      descripcion: "Pintura plástica mate para interiores",
      precio: 74000,
      categoriaId: "4", // Pinturas
    },
    {
      codigoBarras: "7708901234562",
      nombre: "Rodillo de pintura",
      cantidadUnitaria: "1 unidad",
      descripcion: "Rodillo de lana para pintar paredes",
      precio: 17000,
      categoriaId: "4", // Pinturas
    },
    {
      codigoBarras: "7709012345673",
      nombre: "Tornillo para madera 4x40",
      cantidadUnitaria: "100 unidades",
      descripcion: "Paquete de tornillos para madera",
      precio: 16000,
      categoriaId: "5", // Fijaciones
    },
    {
      codigoBarras: "7710123456784",
      nombre: "Taco plástico 6mm",
      cantidadUnitaria: "50 unidades",
      descripcion: "Tacos para pared con tornillos incluidos",
      precio: 10000,
      categoriaId: "5", // Fijaciones
    },
    {
      codigoBarras: "7711234567895",
      nombre: "Tijeras de podar",
      cantidadUnitaria: "1 unidad",
      descripcion: "Tijeras profesionales para jardinería",
      precio: 92000,
      categoriaId: "6", // Jardinería
    },
    {
      codigoBarras: "7712345678906",
      nombre: "Manguera de jardín",
      cantidadUnitaria: "10 metros",
      descripcion: "Manguera flexible para riego",
      precio: 63000,
      categoriaId: "6", // Jardinería
    },
    {
      codigoBarras: "7713456789017",
      nombre: "Bombilla LED 9W",
      cantidadUnitaria: "1 unidad",
      descripcion: "Bombilla de bajo consumo equivalente a 60W",
      precio: 28000,
      categoriaId: "7", // Iluminación
    },
    {
      codigoBarras: "7714567890128",
      nombre: "Plafón luminoso",
      cantidadUnitaria: "1 unidad",
      descripcion: "Plafón para techo con difusor opal",
      precio: 58000,
      categoriaId: "7", // Iluminación
    },
    {
      codigoBarras: "7715678901239",
      nombre: "Cemento rápido",
      cantidadUnitaria: "5 kg",
      descripcion: "Mortero de fraguado rápido",
      precio: 36000,
      categoriaId: "8", // Materiales Construcción
    },
    {
      codigoBarras: "7716789012340",
      nombre: "Ladrillo hueco",
      cantidadUnitaria: "1 unidad",
      descripcion: "Ladrillo cerámico para construcción",
      precio: 3400,
      categoriaId: "8", // Materiales Construcción
    },
    {
      codigoBarras: "7717890123451",
      nombre: "Guantes de trabajo",
      cantidadUnitaria: "1 par",
      descripcion: "Guantes de protección para trabajos manuales",
      precio: 29000,
      categoriaId: "9", // Seguridad
    },
    {
      codigoBarras: "7718901234562",
      nombre: "Gafas de seguridad",
      cantidadUnitaria: "1 unidad",
      descripcion: "Gafas protectoras transparentes",
      precio: 24000,
      categoriaId: "9", // Seguridad
    },
    {
      codigoBarras: "7719012345673",
      nombre: "Cinta métrica 5m",
      cantidadUnitaria: "1 unidad",
      descripcion: "Cinta métrica flexible con bloqueo automático",
      precio: 26000,
      categoriaId: "10", // Ferretería General
    },
    /* {
      codigoBarras: "7720123456784",
      nombre: "Nivel de burbuja",
      cantidadUnitaria: "1 unidad",
      descripcion: "Nivel de aluminio de 60 cm",
      precio: 40000,
      categoriaId: "10", // Ferretería General
    }, */
  ];

  // Insertar con transacción para mejor performance
  await prisma.$transaction([
    prisma.producto.createMany({
      data: productos,
    }),
  ]);

  console.log("✅ 20 productos creados exitosamente");

  // Generar datos falsos de clientes1
  const clientes = Array.from({ length: 20 }, () => ({
    id: faker.string.uuid(),
    tipoIdentificacion: faker.helpers.arrayElement([
      TipoIdentificacion.CC,
      TipoIdentificacion.NIT,
      TipoIdentificacion.PAS,
    ]),
    nombre: faker.person.firstName(),
    apellido: faker.person.lastName(),
    direccion: faker.location.streetAddress(),
    contacto: faker.phone.number(),
  }));

  // Insertar clientes
  console.log("🌱 Insertando 20 clientes...");
  const result = await prisma.cliente.createMany({
    data: clientes,
  });
  console.log(`✅ ${result.count} clientes creados exitosamente`);

  console.log("🌱 Insertando empleados...");

  const empleadosData = [
    {
      id: "fa1f11b0-bc1c-4d18-bd76-1d2e3b4d58a1",
      tipoIdentificacion: TipoIdentificacion.CC,
      nombre: "Carlos",
      apellido: "Martínez",
      direccion: "Calle 10 #23-45, Bogotá",
      contacto: "3112345678",
      correo: "carlos.martinez@example.com",
      password: "pass123",
      rol: Rol.EMPLEADO,
    },
    {
      id: "a72f2bc3-3e77-4c4b-8c1b-e4a26784d377",
      tipoIdentificacion: TipoIdentificacion.CC,
      nombre: "Laura",
      apellido: "García",
      direccion: "Cra 45 #12-34, Medellín",
      contacto: "3009876543",
      correo: "laura.garcia@example.com",
      password: "securePass",
      rol: Rol.EMPLEADO,
    },
    {
      id: "2d8e4c92-4035-4b5a-b6f6-0dc8c94c682b",
      tipoIdentificacion: TipoIdentificacion.CC,
      nombre: "Julián",
      apellido: "Vega",
      direccion: "Av. 30 de Agosto #40-50, Pereira",
      contacto: "3123456789",
      correo: "julian.vega@example.com",
      password: "julian123",
      rol: Rol.EMPLEADO,
    },
    {
      id: "19f37b45-98a1-45e1-94ec-3c35f62bde7b",
      tipoIdentificacion: TipoIdentificacion.CC,
      nombre: "Sofía",
      apellido: "Restrepo",
      direccion: "Calle 80 #10-12, Cali",
      contacto: "3145678901",
      correo: "sofia.restrepo@example.com",
      password: "sof123",
      rol: Rol.EMPLEADO,
    },
    {
      id: "acb2033f-fb0a-472f-a004-41c779f1438b",
      tipoIdentificacion: TipoIdentificacion.NIT,
      nombre: "Tomás",
      apellido: "Morales",
      direccion: "Cra 1 #5-77, Cartagena",
      contacto: "3171234567",
      correo: "tomas.morales@example.com",
      password: "passTomas",
      rol: Rol.EMPLEADO,
    },
    {
      id: "73bbcc92-6e32-4082-b6e1-c31fd4918a9d",
      tipoIdentificacion: TipoIdentificacion.PAS,
      nombre: "Valeria",
      apellido: "Quintero",
      direccion: "Av. Circunvalar #101-22, Barranquilla",
      contacto: "3167890123",
      correo: "valeria.quintero@example.com",
      password: "valpass",
      rol: Rol.EMPLEADO,
    },
    {
      id: "9cf6f57c-efbb-43f0-931f-b2360f6f5a1e",
      tipoIdentificacion: TipoIdentificacion.CC,
      nombre: "Esteban",
      apellido: "López",
      direccion: "Calle 60 #30-40, Bucaramanga",
      contacto: "3111122333",
      correo: "esteban.lopez@example.com",
      password: "1234Esteban",
      rol: Rol.EMPLEADO,
    },
    {
      id: "fd2eb4aa-2b88-47d3-91eb-ff4f1c37732c",
      tipoIdentificacion: TipoIdentificacion.CC,
      nombre: "Mariana",
      apellido: "Cruz",
      direccion: "Cra 22 #55-66, Ibagué",
      contacto: "3004455667",
      correo: "mariana.cruz@example.com",
      password: "maripass",
      rol: Rol.EMPLEADO,
    },
    {
      id: "b4c2dd9a-dad0-4d2c-bbd2-f0c07cded49b",
      tipoIdentificacion: TipoIdentificacion.CC,
      nombre: "Felipe",
      apellido: "Torres",
      direccion: "Av. Simón Bolívar #99-10, Neiva",
      contacto: "3189988776",
      correo: "felipe.torres@example.com",
      password: "torres88",
      rol: Rol.EMPLEADO,
    },
    {
      id: "5c4a5ab0-fb38-4a04-a5dc-f3435124629a",
      tipoIdentificacion: TipoIdentificacion.CC,
      nombre: "Camila",
      apellido: "Gómez",
      direccion: "Calle 9 #8-22, Santa Marta",
      contacto: "3196677889",
      correo: "camila.gomez@example.com",
      password: "cami123",
      rol: Rol.EMPLEADO,
    },
    {
      id: "a1d06c34-4ff7-44a8-8c8c-0e2fdf32ff74",
      tipoIdentificacion: TipoIdentificacion.CC,
      nombre: "David",
      apellido: "Nieto",
      direccion: "Cra 14 #33-45, Manizales",
      contacto: "3019876543",
      correo: "david.nieto@example.com",
      password: "davidpass",
      rol: Rol.EMPLEADO,
    },
    {
      id: "57d670aa-1c70-464d-b4f0-3d473f67495a",
      tipoIdentificacion: TipoIdentificacion.CC,
      nombre: "Isabella",
      apellido: "Suárez",
      direccion: "Av. Boyacá #100-25, Pasto",
      contacto: "3132223344",
      correo: "isabella.suarez@example.com",
      password: "isa2024",
      rol: Rol.EMPLEADO,
    },
    {
      id: "f863fdb7-c5a5-4e3a-9c1e-c3471679b11b",
      tipoIdentificacion: TipoIdentificacion.CC,
      nombre: "Santiago",
      apellido: "Rivas",
      direccion: "Calle 12B #76-89, Cúcuta",
      contacto: "3024455667",
      correo: "santiago.rivas@example.com",
      password: "santi555",
      rol: Rol.EMPLEADO,
    },
    {
      id: "f343b0f3-e4b3-4ef2-9297-11e185f1565a",
      tipoIdentificacion: TipoIdentificacion.CC,
      nombre: "Daniela",
      apellido: "Pérez",
      direccion: "Cra 26 #98-40, Villavicencio",
      contacto: "3209876543",
      correo: "daniela.perez@example.com",
      password: "daniela4321",
      rol: Rol.EMPLEADO,
    },
    {
      id: "09c07a2f-d0cd-4693-b1de-33f109e5bc71",
      tipoIdentificacion: TipoIdentificacion.CC,
      nombre: "Luis",
      apellido: "Sánchez",
      direccion: "Calle 15 #60-70, Montería",
      contacto: "3141122334",
      correo: "luis.sanchez@example.com",
      password: "luissafe",
      rol: Rol.EMPLEADO,
    },
    {
      id: "3ea22f1b-f69e-4f89-b79b-925e302f1167",
      tipoIdentificacion: TipoIdentificacion.CC,
      nombre: "Angela",
      apellido: "Mendoza",
      direccion: "Av. Libertador #55-10, Popayán",
      contacto: "3156677889",
      correo: "angela.mendoza@example.com",
      password: "angelapass",
      rol: Rol.EMPLEADO,
    },
    {
      id: "1a6e1f96-2853-4a91-9d57-9fa5c8f8b87c",
      tipoIdentificacion: TipoIdentificacion.CC,
      nombre: "Sebastián",
      apellido: "Moreno",
      direccion: "Cra 5 #66-77, Florencia",
      contacto: "3013344556",
      correo: "sebastian.moreno@example.com",
      password: "sebas321",
      rol: Rol.EMPLEADO,
    },
    {
      id: "db8a1b87-7772-4f76-b3e0-cae5343a2fd5",
      tipoIdentificacion: TipoIdentificacion.CC,
      nombre: "Natalia",
      apellido: "Ortiz",
      direccion: "Calle 50 #90-21, Armenia",
      contacto: "3115566778",
      correo: "natalia.ortiz@example.com",
      password: "nati987",
      rol: Rol.EMPLEADO,
    },
    {
      id: "80f373e7-04f3-4038-9a6e-6a5c8f92f5fb",
      tipoIdentificacion: TipoIdentificacion.CC,
      nombre: "Jorge",
      apellido: "Castro",
      direccion: "Cra 13 #20-30, Valledupar",
      contacto: "3129988777",
      correo: "jorge.castro@example.com",
      password: "jorge007",
      rol: Rol.EMPLEADO,
    },
    {
      id: "ed67f9a7-52d0-4a20-9fa3-1a8db81c90f6",
      tipoIdentificacion: TipoIdentificacion.PAS,
      nombre: "Luisa",
      apellido: "Navarro",
      direccion: "Av. Sur #45-23, Tunja",
      contacto: "3161122998",
      correo: "luisa.navarro@example.com",
      password: "luinav123",
      rol: Rol.EMPLEADO,
    },
  ];

  // Usar createMany para mejor rendimiento
  await prisma.user.createMany({
    data: empleadosData,
  });

  console.log("✅ 20 empleados creados exitosamente");

  // Obtener datos existentes
  const productos1 = await prisma.producto.findMany();
  const clientes1 = await prisma.cliente.findMany();
  const usuario = await prisma.user.findFirst(); // Asumimos que existe al menos un usuario

  if (!productos.length || !clientes.length || !usuario) {
    throw new Error("Faltan datos requeridos (productos, clientes o usuarios)");
  }

  // Datos de ventas (adaptados a Prisma)
  const ventasData = [
    {
      clienteId: clientes1[0].id,
      detalles: [
        { productoId: productos1[0].id, cantidad: 2, subtotal: 130000 }, // Martillo
        { productoId: productos1[1].id, cantidad: 1, subtotal: 22000 }, // Destornillador
      ],
      total: 152000,
      metodoPago: MetodoPago.EFECTIVO,
      fecha: new Date("2023-05-15T09:23:45"),
      userId: usuario.id,
    },
    {
      clienteId: clientes1[2].id,
      detalles: [
        { productoId: productos1[4].id, cantidad: 5, subtotal: 46000 }, // Tubo PVC
        { productoId: productos1[5].id, cantidad: 1, subtotal: 52000 }, // Llave inglesa
      ],
      total: 98000,
      metodoPago: MetodoPago.TARGETA,
      fecha: new Date("2023-05-16T14:12:30"),
      userId: usuario.id,
    },
    {
      clienteId: clientes1[5].id,
      detalles: [
        { productoId: productos1[7].id, cantidad: 3, subtotal: 51000 }, // Rodillo
        { productoId: productos1[8].id, cantidad: 2, subtotal: 32000 }, // Tornillos
      ],
      total: 83000,
      metodoPago: MetodoPago.EFECTIVO,
      fecha: new Date("2023-05-17T11:45:15"),
      userId: usuario.id,
    },
    {
      clienteId: clientes1[3].id,
      detalles: [
        { productoId: productos1[10].id, cantidad: 1, subtotal: 92000 }, // Tijeras podar
      ],
      total: 92000,
      metodoPago: MetodoPago.TARGETA,
      fecha: new Date("2023-05-18T16:30:22"),
      userId: usuario.id,
    },
    {
      clienteId: clientes1[7].id,
      detalles: [
        { productoId: productos1[12].id, cantidad: 4, subtotal: 112000 }, // Bombilla LED
        { productoId: productos1[13].id, cantidad: 1, subtotal: 58000 }, // Plafón
      ],
      total: 170000,
      metodoPago: MetodoPago.TARGETA,
      fecha: new Date("2023-05-19T10:15:33"),
      userId: usuario.id,
    },
    {
      clienteId: clientes1[1].id,
      detalles: [
        { productoId: productos1[15].id, cantidad: 20, subtotal: 68000 }, // Ladrillos
        { productoId: productos1[16].id, cantidad: 2, subtotal: 58000 }, // Guantes
      ],
      total: 126000,
      metodoPago: MetodoPago.EFECTIVO,
      fecha: new Date("2023-05-20T13:45:10"),
      userId: usuario.id,
    },
    {
      clienteId: clientes1[4].id,
      detalles: [
        { productoId: productos1[18].id, cantidad: 1, subtotal: 26000 }, // Cinta métrica
      ],
      total: 66000,
      metodoPago: MetodoPago.EFECTIVO,
      fecha: new Date("2023-05-21T17:20:05"),
      userId: usuario.id,
    },
    {
      clienteId: clientes1[6].id,
      detalles: [
        { productoId: productos1[2].id, cantidad: 10, subtotal: 48000 }, // Cable eléctrico
        { productoId: productos1[3].id, cantidad: 5, subtotal: 75000 }, // Interruptor
      ],
      total: 123000,
      metodoPago: MetodoPago.EFECTIVO,
      fecha: new Date("2023-05-22T08:30:45"),
      userId: usuario.id,
    },
    {
      clienteId: clientes1[9].id,
      detalles: [
        { productoId: productos1[6].id, cantidad: 2, subtotal: 148000 }, // Pintura
        { productoId: productos1[9].id, cantidad: 3, subtotal: 30000 }, // Tacos
      ],
      total: 178000,
      metodoPago: MetodoPago.TARGETA,
      fecha: new Date("2023-05-23T15:10:20"),
      userId: usuario.id,
    },
    {
      clienteId: clientes1[8].id,
      detalles: [
        { productoId: productos1[11].id, cantidad: 1, subtotal: 63000 }, // Manguera
        { productoId: productos1[14].id, cantidad: 2, subtotal: 72000 }, // Cemento
      ],
      total: 135000,
      metodoPago: MetodoPago.TARGETA,
      fecha: new Date("2023-05-24T12:05:18"),
      userId: usuario.id,
    },
    /* {
      id: "v020",
      clienteId: clientes1[9].id,
      detalles: [
        { productoId: productos1[19].id, cantidad: 1, subtotal: 40000 }, // Nivel
        { productoId: productos1[0].id, cantidad: 1, subtotal: 65000 }, // Martillo
        { productoId: productos1[1].id, cantidad: 1, subtotal: 22000 }, // Destornillador
      ],
      total: 127000,
      metodoPago: MetodoPago.EFECTIVO,
      fecha: new Date("2023-06-03T11:30:45"),
      userId: usuario.id,
    }, */
  ];

  // Crear ventas con transacciones
  console.log("🌱 Insertando 20 ventas con detalles...");

  for (const ventaData of ventasData) {
    await prisma.$transaction([
      prisma.venta.create({
        data: {
          total: ventaData.total,
          clienteId: ventaData.clienteId,
          userId: ventaData.userId,
          metodoPago: ventaData.metodoPago,
          fecha: ventaData.fecha,
          detallesVenta: {
            createMany: {
              data: ventaData.detalles,
            },
          },
        },
      }),
    ]);
  }

  console.log("✅ 20 ventas creadas exitosamente");
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

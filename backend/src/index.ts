import express from "express";
import cors from "cors";
import clienteRoutes from "./routes/clienteRoutes";
import proveedorRoutes from "./routes/proveedorRoutes";
import productoRoutes from "./routes/productoRoutes";
import inventarioRoutes from "./routes/inventarioRoutes";
import ventaRoutes from "./routes/ventaRoutes";
import empleadoRoutes from "./routes/empleadoRoutes";
import authRoutes from "./routes/authRoutes";
import categoriaRoutes from "./routes/categoriaRoutes";
import { PrismaClient } from "../prisma/src/generated/client";
import cookieParser from "cookie-parser";
import { validarJwt } from "./middlewares/validateJwt";

const app = express();

const PORT = process.env.PORT || 3000;

const prisma = new PrismaClient();

async function checkConnection() {
  // Verifica si la base de datos está conectada
  try {
    await prisma.$connect();
    console.log("Database connected");
  } catch (e) {
    console.error("Database connection failed", e);
  }
}

checkConnection()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/clientes", validarJwt, clienteRoutes);
app.use("/api/proveedores", validarJwt, proveedorRoutes);
app.use("/api/productos", validarJwt, productoRoutes);
app.use("/api/inventarios", validarJwt, inventarioRoutes);
app.use("/api/ventas", validarJwt, ventaRoutes);
app.use("/api/categorias", validarJwt, categoriaRoutes);
app.use("/api/empleados", validarJwt, empleadoRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

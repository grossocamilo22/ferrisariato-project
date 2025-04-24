import sequelizeConexion from "database/connection";
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

async function checkDataseConection() {
  try {
    await sequelizeConexion.authenticate();
    console.log("Conectado en la BD");
  } catch (error) {
    console.error("No se puedo establecer la conexion en la base de datos");
  }
}

checkDataseConection();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}... aunque docker  lo se`);
});

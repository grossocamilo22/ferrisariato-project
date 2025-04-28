import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generarJWT = (uid: string, nombre: string) => {
  const payload = { uid, nombre };

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED ?? "",
      { expiresIn: "24h" },
      (err, token) => {
        if (err) {
          return reject(err);
        }

        resolve(token);
      }
    );
  });
};

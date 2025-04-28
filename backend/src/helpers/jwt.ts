import jwt from "jsonwebtoken";
import dotenv from "dotenv";

interface Payload {
  uid: string;
  nombre: string;
}

dotenv.config();

export const generarJWT = (uid: string, nombre: string): Promise<string> => {
  const payload: Payload = { uid, nombre };

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED!,
      { expiresIn: "24h" },
      (err, token) => {
        err ? reject("Error generando toekn.") : resolve(token || "");
      }
    );
  });
};

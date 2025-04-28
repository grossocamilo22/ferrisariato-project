import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";

dotenv.config();

interface CustomRequest extends Request {
  uid?: string;
  nombre?: string;
}

export const validarJwt = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({
      msg: "No se proporcionó token de autenticación",
    });
  }
  try {
    const decode = jwt.verify(
      token,
      process.env.SECRET_JWT_SEED ?? ""
    ) as JwtPayload;
    if (!decode.uid || !decode.nombre) {
      return res.status(401).json({
        msg: "Token con estructura inválida",
      });
    }
    req.uid = decode.uid;
    req.nombre = decode.nombre;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ msg: "Token expirado" });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ msg: "Token inválido" });
    }
    return res.status(500).json({ msg: "Error en la validación del token" });
  }
};

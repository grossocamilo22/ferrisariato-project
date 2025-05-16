import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";

dotenv.config();

interface CustomRequest extends Request {
  id?: string;
  nombre?: string;
}
export const validarJwt = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies?.token;

  if (!token) {
    res.status(401).json({
      msg: "No se proporcionó token de autenticación",
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT_SEED ?? "") as JwtPayload;
    console.log(decoded)
    if (!decoded.id || !decoded.nombre) {
      res.status(401).json({
        msg: "Token con estructura inválida",
      });
      return;
    }
    console.log(decoded)
    req.params.id = decoded.id;
    req.params.nombre = decoded.nombre;
    next(); // importante
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ msg: "Token expirado" });
      return;
    }
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ msg: "Token inválido" });
      return;
    }
    res.status(500).json({ msg: "Error en la validación del token" });
    return;
  }
};

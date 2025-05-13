import { PrismaClient } from "../../prisma/src/generated/client";
import { GeneradorControlador } from "./generadorController";
import { generarJWT } from "../helpers/jwt";
import { comparePassword, hashPassword } from "../helpers/auth";
import { Request, Response } from "express";

const prisma = new PrismaClient();
class AuthController {
  constructor() {}

  async register(req: Request, res: Response) {
    try {
      const { password, ...rest } = req.body;
      const hashedPassword = await hashPassword(password);
      const result = await prisma.user.create({
        data: { ...rest, password: hashedPassword },
      });
      const token = await generarJWT(result.id, result.nombre);
      const respuesta = { ...result, token };
      res.status(200).json({
        msg: "Usuario creado exitosamente",
        data: {
          id: result.id,
          nombre: result.nombre,
          correo: result.correo,
          token,
        },
      });
    } catch (error) {
      GeneradorControlador.handleError(res, error);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { correo, password } = req.body;
      const usuario = await prisma.user.findUnique({
        where: { correo },
      });

      if (!usuario) {
        res.status(400).json({
          msg: "Verifique si la contraseña y el correo son correctos",
        });
      } else {
        const validarPassword = await comparePassword(
          password,
          usuario.password
        );

        if (!validarPassword) {
          res.status(400).json({
            msg: "Verifique si la contraseña y el correo son correctos",
          });
        } else {
          const token = await generarJWT(usuario.id, usuario.nombre);
          res.status(200).json({
            msg: "Login exitoso",
            data: {
              id: usuario.id,
              nombre: usuario.nombre,
              correo: usuario.correo,
              token,
            },
          });
        }
      }
    } catch (error) {
      GeneradorControlador.handleError(res, error);
    }
  }

  async revalidarToken(req: Request, res: Response) {
    const { id } = req.params;

    const usuario = await prisma.user.findUnique({
      where: { id },
      select: {
        // Solo seleccionar campos necesarios
        id: true,
        nombre: true,
        correo: true,
        rol: true,
      },
    });

    if (!usuario) {
      res.status(404).json({
        msg: "Usuario no encontrado",
      });
    } else {
      const token = await generarJWT(usuario!.id ?? "", usuario!.nombre);
      res.status(200).json({
        msg: "Token revalidado exitosamente",
        data: {
          user: usuario,
          token,
        },
      });
    }
  }
}

export const authController = new AuthController();

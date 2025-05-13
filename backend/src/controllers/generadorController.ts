import { Request, Response } from "express";
import { Prisma, PrismaClient } from "../../prisma/src/generated/client";
import { hashPassword } from "../helpers/auth";

const prisma = new PrismaClient();
export class GeneradorControlador<T extends keyof PrismaClient> {
  private modelo: PrismaClient[T];
  private nombreModelo: string;
  private modeloMensaje: string;
  private defaultSelectFields:
    | Record<string, boolean | Record<string, boolean>>
    | undefined;
  private defaultIncludeFields: Record<string, boolean> | undefined;

  constructor(
    modelo: T,
    modeloNombre: string,
    defaultSelectFields?: Record<string, boolean | Record<string, boolean>>,
    defaultIncludeFields?: Record<string, boolean>
  ) {
    this.modelo = prisma[modelo];
    this.nombreModelo = String(modelo);
    this.modeloMensaje = modeloNombre;
    this.defaultSelectFields = defaultSelectFields;
    this.defaultIncludeFields = defaultIncludeFields;
  }

  private buildSelect():
    | Record<string, boolean | Record<string, boolean>>
    | undefined {
    return this.defaultSelectFields;
  }

  private buildInclude(): Record<string, boolean> | undefined {
    return this.defaultIncludeFields;
  }

  //Crear
  async create(req: Request, res: Response) {
    try {
      const data = req.body;
      if(this.nombreModelo === "empleado"){
        data.password = await hashPassword(data.password);
      }
      await (this.modelo as any).create({ data });
      res.status(200).json({
        msg: `${this.modeloMensaje} ha sido guardado.`,
      });
    } catch (error) {
      GeneradorControlador.handleError(res, error);
    }
  }

  //buscar varios datos
  async findAll(req: Request, res: Response) {
    try {
      const { skip = 0, take = 10, fecha, nombre } = req.query;
      console.log(this.nombreModelo);
      const where: any = {};
      const nombreFilter = { contains: nombre as string, mode: "insensitive" };
      if (fecha) where.fecha = { equals: new Date(fecha as string) };
      else if (nombre) {
        if (["cliente", "user"].includes(this.nombreModelo)) {
          where.OR = [{ nombre: nombreFilter }, { apellido: nombreFilter }];
        } else if (this.nombreModelo === "inventario") {
          where.producto = { nombre: nombreFilter };
        } else if (this.nombreModelo === "venta") {
          where.cliente = {
            OR: [{ nombre: nombreFilter }, { apellido: nombreFilter }],
          };
        } else {
          where.nombre = nombreFilter;
        }
      }
      const [data, total] = await Promise.all([
        (this.modelo as any).findMany({
          skip: Number(skip),
          take: Number(take),
          where,
          select: this.buildSelect(),
        }),
        (this.modelo as any).count({ where }),
      ]);

      res.json({
        data,
        pagination: {
          total,
          skip: Number(skip),
          take: Number(take),
        },
      });
    } catch (error) {
      GeneradorControlador.handleError(res, error);
    }
  }

  //Buscar un solo dato
  async findOne(req: Request, res: Response) {
    try {
      const where = { id: req.params.id || undefined };
      const result = await (this.modelo as any).findUnique({
        where,
        include: this.buildInclude(),
      });
      result
        ? res.json(result)
        : res.status(404).json({
            message: `${this.modeloMensaje} con id:${where.id} no encontrado`,
          });
    } catch (error) {
      GeneradorControlador.handleError(res, error);
    }
  }

  //actualizar
  async update(req: Request, res: Response) {
    try {
      const where = { id: req.params.id };
      const data = req.body;
      if(this.nombreModelo === "empleado"){
        data.password = await hashPassword(data.password);
      }
      await (this.modelo as any).update({ where, data });
      res.status(200).json({
        msg: `${this.modeloMensaje} con id: ${where.id} ha sido actualizado.`,
      });
    } catch (error) {
      GeneradorControlador.handleError(res, error);
    }
  }

  //eliminar
  async delete(req: Request, res: Response) {
    try {
      const where = { id: req.params.id };
      await (this.modelo as any).delete({ where });
      res.status(200).json({
        msg: `${this.modeloMensaje} con id: ${where.id} ha sido eliminado.`,
      });
    } catch (error) {
      GeneradorControlador.handleError(res, error);
    }
  }

  public static handleError(res: Response, error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).json({
        code: error.code,
        message: "Error en la solicitud a la base de datos",
      });
    } else {
      console.error(error);
      res.status(500).json({ message: "Error interno del servidor", error });
    }
  }
}

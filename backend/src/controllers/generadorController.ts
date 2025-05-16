import { Request, Response } from "express";
import {
  MetodoPago,
  Prisma,
  PrismaClient,
} from "../../prisma/src/generated/client";
import { hashPassword } from "../helpers/auth";

const prisma = new PrismaClient();
type ModelName = keyof typeof prisma;
type SimpleOrNestedSelect = {
  [key: string]: boolean | SimpleOrNestedSelect;
};
type DeepInclude = {
  [key: string]: boolean | DeepInclude;
};

export class GeneradorControlador<T extends ModelName> {
  private modelo: (typeof prisma)[T];
  private nombreModelo: string;
  private modeloMensaje: string;
  private defaultSelectFields?: SimpleOrNestedSelect;
  private defaultIncludeFields?: DeepInclude;

  constructor(
    modelo: T,
    modeloNombre: string,
    defaultSelectFields?: SimpleOrNestedSelect,
    defaultIncludeFields?: DeepInclude
  ) {
    this.modelo = prisma[modelo];
    this.nombreModelo = String(modelo);
    this.modeloMensaje = modeloNombre;
    this.defaultSelectFields = defaultSelectFields;
    this.defaultIncludeFields = defaultIncludeFields;
  }

  private buildSelect(): SimpleOrNestedSelect | undefined {
    return this.defaultSelectFields;
  }

  private buildInclude(): DeepInclude | undefined {
    return this.defaultIncludeFields;
  }

  //Crear
  async create(req: Request, res: Response) {
    try {
      const data = req.body;
      if (this.nombreModelo === "empleado") {
        data.password = await hashPassword(data.password);
      }else if(this.nombreModelo === "producto"){
        data.precio = parseFloat(data.precio);
      }
       else if (this.nombreModelo === "inventario") {
         data.stock = parseInt(data.stock, 10);
      } else if (this.nombreModelo === "venta") {
        // Convertir a tipos correctos
        if (data.detallesVenta) {
          delete data.detallesVenta.update;
          delete data.detallesVenta.delete;
        }
        data.detallesVenta.create = (data.detallesVenta.create || []).map(
          (detalle: any) => {
            if (!detalle.productoId || !detalle.cantidad || !detalle.subtotal) {
              throw new Error("Faltan datos obligatorios en detallesVenta");
            }
            return {
              productoId: detalle.productoId,
              cantidad: parseInt(detalle.cantidad, 10),
              subtotal: parseFloat(detalle.subtotal),
            };
          }
        );
        data.metodoPago = data.metodoPago as MetodoPago;
        data.total = parseFloat(data.total);
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
      const data = await (this.modelo as any).findMany({
        select: this.buildSelect(),
      });

      res.json({
        data,
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
        select:this.buildSelect(),
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
      if (this.nombreModelo === "inventario") {
        data.stock = parseInt(data.stock, 10);
      }else if(this.nombreModelo === "producto"){
        data.precio = parseFloat(data.precio);
      } else if (this.nombreModelo === "venta") {
        // Convertir a tipos correctos
        if (data.detallesVenta.create) {
          data.detallesVenta.create = (data.detallesVenta.create || []).map(
            (detalle: any) => {
              if (
                !detalle.productoId ||
                !detalle.cantidad ||
                !detalle.subtotal
              ) {
                throw new Error("Faltan datos obligatorios en detallesVenta");
              }
              return {
                productoId: detalle.productoId,
                cantidad: parseInt(detalle.cantidad, 10),
                subtotal: parseFloat(detalle.subtotal),
              };
            }
          );
        } else {
          delete data.detallesVenta.create;
        }

        if (data.detallesVenta.update) {
          data.detallesVenta.update = data.detallesVenta.update.map(
            (detalle: any) => {
              if (
                !detalle.id ||
                !detalle.productoId ||
                !detalle.cantidad ||
                !detalle.subtotal
              ) {
                throw new Error(
                  "Faltan datos obligatorios en detallesVenta.update"
                );
              }
              return {
                where: { id: detalle.id },
                data: {
                  productoId: detalle.productoId,
                  cantidad: parseInt(detalle.cantidad, 10),
                  subtotal: parseFloat(detalle.subtotal),
                },
              };
            }
          );
        } else {
          delete data.detallesVenta.update;
        }
        if (data.detallesVenta.delete) {
          data.detallesVenta.delete = data.detallesVenta.delete.map(
            (detalle: any) => {
              if (typeof detalle.id !== "string" || detalle.id.trim() === "") {
                throw new Error("ID inválido en detallesVenta.delete");
              }
              return { id: detalle.id.trim() };
            }
          );
        } else {
          delete data.detallesVenta.delete;
        }
        data.total = parseFloat(data.total);
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
      res.status(500).json({ message: "Error interno del servidor", error });
    }
  }
}

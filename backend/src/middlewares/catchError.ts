import { NextFunction, Request, Response } from "express";
import { Result, ValidationError, validationResult } from "express-validator";

export const CatchError = (req: Request, res: Response, next: NextFunction) => {
  const errores: Result<ValidationError> = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(404).json({
      ok: false,
      errores: errores.array().map((err) => ({
        tipo: err.type,
        mensage: err.msg,
      })),
    });
  }
  next();
};

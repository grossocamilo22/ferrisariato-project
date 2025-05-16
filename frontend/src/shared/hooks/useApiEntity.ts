// hooks/useApiEntity.ts
import { useState } from "react";
import {
  obtenerPorId,
  obtenerTodos,
  crear,
  actualizar,
  eliminar,
} from "../../core/services/apiServicio";
import { CellValue } from "../components/table/table";

export const useApiEntity = <T extends Record<string, CellValue>>(entidad: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: unknown) => {
    setError(err instanceof Error ? err.message : "Error desconocido");
    return undefined;
  };

  const getById = async (id: string) => {
    setLoading(true);
    try {
      const data = await obtenerPorId(entidad, id);
      return data as T;
    } catch (err) {
      return handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const getAll = async () => {
    setLoading(true);
    try {
      const data = await obtenerTodos(entidad);
      return data.data as T[];
    } catch (err) {
      return handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const create = async (datos: T) => {
    setLoading(true);
    try {
      const data = await crear<T>(entidad, datos);
      return data as T;
    } catch (err) {
      return handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: string, datos: T) => {
    setLoading(true);
    try {
      const data = await actualizar<T>(entidad, id, datos);
      return data as T;
    } catch (err) {
      return handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    setLoading(true);
    try {
      await eliminar(entidad, id);
      return true;
    } catch (err) {
      return handleError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getById,
    getAll,
    create,
    update,
    remove,
  };
};

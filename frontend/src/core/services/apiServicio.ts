import { CellValue } from "../../shared/components/table/table";
import { handleApiError } from "../utils/handleError";
import api from "./api";

export const obtenerPorId = async (entidad: string, id: string) => {
  try {
    const response = await api.get(`/${entidad}/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error, entidad);
  }
};

export const obtenerTodos = async (entidad: string) => {
  try {
    const response = await api.get(`/${entidad}`);
    return response.data;
  } catch (error) {
    handleApiError(error, entidad);
  }
};

export const crear = async <T extends Record<string, CellValue>>(entidad: string, datos: T) => {
  try {
    console.log(datos);
    const response = await api.post(`/${entidad}`, datos);
    return response.data;
  } catch (error) {
    handleApiError(error, entidad);
  }
};

export const actualizar = async <T extends object>(
  entidad: string,
  id: string,
  datos: T
) => {
  try {
    const response = await api.put(`/${entidad}/${id}`, datos);
    return response.data;
  } catch (error) {
    handleApiError(error, entidad);
  }
};

export const eliminar = async (entidad: string, id: string) => {
  try {
    const response = await api.delete(`/${entidad}/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error, entidad);
  }
};

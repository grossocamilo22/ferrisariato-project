import { AxiosError } from 'axios';

export function handleApiError(error: unknown,entidad:string): never {
  if (error instanceof AxiosError) {
    const message = error.response?.data?.message || error.message;
    throw new Error(`Error al obtener ${entidad}: ${message}`);
  }
  throw new Error(`Error desconocido al obtener ${entidad}`);
}
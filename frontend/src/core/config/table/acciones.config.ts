
export type Accion = {
  icono: string;
  color: string;
  action: "show" | "edit" | "delete" | string;
  render: boolean;
};


export const defaultAcciones: Accion[] = [
  { icono: "eye-fill", color: "primary-emphasis", action: "show", render: true },
  { icono: "pencil-fill", color: "warning", action: "edit", render: true },
  { icono: "trash3-fill", color: "danger", action: "delete", render: true },
];


export function personalizarAcciones(
  overrides: Partial<Accion> & { action: Accion["action"] }
): Accion[] {
  return defaultAcciones.map((acc) =>
    acc.action === overrides.action ? { ...acc, ...overrides } : acc
  );
}

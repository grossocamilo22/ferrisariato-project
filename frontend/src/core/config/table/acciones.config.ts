export type Accion<T> = {
  icono: string;
  color: string;
  action: string;
  render: boolean;
  onClick?: (id: string, rowData: T) => void;
};

export function defaultAcciones<T>(): Accion<T>[] {
  return [
    {
      icono: "eye-fill",
      color: "primary-emphasis",
      action: "show",
      render: true,
    },
    { icono: "pencil-fill", color: "warning", action: "edit", render: true },
    { icono: "trash3-fill", color: "danger", action: "delete", render: true },
  ];
}

export function personalizarAcciones<T>(
  ...overrides: (Partial<Accion<T>> & { action: Accion<T>["action"] })[]
): Accion<T>[] {
  return defaultAcciones().map((acc) => {
    const override = overrides.find((o) => o.action === acc.action);
    return override ? { ...acc, ...override } : acc;
  });
}

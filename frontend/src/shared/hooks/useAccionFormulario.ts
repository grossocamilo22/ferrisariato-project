import { useLocation } from "react-router-dom";

export interface ActionOptions {
  className: string;
  btnName: string;
  icon: string;
  disable: boolean;
}


export const actionOptions: {edit:ActionOptions,add:ActionOptions,show:ActionOptions} = {
  edit: { className: "btn-update", btnName: "Actualizar", icon: "pencil-square", disable: false },
  add: { className: "btn-add", btnName: "Guardar", icon: "floppy", disable: false },
  show: { className: "btn-show", btnName: "Volver", icon: "arrow-left-square", disable: true },
};

export type Accion = keyof typeof actionOptions;

export const useAccionFormulario = () => {
  const location = useLocation();
  const accionesValidas = ["add", "edit", "show"] as const;

  const accion: Accion =
    location.pathname
      .split("/")
      .slice(-2)
      .find((p): p is Accion => accionesValidas.includes(p as Accion)) ?? "add";

  const config = actionOptions[accion];

  return { accion, config };
};

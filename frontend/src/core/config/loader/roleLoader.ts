// roleLoader.ts
import { LoaderFunctionArgs } from "react-router-dom";
import { Rol } from "../../models/Rol";
import { protectedLoader } from "./authLoader";
import { redirect } from "react-router-dom";

export function roleLoader(allowedRole: keyof typeof Rol) {
  return async (args: LoaderFunctionArgs) => {
    const result = await protectedLoader(args);

    if (result instanceof Response) return result;

    const { user } = result;

    if (user.rol !== allowedRole) {
      return redirect("/unauthorized");
    }

    return { user };
  };
}

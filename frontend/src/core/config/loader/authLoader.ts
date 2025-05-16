import { LoaderFunctionArgs } from "react-router-dom";
import { renewToken } from "../../services/api";
import { redirect } from "react-router-dom";

export async function protectedLoader({ request }: LoaderFunctionArgs) {
  try {
    const res = await renewToken();
    const user = res.data?.data;
    
    if (!user) if (!user) throw new Error("No autorizado");
    return { user };
  } catch (error) {
    console.log(error)
    const url = new URL(request.url);
    const from = url.pathname;
    return redirect(`/auth/login?from=${encodeURIComponent(from)}`);
  }
}

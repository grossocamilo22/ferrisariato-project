import Swal, { SweetAlertIcon } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const mensaje = (msg: string,icon:SweetAlertIcon) => {
  const MySwal = withReactContent(Swal);

  MySwal.fire({
    title: msg,
    icon: icon,
  });
};

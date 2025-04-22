import { useNavigate } from "react-router-dom";
import { useForm } from "../../../shared/hooks/useForm";
import { Venta } from "../../../core/models/Venta";
import { ChangeEvent, FormEvent } from "react";
import { useAccionFormulario } from "../../../shared/hooks/useAccionFormulario";
import FormField from "../../../shared/components/form-field/form-field";
import FormActions from "../../../shared/components/form-actions/form-actions";
import Table from "../../../shared/components/table/table";
import { DetalleVenta, DetalleVentaTableData, FormDetalleVenta } from '../../../core/models/DetalleVenta';
import { personalizarAcciones } from "../../../core/config/table/acciones.config";

function mapDetalleVentaToTableData(detalle: DetalleVenta): DetalleVentaTableData {
    return {
        id: detalle.id,
        productoNombre: detalle.producto?.nombre || "", // suponiendo que producto tiene una propiedad `nombre`
        cantidad: detalle.cantidad,
        subtotal: detalle.subtotal,
    };
}

function VentaFormulario() {
    const navigate = useNavigate();
    const { formData: formVenta } = useForm<Venta>({
        id: '',
        detalles: [],
        fecha: new Date(),
        cliente: undefined,
        total: 0
    });
    const { formData: formDetalle } = useForm<FormDetalleVenta>({
        id: "",
        cantidad: 0,
        subtotal: 0,
        producto: null
    });

    const handleChangeCliente = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        console.log(name, value);
    };
    const handleChangeDetalleVenta = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        console.log(name, value);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (accion === "show") {
            return navigate(-1);
        }
    }

    const { accion, config } = useAccionFormulario();
    return (
        <form onSubmit={handleSubmit}>
            <span className="p-0 m-0">Datos del cliente</span>
            <div className="row border rounded-2 m-0 p-lg-4 p-3 mb-4">
                <FormField className="col-lg-4 col-12 mb-lg-0 mb-3" label="Nombre:" name="nombre" onChange={handleChangeCliente} placeholder="el nombre" disabled={config.disable} value={formVenta.cliente?.nombre || ""} />
                <FormField className="col-lg-4 col-12 mb-lg-0 mb-3" label="Dirección:" name="direccion" disabled={true} value={formVenta.cliente?.direccion || ""} />
                <FormField className="col-lg-4 col-12 mb-lg-0 mb-2" label="Contacto:" name="contacto" disabled={true} value={formVenta.cliente?.contacto || ""} />
            </div>
            <span className="p-0 m-0">Datos del producto</span>
            <div className="row border rounded-2 m-0 p-lg-4 p-3 mb-4">
                <div className="row m-0 p-0 col-lg-5 col-12 mb-4 mb-lg-0">
                    <FormField className="col-12 mb-3" label="Nombre:" name="nombre" onChange={handleChangeDetalleVenta} placeholder="el nombre" disabled={config.disable} value={formDetalle.producto?.nombre || ""} />
                    <FormField className="col-lg-6 col-12 mb-3" label="Codigo:" name="id" disabled={true} value={formDetalle.producto?.id || ""} />
                    <FormField className="col-lg-6 col-12 mb-3" label="Precio:" name="precio" disabled={true} value={formDetalle.producto?.precio || ""} />
                    <FormField className="col-lg-8 col-12 mb-lg-2 mb-3" label="Cantidad:" name="cantidad" onChange={handleChangeDetalleVenta} placeholder="la cantidad" disabled={config.disable} value={formDetalle.cantidad || 0} />
                    {accion !== "show" && (<div className="d-flex align-items-end justify-content-center justify-content-lg-start flex-wrap col-lg-4 col-12 mb-2">
                        <button className="btn btn-success d-flex align-items-center gap-2">
                            <i className="bi bi-plus-circle "></i>
                            <span className="d-inline d-lg-none">Agregar</span>
                        </button>
                    </div>)}
                </div>
                <div className=" col-lg-7 col-12">
                    <Table acciones={personalizarAcciones({ action: "show", render: false })} nombreEntidad="detalle de la venta" data={formVenta.detalles.map(value => mapDetalleVentaToTableData(value))} nombreColumnas={["Producto", "Cantidad", "Precio"]} className="border border-dark-subtle shadow-sm " />
                </div>
            </div>

            <div className="row d-flex gap-lg-0 gap-4 border rounded-2 m-0 p-4">
                <FormField label="Fecha:" name="cantidad" disabled={true} value={formVenta.fecha.toLocaleDateString()} />
                <FormField label="Total precio:" name="total" disabled={true} value={formVenta.total} />
            </div>
            <FormActions accion={accion} config={config} />
        </form>
    )
}

export default VentaFormulario
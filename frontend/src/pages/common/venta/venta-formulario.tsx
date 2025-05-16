import { useNavigate, useParams } from "react-router-dom";
import { FormVenta, Venta } from '../../../core/models/Venta';
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAccionFormulario } from "../../../shared/hooks/useAccionFormulario";
import FormField from "../../../shared/components/form-field/form-field";
import FormActions from "../../../shared/components/form-actions/form-actions";
import Table from "../../../shared/components/table/table";
import { DetalleVenta, DetalleVentaTableData, FormDetalleVenta } from '../../../core/models/DetalleVenta';
import { personalizarAcciones } from "../../../core/config/table/acciones.config";
import { MetodoPago } from "../../../core/models/MetodoPago";
import { useValidation } from "../../../shared/hooks/useValidation";
import { validations } from "../../../shared/utils/validations";
import Autocomplete from "../../../shared/components/autocomplete/autocomplete";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useApiEntity } from "../../../shared/hooks/useApiEntity";
import { Producto } from "../../../core/models/Producto";
import { Cliente } from "../../../core/models/Cliente";
import { mensaje } from "../../../shared/utils/mensaje";
import { useAuth } from "../../../core/context/AuthContext";

type ProductoBasic = Omit<Producto, 'codigoBarras' | 'cantidadUnitaria' | 'descripcion' | 'categoria'>;
type ClienteBasic = Omit<Cliente, 'tipoIdentificacion'>;
type VentaBasic = Omit<Venta, 'detalles'> & { detallesVenta: DetalleVenta[] };
type DetalleVentaBatchInput = {
    create?: (Omit<DetalleVenta, 'id' | 'producto'> & { productoId: string })[];
    update?: (Pick<DetalleVenta, 'id'> & Partial<Omit<DetalleVenta, 'id' | 'producto'>> & { productoId: string })[];
    delete?: { id: string }[];
};

type VentaUpdateAndCreate = Omit<Venta, 'detalles'> & DetalleVentaBatchInput;


function mapDetalleVentaToTableData(detalle: DetalleVenta): DetalleVentaTableData {
    return {
        id: detalle.id ?? "",
        productoNombre: detalle.producto?.nombre ?? "",
        producto: detalle.producto, // suponiendo que producto tiene una propiedad `nombre`
        cantidad: detalle.cantidad,
        subtotal: detalle.subtotal,
    };
}


function VentaFormulario() {

    const [detalleVentaBatch, setDetalleVentaBatch] = useState<DetalleVentaBatchInput>({
    });
    const { user } = useAuth();
    const { getById: getVentaById } = useApiEntity<VentaBasic>('ventas');
    const { create, update } = useApiEntity<VentaUpdateAndCreate>('ventas');
    const { id } = useParams<{ id: string }>();
    const {
        getAll: getProductos
    } = useApiEntity<Producto>('productos');
    const {
        getAll: getClientes
    } = useApiEntity<Cliente>('clientes');
    const initialValues = {
        cantidad: 0,
        subtotal: 0,
        productoName: "",
        producto: undefined
    };

    const [allProductos, setAllProductos] = useState<ProductoBasic[]>([]);
    const [allClientes, setAllClientes] = useState<ClienteBasic[]>([]);
    const [updateDetalle, setUpdateDetalle] = useState<boolean>(false);
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();
    const { accion: accionPage, config } = useAccionFormulario();

    const ventaValidations = {
        fecha: [validations.required],
        metodoPago: [validations.required],
    };
    const detalleVentaValidations = {
        cantidad: [validations.required],
        producto: [validations.required],
    };
    const { formData: formVenta, handleChange: handleChangeVenta, setFormData: setFormVenta, errors: errorsVenta, validateForm: validateFormVenta } = useValidation<FormVenta>({
        detalles: [],
        fecha: new Date(),
        metodoPago: MetodoPago.EFECTIVO,
        cliente: undefined,
        user: undefined,
        clienteName: "",
        total: 0
    }, ventaValidations);
    const { formData: formDetalleVenta, errors: errorsDetalle, validateForm: validateFormDetalle, setFormData: setFormDetalleVenta } = useValidation<FormDetalleVenta>(initialValues, detalleVentaValidations);

    const handleChangeCliente = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormVenta((prev) => ({ ...prev, [name]: value }));
        console.log(name, value);
    };

    const cargarVenta = async () => {
        const venta = await getVentaById(id!);
        if (venta) {
            console.log(venta);
            setFormVenta({
                ...venta, clienteName: venta.cliente?.nombre ?? "", fecha: new Date(venta.fecha), id: venta.id ?? "", detalles: venta.detallesVenta.map(detalle => mapDetalleVentaToTableData(detalle))
            });
        }
    };

    useEffect(() => {
        if (id) cargarVenta();
    }, [id]);

    const searchDetalleVenta = () => formVenta.detalles.find(detalle => detalle.producto!.id === formDetalleVenta.producto!.id);

    const addDetalleVenta = () => {
        if (validateFormDetalle()) {
            const detalleVentaEncontrado = searchDetalleVenta();

            if (detalleVentaEncontrado && !updateDetalle) {
                MySwal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "El producto ya se encuentra agregado.",
                });
                return; // Importante: salir temprano
            }

            const newSubtotalProduct = (formDetalleVenta.producto?.precio ?? 0) * (formDetalleVenta.cantidad ?? 1);
            const detalleActualizado = {
                ...formDetalleVenta,
                subtotal: newSubtotalProduct
            };

            const nuevoDetalle = {
                productoId: detalleActualizado.producto?.id ?? "",
                cantidad: detalleActualizado.cantidad,
                subtotal: detalleActualizado.subtotal
            };

            console.log(nuevoDetalle);

            if (!updateDetalle) {
                setDetalleVentaBatch(previo => ({
                    ...previo,
                    create: [...(previo.create ?? []), nuevoDetalle]
                }));
            } else {
                if (detalleActualizado.id || detalleActualizado.id !== "") {
                    setDetalleVentaBatch(previo => {
                        const yaExiste = (previo.update ?? []).some(detalle => detalle.id === detalleActualizado.id);
                        console.log(yaExiste);
                        const nuevoUpdate = yaExiste
                            ? (previo.update ?? []).map(detalle =>
                                detalle.id === detalleActualizado.id
                                    ? { id: detalleActualizado.id, ...nuevoDetalle }
                                    : detalle
                            )
                            : [...(previo.update ?? []), { id: detalleActualizado.id, ...nuevoDetalle }];

                        return {
                            ...previo,
                            update: nuevoUpdate
                        };
                    });

                } else {
                    setDetalleVentaBatch(previo => {
                        const yaExiste = (previo.create ?? []).some(detalle => detalle.productoId === nuevoDetalle.productoId);

                        if (yaExiste) {
                            return {
                                ...previo,
                                create: (previo.create ?? []).map(detalle =>
                                    detalle.productoId === nuevoDetalle.productoId ? nuevoDetalle : detalle
                                )
                            };
                        } else {
                            return {
                                ...previo,
                                create: [...(previo.create ?? []), nuevoDetalle]
                            };
                        }
                    });

                }
            }

            console.log(detalleVentaBatch);
            setFormVenta(prev => {
                if (!updateDetalle) {
                    const nuevosDetalles = [...prev.detalles, detalleActualizado];
                    return {
                        ...prev,
                        detalles: nuevosDetalles,
                        total: prev.total + newSubtotalProduct
                    };
                } else {

                    const detallesActualizados = prev.detalles.map(detalle =>
                        detalle.producto?.id === formDetalleVenta.producto?.id
                            ? detalleActualizado
                            : detalle
                    );

                    return {
                        ...prev,
                        detalles: detallesActualizados,
                        total: detallesActualizados.reduce((sum, d) => sum + d.subtotal, 0)
                    };
                }
            });


            setUpdateDetalle(false);
            setFormDetalleVenta(initialValues);
        }
    }

    const cargarProductos = async () => {
        const productos = await getProductos();

        if (productos) {
            const productosTransformados: Omit<Producto, 'codigoBarras' | 'cantidadUnitaria' | 'descripcion' | 'categoria'>[] = productos.map(producto => ({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio

            }));
            setAllProductos(productosTransformados);

        }
    };

    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarClientes = async () => {
        const clientes = await getClientes();

        if (clientes) {
            const clientesTransformados: Omit<Cliente, 'tipoIdentificacion'>[] = clientes.map(cliente => ({
                id: cliente.id,
                nombre: cliente.nombre,
                apellido: cliente.apellido,
                contacto: cliente.contacto,
                direccion: cliente.direccion
            }));
            console.log(clientes);
            setAllClientes(clientesTransformados);

        }
    };

    useEffect(() => {
        cargarClientes();
    }, []);

    const handleChangeDetalleVenta = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormDetalleVenta((prev) => ({ ...prev, [name]: value }));
        console.log(name, value);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (accionPage === "show") {
            navigate(-1);
            return;
        }

        if (!validateFormVenta()) {
            return;
        }

        const ventaData = {
            clienteId: formVenta.cliente?.id,
            detallesVenta: detalleVentaBatch,
            fecha: formVenta.fecha,
            metodoPago: formVenta.metodoPago,
            total: parseInt(String(formVenta.total), 10),
            userId: user?.id
        };

        console.log(ventaData);

        try {
            let result;
            if (accionPage === "add") {
                result = await create(ventaData);
            } else {
                if (!id) {
                    throw new Error("ID no proporcionado para edición");
                }
                console.log(detalleVentaBatch);
                result = await update(id, ventaData);
            }

            // Asumiendo que tu API devuelve un objeto con propiedad 'msg'
            if (result && typeof result === 'object' && 'msg' in result && typeof result.msg === 'string') {
                mensaje(result.msg, "success");
            }

            navigate(-1);
        } catch (error) {
            console.error("Error al procesar el formulario:", error);
            mensaje(error instanceof Error
                ? error.message
                : "Ocurrió un error inesperado", "error");
        }
    }

    const accionesPersonalizadas = (accion: "add" | "edit" | "show") => {

        return [
            ...personalizarAcciones<DetalleVenta>({
                action: "show",
                render: false
            }, {
                action: "edit",
                render: accion !== "show",
                onClick: (id, data) => {
                    setUpdateDetalle(true);
                    setFormDetalleVenta({ productoName: (data.producto?.nombre ?? ""), subtotal: data.subtotal, cantidad: data.cantidad, id: data.id ?? "", producto: data.producto });
                    console.log(id, data);

                }
            }, {
                action: "delete",
                render: accion !== "show",
                onClick: (id, data) => {
                    MySwal.fire({
                        title: '¿Está seguro del eliminar el detalle de la venta',
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        cancelButtonText: "Cancelar",
                        confirmButtonText: "Si, eliminar!"
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            //Accion en caso de que elijan el SI 
                            if (data.id) {
                                setDetalleVentaBatch(previo => ({
                                    ...previo,
                                    delete: [...previo.delete ?? [], { id: data.id ?? "" }]
                                }));
                            }
                            setDetalleVentaBatch(prev => {
                                const nuevosDetalles = prev.update?.filter(detalle => detalle.productoId !== data.producto?.id);
                                return {
                                    ...prev,
                                    update: nuevosDetalles
                                };
                            });
                            setDetalleVentaBatch(prev => {
                                const nuevosDetalles = prev.create?.filter(detalle => detalle.productoId !== data.producto?.id);
                                return {
                                    ...prev,
                                    create: nuevosDetalles
                                };
                            });
                            setFormVenta(prev => {
                                const nuevosDetalles = prev.detalles.filter(detalle => detalle.producto?.id !== data.producto?.id);
                                return {
                                    ...prev,
                                    detalles: nuevosDetalles,
                                    total: nuevosDetalles.reduce((acc, detalle) => acc + detalle.subtotal, 0)
                                };
                            });
                        }
                    });
                    console.log(id, data)
                }
            }),
        ]
    };


    return (
        <form onSubmit={handleSubmit}>
            <span className="p-0 m-0">Datos del cliente</span>
            <div className="row border rounded-2 m-0 p-lg-4 p-3 mb-4">
                <Autocomplete listaDatos={allClientes}
                    setFormData={setFormVenta}
                    parametro={formVenta.clienteName ?? ""}
                    campoObjeto="cliente"
                    campoTexto="clienteName"
                    properties={["nombre", "apellido"]}
                    className="col-lg-4 col-12 mb-3"
                >
                    <FormField className="col-12" label="Nombre:" name="clienteName" onChange={handleChangeCliente} placeholder="el nombre" disabled={config.disable} value={formVenta.clienteName || ""} />
                </Autocomplete>
                <FormField className="col-lg-4 col-12 mb-lg-0 mb-3" label="Dirección:" name="direccion" disabled={true} value={formVenta.cliente?.direccion || ""} />
                <FormField className="col-lg-4 col-12 mb-lg-0 mb-2" label="Contacto:" name="contacto" disabled={true} value={formVenta.cliente?.contacto || ""} />
            </div>
            <span className="p-0 m-0">Datos del producto</span>
            <div className="row border rounded-2 m-0 p-lg-4 p-3 mb-4">
                <div className="row m-0 p-0 col-lg-5 col-12 mb-4 mb-lg-0">
                    <Autocomplete listaDatos={allProductos}
                        setFormData={setFormDetalleVenta}
                        parametro={formDetalleVenta.productoName ?? ""}
                        campoObjeto="producto"
                        campoTexto="productoName"
                        properties={["nombre"]}
                        className="col-lg-12 col-12 mb-3"
                    >
                        <FormField error={errorsDetalle.producto} className="col-12" label="Nombre:" name="productoName" onChange={handleChangeDetalleVenta} placeholder="el nombre" disabled={config.disable} value={formDetalleVenta.productoName || ""} />
                    </Autocomplete>
                    <FormField className="col-lg-6 col-12 mb-3" label="Codigo:" name="id" disabled={true} value={formDetalleVenta.producto?.id || ""} />
                    <FormField className="col-lg-6 col-12 mb-3" label="Precio:" name="precio" disabled={true} value={formDetalleVenta.producto?.precio || ""} />
                    <div className="col-12 mb-3">
                        <label htmlFor="cantidad" className="form-label">Cantidad:</label>
                        <div className="d-flex flex-lg-nowrap flex-wrap  gap-3">
                            <input className="form-control" name="cantidad" onChange={handleChangeDetalleVenta} placeholder="la cantidad" disabled={config.disable} value={formDetalleVenta.cantidad || ""} />
                            {accionPage !== "show" && (<div className="d-flex align-items-end justify-content-center justify-content-lg-start flex-wrap col-lg-3 col-12 mb-2">
                                <button type="button" className={`btn btn-${!updateDetalle ? 'success' : 'primary'} d-flex align-items-center gap-2`} onClick={addDetalleVenta}>
                                    <i className={`bi bi-${!updateDetalle ? 'plus-circle' : 'pencil'}`}></i>
                                    <span className="d-inline d-lg-none">{!updateDetalle ? "Agregar" : "Editar"}</span>
                                </button>
                            </div>)}
                        </div>
                        {errorsDetalle.cantidad && (
                            <div className="invalid-feedback d-block "> {/* d-block para forzar visualización */}
                                {errorsDetalle.cantidad}
                            </div>
                        )}
                    </div>
                </div>
                <div className=" col-lg-7 col-12">
                    <Table columnas={["productoNombre", "cantidad", "subtotal"]} acciones={accionesPersonalizadas(accionPage)} nombreEntidad="detalle de la venta" data={formVenta.detalles.map(value => mapDetalleVentaToTableData(value))} nombreColumnas={["Producto", "Cantidad", "Precio"]} className="border border-dark-subtle shadow-sm " />
                </div>
            </div>

            <div className="row d-flex gap-lg-0 gap-4 border rounded-2 m-0 p-4">
                <div className="col-lg-4 col-12">
                    <label htmlFor="metodoPago" className="form-label">Metodo de pago:</label>
                    <select
                        className={`form-select ${errorsVenta.metodoPago && "is-invalid"}`}
                        name="metodoPago"
                        value={formVenta.metodoPago} // Debería ser la clave (CC, TI, etc.)
                        id="metodoPago"
                        disabled={config.disable}
                        onChange={handleChangeVenta}
                    >
                        <option value="">Seleccione el metodo de pago</option>
                        {Object.entries(MetodoPago).map(([key, value]) => (
                            <option key={key} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                    <div className="invalid-feedback d-block"> {/* d-block para forzar visualización */}
                        {errorsVenta.metodoPago}
                    </div>
                </div>
                <FormField className="col-lg-4 col-12" label="Fecha:" name="fecha" disabled={true} value={formVenta.fecha.toLocaleDateString()} />
                <FormField className="col-lg-4 col-12" label="Total precio:" name="total" disabled={true} value={formVenta.total} />
            </div>
            <FormActions accion={accionPage} config={config} />
        </form>
    )
}

export default VentaFormulario
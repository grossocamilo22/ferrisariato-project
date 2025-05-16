import { useState, useEffect } from "react";
import "./table.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Accion, defaultAcciones } from "../../../core/config/table/acciones.config";

export type CellValue = string | number | boolean | Date | null | undefined | object;

export type TablaEstructura<T extends { id?: string | number } & Record<string, CellValue>> = {
    nombreColumnas: string[];
    data: T[];
    nombreEntidad: string,
    className?: string
    acciones?: Accion<T>[];
    columnas: Array<keyof T>
}

const deleteData = (
    id: string,
    nombreEntidad: string,
    onConfirm: () => Promise<void> | void
) => {
    const MySwal = withReactContent(Swal);

    MySwal.fire({
        title: `¿Está seguro de eliminar el ${nombreEntidad} con id = ${id}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar!",
        cancelButtonText: "Cancelar"
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                await onConfirm();
                MySwal.fire(
                    '¡Eliminado!',
                    `El ${nombreEntidad} ha sido eliminado.`,
                    'success'
                );
            } catch (error: unknown) {
                MySwal.fire(
                    'Error',
                    `No se pudo eliminar el ${error}.`,

                );
            }
        }
    });
};

function Table<T extends { id?: string | number } & Record<string, CellValue>>({
    nombreColumnas = [],
    nombreEntidad = "",
    data = [],
    className = " border-top",
    acciones = defaultAcciones(),
    columnas = [],
    onDelete 
}: TablaEstructura<T> & {
    onDelete?: (id: string) => Promise<void> | void;
}) {

    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, data.length);
    const currentItems = data.slice(startIndex, endIndex);

    const navigate = useNavigate();

    useEffect(() => {
        if (totalPages > 0 && currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [totalPages, currentPage]);

    const handleActionClick = (accion: Accion<T>, element: T) => {
        const id = String(element.id);
        console.log(id)

        if (accion.onClick) {
            return accion.onClick(id, element);
        }

        switch (accion.action) {
            case 'delete':
                return deleteData(id, nombreEntidad, async () => {
                    if (onDelete) {
                        await onDelete(id);
                    }
                });
            case 'show':
            case 'edit':
                return navigate(`${accion.action}/${id}`);
            default:
                console.warn(`Acción '${accion.action}' no implementada`);
        }
    };


    return (
        <div className="table-responsive">
            <table className={`table text-center ${className}`}>

                <thead className="align-middle">
                    <tr>
                        {nombreColumnas.map((nombreColumna, idx) => (
                            <th key={idx} className="fw-medium">
                                {nombreColumna}
                            </th>
                        ))}
                        {acciones.length > 0 && <th className="fw-medium">Acciones</th>}
                    </tr>
                </thead>


                <tbody className="table-body align-middle">
                    {currentItems.length > 0 ?
                        (
                            currentItems.map((element, rowIdx) => (

                                <tr key={rowIdx}>
                                    {columnas.map((key) => (
                                        <td key={String(key)} className="fw-normal">
                                            <span className="d-lg-none">{String(key)}</span>
                                            {String(element[key])}
                                        </td>
                                    ))}
                                    {acciones.length > 0 && (
                                        <td>
                                            <span className="d-lg-none">Acciones</span>
                                            <section className="d-flex justify-content-center gap-1">
                                                {acciones.map((accion, idx) => accion.render && (
                                                    <button
                                                        key={idx}
                                                        type="button"
                                                        className="btn btn-table border border-0 rounded-circle"
                                                        onClick={() => handleActionClick(accion, element)}
                                                        aria-label={accion.action}
                                                    >
                                                        <i className={`fs-5 text-${accion.color} bi bi-${accion.icono}`}></i>
                                                    </button>
                                                ))}
                                            </section>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )
                        : <tr><td colSpan={nombreColumnas.length + 1}>No hay datos</td></tr>}
                </tbody>

                {/* Pie de página */}
                <tfoot>
                    <tr>
                        <td colSpan={nombreColumnas.length + (acciones.length > 0 ? 1 : 0)} className="border border-0 p-3">
                            <section className="d-flex flex-lg-row flex-column gap-2 justify-content-end">
                                <label className="col-form-label">Registros por pagina</label>
                                <div className="col-lg-1 col-12">
                                    <select
                                        className="form-select border border-black border-opacity-50"
                                        value={itemsPerPage}
                                        onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                    >
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={15}>15</option>
                                    </select>
                                </div>
                                <label className="col-form-label mx-4">
                                    {startIndex + 1} - {endIndex} de {data.length}
                                </label>
                                <div className="btn-group" role="group">
                                    <button
                                        type="button"
                                        className="btn btn-table border border-0 rounded-circle"
                                        disabled={currentPage < 2}
                                        onClick={() => setCurrentPage(currentPage - 1)}
                                    >
                                        <i className="bi bi-chevron-left"></i>
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-table border border-0 rounded-circle"
                                        disabled={currentPage >= totalPages}
                                        onClick={() => setCurrentPage(currentPage + 1)}
                                    >
                                        <i className="bi bi-chevron-right"></i>
                                    </button>
                                </div>
                            </section>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

export default Table;
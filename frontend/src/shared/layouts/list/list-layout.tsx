import Table, { TablaEstructura } from "../../components/table/table"
import { ToolBarProps } from "../../components/toolbar/toolbar"
import Toolbar from '../../components/toolbar/toolbar';


type ListLayoutProps<T extends { id: string | number }> = TablaEstructura<T> & ToolBarProps & { nombreEntidad: string };
function ListLayout<T extends { id: string | number }>({ nombreColumnas = [], data = [], children, nombreEntidad = "" }: ListLayoutProps<T>) {
    return (
        <section className="d-flex flex-column gap-lg-4  gap-3  ">
            <Toolbar children={children} />
            <Table data={data} nombreColumnas={nombreColumnas} nombreEntidad={nombreEntidad} />
        </section>
    )
}

export default ListLayout
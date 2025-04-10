import { useLocation } from "react-router-dom"



function Breadcrumb() {
    const location = useLocation();

    return (
        <section className="breadcrumb-container" aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li>{location.pathname}</li>
            </ol>
        </section>)

}

export default Breadcrumb
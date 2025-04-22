
interface IconItemProps {
    showIcon: boolean;
}

function IconItem({ showIcon }: IconItemProps) {
    return showIcon ? (
        <i className="btn border-0 position-absolute top-0 end-0 bi bi-search fw-bolder"></i>
    ) : null;
}

interface BtnSearchProps {
    placeholder?: string;
    type?: string;
    showIcon?: boolean;
}


function BtnSearch({ placeholder = "", type = "text", showIcon = true }: BtnSearchProps) {
    return (
        <div className="position-relative col-lg-4 col-12">
            <input type={type} className="form-control border border-black border-opacity-50" placeholder={placeholder} />
            <IconItem showIcon={showIcon} />
        </div>
    )
}

export default BtnSearch
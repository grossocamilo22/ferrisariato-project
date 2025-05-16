import { useEffect, useState } from "react";

// BtnSearch.tsx
interface BtnSearchProps {
    placeholder?: string;
    type?: string;
    showIcon?: boolean;
    onSearch: (term: string) => void; // Debe recibir solo el string
    debounceTime?: number;
}

function BtnSearch({ 
    placeholder = "", 
    type = "text", 
    showIcon = true, 
    onSearch,
    debounceTime = 300 
}: BtnSearchProps) {
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(inputValue); // Solo pasa el término de búsqueda
        }, debounceTime);

        return () => clearTimeout(timer);
    }, [inputValue, onSearch, debounceTime]);

    return (
        <div className="position-relative col-lg-4 col-12">
            <input 
                type={type}
                className="form-control border border-black border-opacity-50"
                placeholder={placeholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            {showIcon && (
                <i className="btn border-0 position-absolute top-0 end-0 bi bi-search fw-bolder"></i>
            )}
        </div>
    );
}

export default BtnSearch
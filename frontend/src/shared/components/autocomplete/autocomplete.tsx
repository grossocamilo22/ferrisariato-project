import React, { useEffect, useState } from "react"
import "./autocomplete.css"
export interface AutocompleteProps<T, TForm> {
  children: React.ReactNode;
  listaDatos: T[];
  setFormData: React.Dispatch<React.SetStateAction<TForm>>;
  parametro: string;
  campoObjeto: keyof TForm;
  campoTexto?: keyof TForm;
}


function Autocomplete<T extends { nombre?: string; id?: string }, TForm>({
  children,
  listaDatos,
  setFormData,
  parametro,
  campoObjeto,
  campoTexto
}: AutocompleteProps<T, TForm>) {
  const [showList, setShowList] = useState(false);
  const [listado, setListado] = useState<T[]>([]);
  const [isFocused, setIsFocused] = useState(false);


  useEffect(() => {
    if (!parametro || !isFocused) {
      setListado([]);
      setShowList(false);
      return;
    }

    const resultados = listaDatos.filter(item =>
      item.nombre?.toLowerCase().includes(parametro.toLowerCase())
    );
    setListado(resultados);
    setShowList(resultados.length > 0);
  }, [parametro, listaDatos, isFocused]);

  const handleSelect = (data: T) => {
    setFormData((prev: TForm) => ({
      ...prev,
      [campoObjeto]: data,
      ...(campoTexto ? { [campoTexto]: data.nombre } : {}),
    }));
    setListado([]);
    setShowList(false);
    setIsFocused(false);
  };
  return (
    <div className="position-relative col-lg-4 col-12"
      onFocus={() => setIsFocused(true)}
      onBlur={() => setTimeout(() => setIsFocused(false), 200)}
    >
      {children}
      <section className={`autocomplete-container position-absolute w-100 top-100 start-0 ${showList ? "d-block" : "d-none"} `} >
        <ul className="m-0 p-0 border overflow-y-auto">
          {listado.map(data => (
            <li key={data.id ?? ""}>
              <button
                role="option"
                aria-selected="false"
                type="button"
                className="dropdown-item py-2 px-4"
                onClick={() => handleSelect(data)}
              >

                {data.nombre}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default Autocomplete 
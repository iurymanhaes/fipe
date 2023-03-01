import { useState } from "react";
import ValuesContext from "./valuesContext";

type ValuesProviderProps = {
  children: React.ReactNode;
};



export const ValuesProvider = ({ children }: ValuesProviderProps) => {
  const [values, setValues] = useState<FormattedResult>({
    valor: "",
    marca: "",
    modelo: "",
    anoModelo: 0,
    combustivel: "",
    codigoFipe: "",
    mesReferencias: "",
    tipoVeiculo: 0,
    siglaCombustivel: "",
  });

  const updateValues = (newValues: FormattedResultWithUpdate) => {
    setValues(newValues);
  };

  return (
    <ValuesContext.Provider value={{ ...values, updateValues }}>
      {children}
    </ValuesContext.Provider>
  );
};

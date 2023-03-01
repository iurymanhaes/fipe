import React, { createContext } from "react";

const ValuesContext = createContext<FormattedResultWithUpdate>({
  valor: "",
  marca: "",
  modelo: "",
  anoModelo: 0,
  combustivel: "",
  codigoFipe: "",
  mesReferencias: "",
  tipoVeiculo: 0,
  siglaCombustivel: "",
  updateValues: () => {},
});

export default ValuesContext;

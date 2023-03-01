import { Dictionary } from "lodash";

export const convertToFormattedResult = (
    data: Dictionary<string | number>
  ): FormattedResult => {
    const formattedResult: FormattedResult = {
      valor: data.Valor as string,
      marca: data.Marca as string,
      modelo: data.Modelo as string,
      anoModelo: data.AnoModelo as number,
      combustivel: data.Combustivel as string,
      codigoFipe: data.CodigoFipe as string,
      mesReferencias: data.MesReferencias as string,
      tipoVeiculo: data.TipoVeiculo as number,
      siglaCombustivel: data.SiglaCombustivel as string,
    };

    return formattedResult;
  };
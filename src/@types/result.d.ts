interface Result {
  Valor: string;
  Marca: string;
  Modelo: string;
  AnoModelo: number;
  Combustivel: string;
  CodigoFipe: string;
  MesReferencias: string;
  TipoVeiculo: number;
  SiglaCombustivel: string;
}

interface FormattedResult {
  valor: string;
  marca: string;
  modelo: string;
  anoModelo: number;
  combustivel: string;
  codigoFipe: string;
  mesReferencias: string;
  tipoVeiculo: number;
  siglaCombustivel: string;
}

interface FormattedResultWithUpdate extends FormattedResult {
  updateValues: (newValues: FormattedResultWithUpdate) => void;
}
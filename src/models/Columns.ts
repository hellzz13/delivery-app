export interface Column {
  id:
    | "id"
    | "motivo"
    | "kmInicial"
    | "kmFinal"
    | "inicioDeslocamento"
    | "fimDeslocamento"
    | "checkList"
    | "observacao"
    | "idCondutor"
    | "idVeiculo"
    | "idCliente"
    | "nome"
    | "numeroHabilitacao"
    | "catergoriaHabilitacao"
    | "vencimentoHabilitacao"
    | "numeroDocumento"
    | "tipoDocumento"
    | "logradouro"
    | "numero"
    | "bairro"
    | "cidade"
    | "uf"
    | "placa"
    | "marcaModelo"
    | "anoFabricacao"
    | "kmAtual";
  label: string;
  minWidth?: number;
  align?: "center";
}

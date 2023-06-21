export interface Column {
  id:
    | "motivo"
    | "kmInicial"
    | "kmFinal"
    | "inicioDeslocamento"
    | "fimDeslocamento"
    | "checkList"
    | "observacao"
    | "idCondutor"
    | "idVeiculo"
    | "idCliente";
  label: string;
  minWidth?: number;
  align?: "center";
}

"use client";

import TableBase from "@/components/TableBase";
import { useTable } from "@/components/TableBase/useTable.hook";
import { Delivery } from "@/models/Delivery";
import { api } from "@/services/api";
import { CircularProgress, Paper, Typography } from "@mui/material";

export default function Descolamento() {
  const { handleChangePage, handleChangeRowsPerPage, rows, page, rowsPerPage } =
    useTable<Delivery>(api.getDelivery);

  interface Column {
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
    format?: (value: number) => string;
  }

  const columns: readonly Column[] = [
    { id: "kmInicial", label: "Km Inicial", minWidth: 50 },
    {
      id: "kmFinal",
      label: "Km Final",
      minWidth: 50,
      align: "center",
      format: (value: number) => value.toLocaleString("en-US"),
    },
    {
      id: "inicioDeslocamento",
      label: "Inicio",
      minWidth: 70,
      align: "center",
      format: (value: number) => value.toLocaleString("en-US"),
    },
    {
      id: "fimDeslocamento",
      label: "Fim",
      minWidth: 50,
      align: "center",
      format: (value: number) => value.toFixed(2),
    },
    {
      id: "checkList",
      label: "Status",
      minWidth: 50,
      align: "center",
      format: (value: number) => value.toFixed(2),
    },
    { id: "motivo", label: "motivo", minWidth: 60 },
    {
      id: "observacao",
      label: "Observação",
      minWidth: 70,
      align: "center",
      format: (value: number) => value.toFixed(2),
    },
  ];

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "100px" }}>
      {rows ? (
        rows.length >= 1 ? (
          <TableBase
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            rows={rows}
            rowsPerPage={rowsPerPage}
            columns={columns}
          />
        ) : (
          <div className="py-16 w-full flex justify-center items-center">
            <Typography variant="body1">
              Não há dados à serem exibidos
            </Typography>
          </div>
        )
      ) : (
        <div className="py-16 w-full flex justify-center items-center">
          <CircularProgress />
        </div>
      )}
    </Paper>
  );
}

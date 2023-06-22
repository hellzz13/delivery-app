"use client";

import TableBase from "@/components/TableBase";
import { useTable } from "@/hooks/useTable.hook";
import { Column } from "@/models/Columns";
import { Delivery } from "@/models/Delivery";
import { api } from "@/services/api";
import { CircularProgress, Container, Paper, Typography } from "@mui/material";

export default function DeliveryPage() {
  const { handleChangePage, handleChangeRowsPerPage, rows, page, rowsPerPage } =
    useTable<Delivery>(api.getDelivery);

  const columns: readonly Column[] = [
    { id: "kmInicial", label: "Km Inicial", minWidth: 50 },
    {
      id: "kmFinal",
      label: "Km Final",
      minWidth: 50,
      align: "center",
    },
    {
      id: "inicioDeslocamento",
      label: "Data de partida",
      minWidth: 70,
      align: "center",
    },

    {
      id: "checkList",
      label: "Status",
      minWidth: 50,
      align: "center",
    },
    { id: "motivo", label: "motivo", minWidth: 60 },
    {
      id: "observacao",
      label: "Observação",
      minWidth: 70,
      align: "center",
    },
  ];

  return (
    <Container>
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
    </Container>
  );
}

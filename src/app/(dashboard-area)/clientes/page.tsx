"use client";

import FormConsumers from "@/components/Modal/FormConsumer";
import TableBase from "@/components/TableBase";
import ToastNotification from "@/components/ToastNotification";
import { useTable } from "@/hooks/useTable.hook";
import { Column } from "@/models/Columns";
import { Consumer } from "@/models/Consumer";
import { get } from "@/services/api";
import { CircularProgress, Container, Paper, Typography } from "@mui/material";

export default function ConsumersPage() {
  const { handleChangePage, handleChangeRowsPerPage, rows, page, rowsPerPage } =
    useTable<Consumer>(get.getConsumers, "consumers");

  const columns: readonly Column[] = [
    { id: "nome", label: "Nome", minWidth: 50 },
    {
      id: "numeroDocumento",
      label: "Documento",
      minWidth: 50,
      align: "center",
    },
    {
      id: "tipoDocumento",
      label: "Tipo Documento",
      minWidth: 70,
      align: "center",
    },

    {
      id: "uf",
      label: "Uf",
      minWidth: 50,
      align: "center",
    },
  ];

  return (
    <Container>
      <FormConsumers />
      <ToastNotification />
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

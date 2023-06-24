"use client";

import FormDrivers from "@/components/Modal/FormDrivers";
import TableBase from "@/components/TableBase";
import ToastNotification from "@/components/ToastNotification";
import { useTable } from "@/hooks/useTable.hook";
import { Column } from "@/models/Columns";
import { Drivers } from "@/models/Drivers";
import { get } from "@/services/api";
import { CircularProgress, Container, Paper, Typography } from "@mui/material";

export default function DriversPage() {
  const { handleChangePage, handleChangeRowsPerPage, rows, page, rowsPerPage } =
    useTable<Drivers>(get.getDrivers, "drivers");

  const columns: readonly Column[] = [
    { id: "nome", label: "Nome", minWidth: 50 },
    {
      id: "numeroHabilitacao",
      label: "Habilitação",
      minWidth: 50,
      align: "center",
    },
    {
      id: "catergoriaHabilitacao",
      label: "Categoria CNH",
      minWidth: 70,
      align: "center",
    },

    {
      id: "vencimentoHabilitacao",
      label: "Vencimento CNH",
      minWidth: 50,
      align: "center",
    },
  ];

  return (
    <Container>
      <FormDrivers />
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

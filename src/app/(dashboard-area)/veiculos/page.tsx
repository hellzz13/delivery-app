"use client";

import BasicModal from "@/components/Modal";
import TableBase from "@/components/TableBase";
import { useTable } from "@/hooks/useTable.hook";
import { Column } from "@/models/Columns";
import { Vehicle } from "@/models/Vehicle";
import { api } from "@/services/api";
import { CircularProgress, Container, Paper, Typography } from "@mui/material";

export default function VehiclesPage() {
  const { handleChangePage, handleChangeRowsPerPage, rows, page, rowsPerPage } =
    useTable<Vehicle>(api.getVehicle);

  const columns: readonly Column[] = [
    { id: "placa", label: "Placa", minWidth: 50 },
    {
      id: "marcaModelo",
      label: "Modelo",
      minWidth: 50,
      align: "center",
    },
    {
      id: "anoFabricacao",
      label: "Ano",
      minWidth: 70,
      align: "center",
    },

    {
      id: "kmAtual",
      label: "Kilometragem",
      minWidth: 50,
      align: "center",
    },
  ];

  return (
    <Container>
      <BasicModal />
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

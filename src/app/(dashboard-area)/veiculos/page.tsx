"use client";

import FormVehicles from "@/components/Modal/FormVehicle";
import TableBase from "@/components/TableBase";
import ToastNotification from "@/components/ToastNotification";
import TruckAnimation from "@/components/TruckLoading";
import { useTable } from "@/hooks/useTable.hook";
import { Column } from "@/models/Columns";
import { Vehicle } from "@/models/Vehicle";
import { get } from "@/services/api";
import { CircularProgress, Container, Paper, Typography } from "@mui/material";

export default function VehiclesPage() {
  const { handleChangePage, handleChangeRowsPerPage, rows, page, rowsPerPage } =
    useTable<Vehicle>(get.getVehicle, "vehicles");

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
      <FormVehicles />
      <ToastNotification />

      {rows ? (
        rows.length >= 1 ? (
          <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "100px" }}>
            <TableBase
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              page={page}
              rows={rows}
              rowsPerPage={rowsPerPage}
              columns={columns}
            />
          </Paper>
        ) : (
          <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "100px" }}>
            <div className="py-16 w-full flex justify-center items-center">
              <Typography variant="body1">
                Não há dados à serem exibidos
              </Typography>
            </div>
          </Paper>
        )
      ) : (
        <TruckAnimation />
      )}
    </Container>
  );
}

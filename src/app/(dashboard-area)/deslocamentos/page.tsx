"use client";

import FormDelivery from "@/components/Modal/FormDelivery";
import TableBase from "@/components/TableBase";
import ToastNotification from "@/components/ToastNotification";
import TruckAnimation from "@/components/TruckLoading";
import { Context } from "@/context/AuthContexts";
import { useTable } from "@/hooks/useTable.hook";
import { Column } from "@/models/Columns";
import { Delivery } from "@/models/Delivery";
import { get } from "@/services/api";
import { Container, Paper, Typography } from "@mui/material";
import { useContext, useEffect } from "react";

export default function DeliveryPage() {
  const { handleChangePage, handleChangeRowsPerPage, rows, page, rowsPerPage } =
    useTable<Delivery>(get.getDelivery, "delivery");

  const columns: readonly Column[] = [
    { id: "id", label: "ID", minWidth: 50 },
    { id: "kmInicial", label: "Km Inicial", minWidth: 50 },

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
      <FormDelivery />
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

"use client";

import DeleteAlert from "@/components/Modal/DeleteAlert";
import DoneDelivery from "@/components/Modal/DoneDelivery";
import ToastNotification from "@/components/ToastNotification";
import TruckAnimation from "@/components/TruckLoading";
import { useDetails } from "@/hooks/useDetails.hook";
import { Delivery } from "@/models/Delivery";
import { get, remove, update } from "@/services/api";
import {
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { id: string } }) {
  const { back } = useRouter();
  const { data } = useDetails<Delivery>(
    get.getDeliveryById,
    params.id,
    "deliverys"
  );

  return (
    <Container style={{ marginTop: "110px" }}>
      <ToastNotification />
      {data ? (
        <div>
          <Paper sx={{ paddingX: "20px", paddingY: "30px" }}>
            <div className="flex justify-between items-center">
              <Typography variant="h1" fontSize={25} paddingY={2}>
                Deslocamento: {data.id}
              </Typography>
              <div>
                {!data.fimDeslocamento ? (
                  <DoneDelivery id={params.id} name="Concluir" />
                ) : (
                  <Typography variant="subtitle1">Concluido</Typography>
                )}
              </div>
            </div>
            <Divider />

            <Grid
              container
              paddingTop={2}
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={2} sm={4} md={4}>
                <span className="font-bold">Kilometragem Inicia: </span>
                {data.kmInicial}
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <span className="font-bold">Finalizado:</span>{" "}
                {data.kmFinal ? "Finalizado" : "Em rota"}
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <span className="font-bold">Inicio Deslocamento:</span>{" "}
                {dayjs(data.inicioDeslocamento).format("DD/MM/YYYY")}
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <span className="font-bold">Fim Deslocamento:</span>{" "}
                {data.fimDeslocamento
                  ? dayjs(data.fimDeslocamento).format("DD/MM/YYYY")
                  : "Em rota"}
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <span className="font-bold">Status: </span>
                {data.checkList}
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <span className="font-bold">Motivo:</span> {data.motivo}
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <span className="font-bold">observacao:</span> {data.observacao}
              </Grid>
            </Grid>
          </Paper>

          <Grid
            container
            paddingTop={2}
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            justifyContent="flex-end"
          >
            <Grid item xs={2} sm={4} md={4}>
              <Button
                variant="contained"
                onClick={() => back()}
                sx={{ marginTop: "10px" }}
                fullWidth
              >
                Voltar
              </Button>
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <DeleteAlert
                name="Cancelar"
                id={params.id}
                urlRoute="Deslocamento"
                remove={remove.deleteData}
              />
            </Grid>
          </Grid>
        </div>
      ) : (
        <TruckAnimation />
      )}
    </Container>
  );
}

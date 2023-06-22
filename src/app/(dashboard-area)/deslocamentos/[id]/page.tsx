"use client";

import { useDetails } from "@/hooks/useDetails.hook";
import { Delivery } from "@/models/Delivery";
import { api } from "@/services/api";
import {
  Button,
  CircularProgress,
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
  const { data } = useDetails<Delivery>(api.getDeliveryById, params.id);

  return (
    <Container style={{ marginTop: "110px" }}>
      {data ? (
        <>
          <Paper sx={{ padding: "10px" }}>
            <Typography variant="h1" fontSize={25} paddingY={2}>
              Deslocamento: {data.id}
            </Typography>
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
                <span className="font-bold">Kilometragem Final:</span>{" "}
                {data.kmFinal}
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <span className="font-bold">Inicio Deslocamento:</span>{" "}
                {dayjs(data.inicioDeslocamento).format("DD/MM/YYYY")}
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <span className="font-bold">Fim Deslocamento:</span>{" "}
                {dayjs(data.fimDeslocamento).format("DD/MM/YYYY")}
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
              <Button
                variant="contained"
                color="error"
                onClick={() => {}}
                sx={{ marginTop: "10px" }}
                fullWidth
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </>
      ) : (
        <div className="py-16 w-full flex justify-center items-center">
          <CircularProgress />
        </div>
      )}
    </Container>
  );
}

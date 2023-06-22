"use client";

import { useDetails } from "@/hooks/useDetails.hook";
import { Consumer } from "@/models/Consumer";
import { get } from "@/services/api";
import {
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { id: string } }) {
  const { back } = useRouter();
  const { data } = useDetails<Consumer>(get.getConsumerById, params.id);

  return (
    <Container style={{ marginTop: "110px" }}>
      {data ? (
        <>
          <Paper sx={{ padding: "10px" }}>
            <Typography variant="h1" fontSize={25} paddingY={2}>
              Cliente: {data.id}
            </Typography>
            <Divider />

            <Grid
              container
              paddingTop={2}
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={2} sm={4} md={4}>
                <span className="font-bold">Nome: </span>
                {data.nome}
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <span className="font-bold">Documento:</span>{" "}
                {data.numeroDocumento}
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <span className="font-bold">Tipo de documento:</span>{" "}
                {data.tipoDocumento}
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <span className="font-bold">Rua:</span> {data.logradouro}
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <span className="font-bold">Número: </span>
                {data.numero}
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <span className="font-bold">Bairro:</span> {data.bairro}
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <span className="font-bold">Cidade:</span> {data.cidade}
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <span className="font-bold">UF:</span> {data.uf}
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
                Excluir
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

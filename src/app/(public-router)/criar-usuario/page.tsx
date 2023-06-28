"use client";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import api from "../../../services/authFakeApi";
import { toast } from "react-toastify";
import { useCallback } from "react";

export default function CreateUser() {
  const CreateUserSchema = z.object({
    username: z.string().nonempty("Campo obrigatório"),
    password: z.string().nonempty("Campo obrigatório"),
    confirmPassword: z.string().nonempty("Campo obrigatório"),
  });

  const { push } = useRouter();

  type CreateUserFormData = z.infer<typeof CreateUserSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(CreateUserSchema),
  });

  const handleRegister = useCallback(
    async function handleRegister(data: CreateUserFormData) {
      try {
        await api.post("/register", {
          name: data.username,
          username: data.username,
          password: data.password,
        });
        reset();
        toast.success("Cadastro efetuado com sucesso!");
        push("/");
      } catch (e: any) {
        toast.error(e.message);
      }
    },
    [push, reset]
  );

  return (
    <main className="container flex justify-center items-center mx-auto h-screen max-w-md">
      <Paper
        className="backdrop-blur-3xl bg-opacity-70 p-3 rounded-3xl"
        elevation={24}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{ background: "#19212C", padding: "40px" }}
            borderRadius={100}
          >
            <Image
              width={190}
              height={120}
              src="/logo.png"
              alt="logo da aplicação"
            />
          </Box>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(handleRegister)}
            sx={{ mt: 1 }}
          >
            <TextField
              {...register("username")}
              margin="normal"
              required
              fullWidth
              id="username"
              label="Usuário"
              name="username"
              autoComplete="username"
              autoFocus
              error={!!errors.username}
              helperText={errors.username && errors.username.message}
            />
            <TextField
              {...register("password")}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!errors.password}
              helperText={errors.password && errors.password.message}
            />
            <TextField
              {...register("confirmPassword")}
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirmar Senha"
              type="password"
              id="confirmPassword"
              autoComplete="current-confirmPassword"
              error={!!errors.confirmPassword}
              helperText={
                errors.confirmPassword && errors.confirmPassword.message
              }
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/">{"Voltar para login"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </main>
  );
}

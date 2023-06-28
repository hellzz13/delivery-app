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
import { useContext, useEffect, useState } from "react";
import { Context } from "@/context/AuthContexts";
import { Typography } from "@mui/material";

export default function Login() {
  const router = useRouter();

  const { handleLogin } = useContext(Context);

  const [hasAccount, setHasAccount] = useState(true);

  const UserSchema = z.object({
    username: z.string().nonempty("Campo obrigatório"),
    password: z.string().nonempty("Campo obrigatório"),
    // confirmPassword: z.string().nonempty("Campo obrigatório"),
  });

  type UserFormData = z.infer<typeof UserSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(UserSchema),
  });

  return (
    <main className="container flex justify-center items-center mx-auto h-screen">
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

          {!hasAccount ? (
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(handleLogin)}
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
                // {...register("confirmPassword")}
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirmar Senha"
                type="confirmPassword"
                id="confirmPassword"
                autoComplete="current-password"
                error={!!errors.password}
                helperText={errors.password && errors.password.message}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => router.push("/")}
              >
                Entrar
              </Button>
              <Grid container>
                <Grid item>
                  <Typography>
                    <span
                      className="cursor-pointer"
                      onClick={() => setHasAccount(false)}
                    >
                      {"Voltar"}
                    </span>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          ) : (
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(handleLogin)}
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => router.push("/")}
              >
                Entrar
              </Button>
              <Grid container>
                <Grid item>
                  <span
                    className="cursor-pointer"
                    onClick={() => setHasAccount(true)}
                  >
                    <Typography>{"Não tem uma conta? Cadastre-se!"}</Typography>
                  </span>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </Paper>
    </main>
  );
}

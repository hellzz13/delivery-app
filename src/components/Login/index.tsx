"use client";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const handleSubmit = (
    event: React.KeyboardEvent<HTMLInputElement> & {
      currentTarget: HTMLFormElement;
    }
  ) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

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
          <Paper className="bg-dark py-3 w-60 h-60 flex justify-center items-center rounded-full">
            <Image
              width={200}
              height={200}
              src="/logo.png"
              alt="logo da aplicação"
            />
          </Paper>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => router.push("/")}
            >
              Entrar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Esqueceu sua senha?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Não é cadastrado? Crie sua conta!"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </main>
  );
}

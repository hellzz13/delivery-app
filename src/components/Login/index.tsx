"use client";

import { Button, Container } from "@mui/material";
import Link from "next/link";

export default function LoginPage() {
  return (
    <Container>
      <h1>hello</h1>
      <Link href="/dashboard">go to dashboard</Link>
      <Button color="primary" variant="outlined">
        neutral
      </Button>
    </Container>
  );
}

"use client";
import { Container, IconButton } from "@mui/material";

import { Add } from "@mui/icons-material";

import Link from "next/link";
import CustomTable from "@/components/table";
import BasicModal from "@/components/Modal";

export default function Dashboard() {
  return (
    <Container style={{ marginTop: "100px" }}>
      <Link href="/">voltar</Link>

      <CustomTable />

      <BasicModal />
    </Container>
  );
}

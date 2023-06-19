"use client";
import { Box, Button, IconButton } from "@mui/material";

import { Add } from "@mui/icons-material";

import Link from "next/link";
import TableSkeleton from "@/components/Skeleton/TableSkeleton";

export default function Dashboard() {
  return (
    <main className="flex justify-center items-center w-full h-screen flex-col">
      <h1>Aqui é a dashboard</h1>
      <Link href="/">voltar</Link>

      <Box
        sx={{
          position: "absolute",
          right: "20px",
          bottom: "20px",
        }}
      >
        <IconButton color="inherit" aria-label="add" size="medium">
          <Add sx={{ fontSize: "40px" }} />
        </IconButton>
      </Box>

      <Button variant="contained" startIcon={<Add sx={{ fontSize: "40px" }} />}>
        Button
      </Button>

      {/* <TableSkeleton /> */}
    </main>
  );
}

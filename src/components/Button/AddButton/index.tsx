import { Add } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { ButtonHTMLAttributes } from "react";

type AddButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {};

export default function AddButton({ onClick, ...rest }: AddButtonProps) {
  return (
    <Button
      variant="contained"
      aria-label="add"
      size="medium"
      sx={{
        position: "fixed",
        right: "20px",
        bottom: "20px",
      }}
      onClick={onClick}
    >
      <Add sx={{ fontSize: "40px" }} />
    </Button>
  );
}

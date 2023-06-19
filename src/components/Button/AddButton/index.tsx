import { Add } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { ButtonHTMLAttributes } from "react";

type AddButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {};

export default function AddButton({ onClick, ...rest }: AddButtonProps) {
  return (
    <IconButton
      color="inherit"
      aria-label="add"
      size="medium"
      sx={{
        position: "absolute",
        right: "20px",
        bottom: "20px",
      }}
      onClick={onClick}
    >
      <Add sx={{ fontSize: "40px" }} />
    </IconButton>
  );
}

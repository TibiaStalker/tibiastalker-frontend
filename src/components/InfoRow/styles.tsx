import { styled } from "@mui/material/styles";

export const RowInformation = styled("div", {
  name: "StalkerInfoRow",
  slot: "root",
})(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: theme.palette.primary.main,
  borderRadius: 16,
  padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
}));

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export const FormerNames = ({ names }: { names: string[] }) => {
  if (names.length < 1) {
    return null;
  }

  return (
    <Typography variant="caption" component="div">
      Former names:{" "}
      <Stack direction="row" spacing={1} sx={{ display: "inline-flex" }}>
        {names.map(name => (
          <Chip label={name} key={name} variant="outlined" size="small" />
        ))}
      </Stack>
    </Typography>
  );
};

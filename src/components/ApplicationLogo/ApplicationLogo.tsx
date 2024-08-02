import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Image from "next/image";

import { sizing } from "./constants";
import { ApplicationLogoProps } from "./types";

const ApplicationLogo = ({
  size = "normal",
  inline = false,
}: ApplicationLogoProps) => {
  const { height, width, fontSize } = sizing[size];

  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={0.5}
      sx={{ display: inline ? "initial" : undefined }}
    >
      <Image src={"./logo/logo2.svg"} alt="" width={width} height={height} />
      <Typography
        variant="h6"
        sx={theme => ({
          fontSize,
          fontFamily:
            "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
          color: theme.palette.primary.main,
        })}
      >
        Tibia Stalker
      </Typography>
    </Stack>
  );
};

export default ApplicationLogo;

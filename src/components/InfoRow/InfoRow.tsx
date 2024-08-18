import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";

import * as S from "./styles";
import { InfoRowProps } from "./types";

export const InfoRow = ({ describe, value }: InfoRowProps) => {
  return (
    <S.RowInformation>
      <Typography
        component="span"
        sx={{ fontWeight: 700, flexBasis: 90, flexShrink: 0 }}
        align="right"
      >
        {describe}
      </Typography>
      <Divider
        orientation="vertical"
        flexItem
        sx={{
          borderColor: "primary.dark",
        }}
      />
      <Typography component="span">{value}</Typography>
    </S.RowInformation>
  );
};

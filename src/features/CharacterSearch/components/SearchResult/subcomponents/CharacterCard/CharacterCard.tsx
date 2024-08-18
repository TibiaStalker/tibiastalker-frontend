import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";

import { toPascalCase } from "~/utils/stringModifier";

import { CharacterCardProps } from "./types";

export const CharacterCard = ({ character, onClick }: CharacterCardProps) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardActionArea onClick={onClick}>
        <CardHeader
          title={toPascalCase(character.otherCharacterName)}
          titleTypographyProps={{ color: "primary.main" }}
          action={
            <Box sx={{ mt: "9px", mr: 1.5 }}>
              <SearchIcon color="primary" />
            </Box>
          }
        />
        <CardContent>
          <Stack gap={1}>
            <div>
              <Typography variant="body2" fontWeight={600} component="span">
                number of matches:
              </Typography>{" "}
              <Typography component="span">
                {character.numberOfMatches}
              </Typography>
            </div>

            <div>
              <Typography variant="body2" fontWeight={600} component="span">
                first match:
              </Typography>{" "}
              <Typography component="span" noWrap>
                {format(character.firstMatchDateOnly, "yyyy-MM-dd")}
              </Typography>
            </div>

            <div>
              <Typography variant="body2" fontWeight={600} component="span">
                last match:
              </Typography>{" "}
              <Typography component="span" noWrap>
                {format(character.lastMatchDateOnly, "yyyy-MM-dd")}
              </Typography>
            </div>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

import Stack from "@mui/material/Stack";
import { format } from "date-fns";

import InfoRow from "~/components/InfoRow";

import { CharacterCharacterizationProps } from "./types";

export const CharacterCharacterization = ({
  character,
  formerWorlds = [],
}: CharacterCharacterizationProps) => {
  const { world, vocation, level, lastLogin } = character;

  return (
    <Stack gap={2} sx={{ mt: 4 }}>
      <InfoRow describe="World" value={world} />

      <InfoRow describe="Vocation" value={vocation} />

      <InfoRow describe="Level" value={level} />

      <InfoRow
        describe="Last Login"
        value={format(lastLogin, "dd.MM.yyyy HH:mm:ss")}
      />
    </Stack>
  );
};

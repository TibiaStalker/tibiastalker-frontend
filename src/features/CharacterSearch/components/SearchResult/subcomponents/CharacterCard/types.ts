import { PossibleInvisibleCharacterResponse } from "~/types/CharacterResult";

export type CharacterCardProps = {
  character: PossibleInvisibleCharacterResponse;
  onClick: () => void;
};

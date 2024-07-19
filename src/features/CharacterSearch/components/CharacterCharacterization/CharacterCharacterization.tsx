import { format } from "date-fns";

import CharacterBasicProperty from "../../../../components/BasicPropertyResult";
import { CharacterCharacterizationProps } from "./types";

export const CharacterCharacterization = ({
  character,
}: CharacterCharacterizationProps) => {
  const { name, world, vocation, level, lastLogin, traded } = character;

  return (
    <>
      <CharacterBasicProperty
        propertyName="Name"
        propertyValue={`${name} ${traded ? "(traded)" : ""}`}
      />
      <CharacterBasicProperty propertyName="World" propertyValue={world} />
      <CharacterBasicProperty
        propertyName="Vocation"
        propertyValue={vocation}
      />
      <CharacterBasicProperty propertyName="Level" propertyValue={level} />
      <CharacterBasicProperty
        propertyName="Last Login"
        propertyValue={format(lastLogin, "dd.MM.yyyy HH:mm:ss")}
      />
    </>
  );
};

import { CharacterResponse } from "../../../../types/CharacterResult";
import tibiaStalkerClient from "../../../../utils/TibiaStalkerClient/tibiaStalkerClient";

const fetchCharacterData = async (input: string) => {
  return tibiaStalkerClient<CharacterResponse>(`/${input}`);
};

export default fetchCharacterData;

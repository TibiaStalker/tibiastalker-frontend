import { SimilarCharactersResponse } from "../../../../types/CharacterResult";
import tibiaStalkerClient from "../../../../utils/TibiaStalkerClient/tibiaStalkerClient";

const fetchSimilarCharactersData = async (input: string, page: number) => {
  return tibiaStalkerClient<SimilarCharactersResponse>(
    `?searchText=${input}&page=${page}&pageSize=10`,
  );
};

export default fetchSimilarCharactersData;

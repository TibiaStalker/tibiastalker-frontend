import { charactersUrl } from "../constants/api";
import {
  CharacterResponse,
  ErrorResponse,
  SimilarCharactersResponse,
} from "../types/CharacterResult";

const fetchCharacterData = async (
  characterName: string,
  setCharacterData: (characterData: CharacterResponse | ErrorResponse) => void,
): Promise<void> => {
  const result = await fetch(`${charactersUrl}/${characterName}`);
  const data = await result.json();
  setCharacterData(data);
  return Promise.resolve();
};

const fetchSimilarCharactersData = async (
  characterName: string,
  page: number,
  setSimilarCharactersData: (
    similarCharactersData: SimilarCharactersResponse,
  ) => void,
): Promise<void> => {
  const result = await fetch(
    `${charactersUrl}?searchText=${characterName}&page=${page}&pageSize=10`,
  );
  const data = await result.json();
  setSimilarCharactersData(data);
  return Promise.resolve();
};

export { fetchCharacterData, fetchSimilarCharactersData };

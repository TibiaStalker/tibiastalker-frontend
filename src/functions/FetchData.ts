import { BASE_URL } from "../constants/tibiastalkerApi";
import { CharacterResponse, ErrorResponse, SimilarCharactersResponse } from "../types/CharacterResult";

const fetchCharacterData = async (input: string, setCharacterData: (characterData: CharacterResponse | ErrorResponse) => void): Promise<void> => {
  const result = await fetch(`${BASE_URL}/${input}`);
  const data = await result.json();
  setCharacterData(data);
  return Promise.resolve();
};

// example: ek a
const fetchSimilarCharactersData = async (input: string, page: number, setSimilarCharactersData: (similarCharactersData: SimilarCharactersResponse) => void): Promise<void> => {
  const result = await fetch(`${BASE_URL}?searchText=${input}&page=${page}&pageSize=10`);
  const data = await result.json();
  setSimilarCharactersData(data);
  return Promise.resolve();
};

export { fetchCharacterData, fetchSimilarCharactersData };

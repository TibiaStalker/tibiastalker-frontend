import { ReactNode, useState } from "react";

import initialSearchStatus from "../constants/initialSearchStatus";
import CharacterSearchContext from "../context/characterSearchContext";
import SearchContext from "../types/SearchContext";
import SearchStatus from "../types/SearchStatus";
import SearchForm from "./SearchForm";
import SearchResult from "./SearchResult";
import SimilarCharacters from "./SimilarCharacters";

type CharacterSearchProps = {
  children: ReactNode;
};

const CharacterSearch = ({ children }: CharacterSearchProps) => {
  const [searchStatus, setSearchStatus] =
    useState<SearchStatus>(initialSearchStatus);

  const search: SearchContext["search"] = (characterName: string) => {
    setSearchStatus({
      isSearching: true,
      lastSearch: characterName,
      isFound: false,
    });
  };

  const successfullyFound: SearchContext["successfullyFound"] = () => {
    setSearchStatus(current => ({
      ...current,
      isFound: true,
      isSearching: false,
    }));
  };

  const notFound: SearchContext["notFound"] = () => {
    setSearchStatus(current => ({
      ...current,
      isFound: false,
      isSearching: false,
    }));
  };

  return (
    <CharacterSearchContext.Provider
      value={{
        search,
        successfullyFound,
        notFound,
        searchStatus,
      }}>
      {children}
    </CharacterSearchContext.Provider>
  );
};

CharacterSearch.SearchForm = SearchForm;
CharacterSearch.SearchResult = SearchResult;
CharacterSearch.SimilarNames = SimilarCharacters;

export default CharacterSearch;

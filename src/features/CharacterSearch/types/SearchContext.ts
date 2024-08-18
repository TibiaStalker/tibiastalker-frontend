import SearchStatus from "./SearchStatus";

type SearchContext = {
  search: (characterName: string) => void;
  successfullyFound: () => void;
  notFound: () => void;
  searchStatus: SearchStatus;
};

export default SearchContext;

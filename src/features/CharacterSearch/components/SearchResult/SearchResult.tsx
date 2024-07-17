import { useContext, useEffect, useState } from "react";

import ErrorResult from "../../../../components/RenderError";
import StringArrayResult from "../../../../components/StringArrayResult";
import CharacterSearchContext from "../../context/characterSearchContext";
import CharacterCharacterization from "../CharacterCharacterization";
import ProbablyConnectedCharacters from "../ProbablyConnectedCharacters";
import SimilarCharacters from "../SimilarCharacters";
import fetchCharacterData from "./fetchCharacterData";

export const SearchResult = () => {
  const { successfullyFound, notFound, searchStatus } = useContext(
    CharacterSearchContext,
  );
  const { lastSearch, isSearching } = searchStatus;
  const [status, setStatus] = useState({
    characterInfo: null,
    errorMessage: "",
  });
  const { characterInfo, errorMessage } = status;

  useEffect(() => {
    if (lastSearch) {
      fetchCharacterData(lastSearch)
        .then(characterInfo => {
          setStatus({
            characterInfo,
            errorMessage: "",
          });
          successfullyFound();
        })
        .catch(error => {
          setStatus({
            characterInfo: null,
            errorMessage: error.detail,
          });
          notFound();
        });
    }
  }, [lastSearch]);

  if (isSearching) {
    return <div>searching...</div>;
  }

  if (errorMessage) {
    return (
      <div>
        <ErrorResult message={errorMessage} />
        <SimilarCharacters />
      </div>
    );
  }

  if (characterInfo) {
    const {
      formerNames,
      formerWorlds,
      otherVisibleCharacters,
      possibleInvisibleCharacters,
    } = characterInfo;

    return (
      <div className="d-grid mt-1">
        <CharacterCharacterization character={characterInfo} />

        {formerNames.length > 0 && (
          <StringArrayResult
            headerName="Former Names"
            propertyValue={formerNames}
          />
        )}
        {formerWorlds.length > 0 && (
          <StringArrayResult
            headerName="Former Worlds"
            propertyValue={formerWorlds}
          />
        )}
        {otherVisibleCharacters.length > 0 && (
          <StringArrayResult
            headerName="Other Visible Characters"
            propertyValue={otherVisibleCharacters}
            isCharacterName
          />
        )}

        {possibleInvisibleCharacters.length > 0 && (
          <ProbablyConnectedCharacters
            propertyName="Possible Other Characters"
            propertyValue={possibleInvisibleCharacters}
          />
        )}
      </div>
    );
  }

  return null;
};

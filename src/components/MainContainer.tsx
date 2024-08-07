import { useCallback, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import { SearchedCharacterNameContext } from "../contexts/SearchedCharacterNameContext";
import { SimilarCharactersCurrentPageContext } from "../contexts/SimilarCharactersCurrentPageContext";
import { SearchForm } from "../features/CharacterSearch";
import { CharacterResponse, ErrorResponse, SimilarCharactersResponse } from "../types/CharacterResult";
import StartSearchingCharacter from "../types/StartSearchingCharacter";
import { LOGO_SIZE } from "../utils/constants";
import { fetchCharacterData, fetchSimilarCharactersData } from "../utils/FetchData";
import CharacterResult from "./CharacterResult";
import TibiaLogo2 from "./logos/TibiaLogo2";
import ErrorResult from "./RenderError";
import SimilarCharactersResult from "./SimilarCharactersResult";

function MainContainer() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [characterResponse, setCharacterResponse] = useState<CharacterResponse | ErrorResponse | null>(null);
  const [characterData, setCharacterData] = useState<CharacterResponse | null>(null);
  const [errorData, setErrorData] = useState<ErrorResponse | null>(null);
  const [similarCharacters, setSimilarCharacters] = useState<SimilarCharactersResponse | null>(null);
  const [searchedCharacterName, setSearchedCharacterName] = useState<string>("");

  const showLoader = () => setLoading(true);
  const hideLoader = () => setLoading(false);

  const startSearchingCharacter: StartSearchingCharacter = useCallback((characterName: string) => {
    showLoader();
    setSearchedCharacterName(characterName);
    fetchCharacterData(characterName, setCharacterResponse).then(() => hideLoader());
    setSimilarCharacters(null);
  }, []);

  useEffect(() => {
    setErrorData(null);
    setCharacterData(null);

    if (characterResponse === null) {
      return;
    }

    if ("detail" in characterResponse) {
      setErrorData(characterResponse);
    } else if ("name" in characterResponse) {
      setCharacterData(characterResponse);
    }
  }, [characterResponse]);

  useEffect(() => {
    if (errorData?.status === 404) {
      showLoader();
      fetchSimilarCharactersData(searchedCharacterName, currentPage, setSimilarCharacters).then(() => hideLoader());
    }
  }, [currentPage]);

  useEffect(() => {
    if (errorData?.status === 404) {
      setCurrentPage(1);
    }
  }, [errorData]);

  const [isLogoClicked, setIsLogoClicked] = useState(false);

  const toggleWidth = () => {
    setIsLogoClicked(true);
  };

  const smallLogoSize = LOGO_SIZE * 0.4;

  return (
    <SearchedCharacterNameContext.Provider value={startSearchingCharacter}>
      <SimilarCharactersCurrentPageContext.Provider value={[currentPage, setCurrentPage]}>
        <Container fluid className="d-flex flex-column align-items-center p-0">
          <div className={`absoluteCenter align-items-center d-flex flex-column ${isLogoClicked ? "fadeOut" : "transform-50"}`} onClick={toggleWidth}>
            <div className="title logo">Tibia Stalker</div>
            <div className="subtitle logo">Click here!</div>
          </div>
          <Row style={{ width: "360px" }} className="align-items-center">
            <Col xs="auto" className="p-0 logo" onClick={toggleWidth}>
              <div className={isLogoClicked ? "targetPosition" : "centerPosition"}>
                <TibiaLogo2 size={smallLogoSize} />
              </div>
            </Col>
            <Col className={isLogoClicked ? "fadeIn" : "fadeOut"}>
              <SearchForm isLoading={loading} value={searchedCharacterName} onSubmit={startSearchingCharacter} />
            </Col>
          </Row>
          <Row>
            <Col xs="auto" style={{ minWidth: "320px", marginLeft: smallLogoSize }}>
              {characterData && <CharacterResult character={characterData} />}
              {errorData && <ErrorResult error={errorData} />}
              {similarCharacters && <SimilarCharactersResult similarCharacters={similarCharacters} />}
            </Col>
          </Row>
        </Container>
      </SimilarCharactersCurrentPageContext.Provider>
    </SearchedCharacterNameContext.Provider>
  );
}

export default MainContainer;

import { useContext, useEffect, useState } from "react";
import { Alert, Col, Container, Row, Spinner, Table } from "react-bootstrap";

import PaginationResult from "../../../../components/PaginationResult";
import { toPascalCase } from "../../../../utils/stringModificator";
import CharacterSearchContext from "../../context/characterSearchContext";
import fetchSimilarCharactersData from "./fetchSimilarCharactersData";

export const SimilarCharacters = () => {
  const { search, searchStatus } = useContext(CharacterSearchContext);
  const { lastSearch, isSearching, isFound } = searchStatus;

  const [similarCharacters, setSimilarCharacters] = useState(null);
  const [isLoadingSimilarCharacters, setIsLoadingSimilarCharacters] =
    useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!isSearching && !isFound && lastSearch) {
      setIsLoadingSimilarCharacters(true);
      setError(null);

      fetchSimilarCharactersData(lastSearch, currentPage)
        .then(result => {
          setSimilarCharacters(result);
        })
        .catch(error => {
          if ("detail" in error) {
            setError(error.detail);
          } else {
            setError("Coś poszło nie tak.");
          }
        })
        .finally(() => {
          setIsLoadingSimilarCharacters(false);
        });
    }
  }, [lastSearch, isSearching, isFound, currentPage]);

  if (isLoadingSimilarCharacters) {
    return (
      <Container className="d-grid">
        <Row>
          <Col xs="auto" style={{ width: "320px" }}>
            <Alert variant="info">
              Searching for a character with a similar name...{" "}
              <Spinner animation="border" size="sm" />
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="d-grid mt-4">
        <Row>
          <Col xs="auto" style={{ width: "320px" }}>
            <Alert variant="warning">{error}</Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  if (!similarCharacters || !similarCharacters.names.length) {
    return (
      <Container className="d-grid">
        <Row>
          <Col xs="auto" style={{ width: "320px" }}>
            <Alert variant="warning">
              Can&apos;t find any character with a similar name
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  const pageSize = 10;
  const totalPages = Math.ceil(similarCharacters.totalCount / pageSize);

  return (
    <Container>
      <Row>
        <Col
          xs="auto"
          style={{ minWidth: "320px" }}
          className="d-flex flex-column align-items-center">
          <Table striped bordered hover variant="dark" className="text-center">
            <thead>
              <tr>
                <th className="bg-success">
                  <i>SIMILAR CHARACTERS</i>
                </th>
              </tr>
            </thead>
            <tbody>
              {similarCharacters.names.map(name => (
                <tr key={name}>
                  <td className="character-link" onClick={() => search(name)}>
                    {toPascalCase(name)}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <PaginationResult
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default SimilarCharacters;

import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import { CharacterSearch } from "../features/CharacterSearch";
import { LOGO_SIZE } from "../utils/constants";
import TibiaLogo2 from "./logos/TibiaLogo2";

function MainContainer() {
  const [isLogoClicked, setIsLogoClicked] = useState(false);

  const toggleWidth = () => {
    setIsLogoClicked(true);
  };

  const smallLogoSize = LOGO_SIZE * 0.4;

  return (
    <CharacterSearch>
      <Container fluid className="d-flex flex-column align-items-center p-0">
        <div
          className={`absoluteCenter align-items-center d-flex flex-column ${isLogoClicked ? "fadeOut" : "transform-50"}`}
          onClick={toggleWidth}>
          <div className="title logo">Tibia Stalker</div>
          <div className="subtitle logo">Click here!</div>
        </div>
        <Row style={{ width: "360px" }} className="align-items-center">
          <Col xs="auto" className="p-0 logo" onClick={toggleWidth}>
            <div
              className={isLogoClicked ? "targetPosition" : "centerPosition"}>
              <TibiaLogo2 size={smallLogoSize} />
            </div>
          </Col>
          <Col className={isLogoClicked ? "fadeIn" : "fadeOut"}>
            <CharacterSearch.SearchForm />
          </Col>
        </Row>
        <Row>
          <Col
            xs="auto"
            style={{ minWidth: "320px", marginLeft: smallLogoSize }}>
            <CharacterSearch.SearchResult />
          </Col>
        </Row>
      </Container>
    </CharacterSearch>
  );
}

export default MainContainer;

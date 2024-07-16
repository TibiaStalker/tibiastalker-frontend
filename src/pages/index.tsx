import { Row } from "react-bootstrap";

import FooterContainer from "~/components/FooterContainer";
import MainContainer from "~/components/MainContainer";
import { PageContainer } from "~/components/PageContainer";
import { brand } from "~/utils/getLPTheme";

function App() {
  return (
    <PageContainer>
      <Row style={{ flexGrow: 1, alignItems: "center" }}>
        <MainContainer />
      </Row>
      <div style={{ display: "flex", gap: "2px" }}>
        {Object.entries(brand).map(([name, color]) => (
          <div key={color} style={{ width: "30px", height: "30px", backgroundColor: color }}>
            {name}
          </div>
        ))}
      </div>
      <Row>
        <FooterContainer />
      </Row>
    </PageContainer>
  );
}

export default App;

import { ReactNode } from "react";
import { Container, Col, Row } from "react-bootstrap";

type Props = {
  children?: ReactNode;
};

export const PageContainer = (props: Props) => {
  const containerStyle = {
    minHeight: "100vh",
  };

  return (
    <Container fluid style={containerStyle}>
      <Row>
        <Col>{props.children}</Col>
      </Row>
    </Container>
  );
};

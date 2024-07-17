import { Alert, Col, Container, Row } from "react-bootstrap";

type ErrorResponseProps = {
  message?: null | string;
};

function ErrorResult({ message }: ErrorResponseProps) {
  if (!message) {
    return null;
  }

  return (
    <Container className="d-grid mt-4">
      <Row>
        <Col xs="auto" style={{ width: "320px" }}>
          <Alert key="danger" variant="danger">
            {message}
          </Alert>
        </Col>
      </Row>
    </Container>
  );
}

export default ErrorResult;

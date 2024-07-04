import { useEffect, useRef, useState } from "react";
import { Button, Col, Dropdown, Form, Row, Spinner } from "react-bootstrap";

import usePromptList from "../features/CharacterSearch/hooks/usePrompts";

type SearchFormProps = {
  value: string;
  onSubmit: (value: string) => void;
  isLoading?: boolean;
};

const SearchForm = ({ onSubmit, isLoading, value }: SearchFormProps) => {
  const { promptList, getPromptList, clearPromptList } = usePromptList();
  const [inputValue, setInputValue] = useState(value);
  const [isFocusOnInput, setIsFocusOnInput] = useState(false);
  const timeoutRef = useRef(null);

  const updateInputValue = (newValue: string) => {
    setInputValue(newValue);
    getPromptList(newValue);
  };

  const submit = (value?: string) => {
    if (!value) {
      onSubmit(inputValue);
    } else {
      setInputValue(value);
      onSubmit(value);
    }
    setIsFocusOnInput(false);
    clearPromptList();
  };

  const delayedInputBlur = () => {
    timeoutRef.current = setTimeout(() => setIsFocusOnInput(false), 200);
  };

  const abortInputBlurWhenFocusOnPrompt = () => {
    clearTimeout(timeoutRef.current);
  };

  useEffect(
    function syncExternalValueWithInput() {
      if (value !== inputValue) setInputValue(value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value],
  );

  return (
    <Row>
      <Col className="p-1">
        <Form.Control
          type="text"
          autoFocus
          placeholder="Character Name"
          onChange={event => updateInputValue(event.target.value)}
          value={inputValue}
          onFocus={() => setIsFocusOnInput(true)}
          onBlur={delayedInputBlur}
          onKeyDown={event => {
            event.key === "Enter" && submit();
          }}
        />
        <Dropdown.Menu show={isFocusOnInput && promptList.length > 0} onFocus={abortInputBlurWhenFocusOnPrompt}>
          {promptList.map(item => (
            <Dropdown.Item
              key={item}
              onClick={() => {
                submit(item);
              }}>
              {item}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Col>
      <Col xs="auto" className="p-1">
        {isLoading ? (
          <Spinner animation="border" />
        ) : (
          <Button variant="outline-info" onClick={() => submit()}>
            Search
          </Button>
        )}
      </Col>
    </Row>
  );
};

export default SearchForm;

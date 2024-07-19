import { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Dropdown, Form, Row, Spinner } from "react-bootstrap";

import CharacterSearchContext from "../../context/characterSearchContext";
import usePromptList from "../../hooks/usePromptList";

export const SearchForm = () => {
  const { promptList, getPromptList, clearPromptList } = usePromptList();
  const { search, searchStatus } = useContext(CharacterSearchContext);
  const [inputValue, setInputValue] = useState("");
  const [isFocusOnInput, setIsFocusOnInput] = useState(false);
  const timeoutRef = useRef(null);

  const updateInputValue = (newValue: string) => {
    setInputValue(newValue);
    getPromptList(newValue);
  };

  const submit = (value?: string) => {
    if (!value) {
      search(inputValue);
    } else {
      setInputValue(value);
      search(value);
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

  useEffect(() => {
    if (searchStatus.lastSearch && searchStatus.lastSearch !== inputValue) {
      setInputValue(searchStatus.lastSearch);
    }
  }, [searchStatus.lastSearch]);

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
        <Dropdown.Menu
          show={isFocusOnInput && promptList.length > 0}
          onFocus={abortInputBlurWhenFocusOnPrompt}>
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
        {searchStatus.isSearching ? (
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

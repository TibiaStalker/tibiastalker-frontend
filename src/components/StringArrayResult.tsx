import { useContext } from "react";
import { Accordion } from "react-bootstrap";

import CharacterSearchContext from "../features/CharacterSearch/context/characterSearchContext";

type Props = {
  propertyValue: string[];
  isCharacterName?: boolean;
  headerName: string;
};

function StringArrayResult(props: Props) {
  const { search } = useContext(CharacterSearchContext);

  return (
    <Accordion className="mb-1">
      <Accordion.Item eventKey="0" className="p-0">
        <Accordion.Header className="p-0">{props.headerName}</Accordion.Header>
        <Accordion.Body>
          {props.propertyValue.map(item =>
            props.isCharacterName ? (
              <div
                key={item}
                className="character-link"
                onClick={() => {
                  search(item);
                }}>
                {item}
              </div>
            ) : (
              <div key={item}>{item}</div>
            ),
          )}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default StringArrayResult;

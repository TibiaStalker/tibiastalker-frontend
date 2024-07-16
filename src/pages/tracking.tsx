import { KeyboardEventHandler, useState } from "react";

import { TrackingCharacter } from "~/features/Tracking";

const Tracking = () => {
  const [characterList, setCharacterList] = useState<string[]>([]);

  const addCharacter: KeyboardEventHandler<HTMLInputElement> = event => {
    if (event.key === "Enter" && "value" in event.target && typeof event.target.value === "string") {
      const characterName: string = event.target.value;
      setCharacterList(currentList => [...currentList, characterName]);
      event.target.value = "";
    }
  };

  const removeCharacter = (name: string) => () => {
    setCharacterList(currentList => currentList.filter(characterOnList => characterOnList !== name));
  };

  return (
    <div style={{ padding: "8px" }}>
      <section>
        <h2>Manage tracking characters list</h2>
        <div>
          <input placeholder="write name" onKeyDown={addCharacter} />
        </div>
        <h3>current tracking list:</h3>
        <div>
          {characterList.map(character => (
            <span key={character} onClick={removeCharacter(character)}>
              {character} x
            </span>
          ))}
        </div>
      </section>

      <section>
        <h2>List of tracking</h2>

        <ul>
          {characterList.map(character => (
            <li key={character}>
              <TrackingCharacter characterName={character} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Tracking;

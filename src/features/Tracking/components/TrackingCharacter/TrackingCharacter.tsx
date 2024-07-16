import { CSSProperties, useState } from "react";

import { CharacterStatus } from "../../enums";
import { useCharacterTracking } from "../../hook/useCharacterTracking";
import getColorByStatus from "./getColorByStatus";

type TrackingCharacterProps = {
  characterName: string;
};

const statusStyle: CSSProperties = {
  display: "inline-block",
  backgroundColor: getColorByStatus(CharacterStatus.unknown),
  borderRadius: "100%",
  minWidth: "1em",
  minHeight: "1em",
};

export const TrackingCharacter = ({ characterName }: TrackingCharacterProps) => {
  const [isTracking, setIsTracking] = useState(false);
  const { track, untrack, onlineStatus } = useCharacterTracking(characterName);

  const toggleTrack = async () => {
    if (!isTracking) {
      track();
    } else {
      untrack();
    }

    setIsTracking(value => !value);
  };

  return (
    <div>
      <span>{characterName}</span>{" "}
      <button type="button" onClick={toggleTrack}>
        {isTracking ? "untrack" : "track"}
      </button>{" "}
      <span style={{ ...statusStyle, backgroundColor: getColorByStatus(onlineStatus) }}></span>
    </div>
  );
};

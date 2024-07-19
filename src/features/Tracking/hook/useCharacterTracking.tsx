import { useCallback, useMemo, useSyncExternalStore } from "react";

import { CharacterStatus } from "../enums";
import { charactersTrackingStore } from "../store/charactersTrackingStore";

export const useCharacterTracking = (characterName: string) => {
  const characterTrackingMap = useSyncExternalStore(
    charactersTrackingStore.subscribe,
    charactersTrackingStore.getSnapshot,
  );

  const onlineStatus = useMemo(() => {
    const characterTrackingInfo = characterTrackingMap.get(characterName);

    if (
      !characterTrackingInfo ||
      characterTrackingInfo.isOnline === undefined
    ) {
      return CharacterStatus.unknown;
    }

    return characterTrackingInfo.isOnline
      ? CharacterStatus.online
      : CharacterStatus.offline;
  }, [characterTrackingMap, characterName]);

  const track = useCallback(async () => {
    charactersTrackingStore.addCharacterToTracking(characterName);
  }, []);

  const untrack = useCallback(async () => {
    charactersTrackingStore.removeCharacterFromTracking(characterName);
  }, []);

  return { track, untrack, onlineStatus };
};

import * as liveCommunication from "../../../utils/liveCommunication";

let actualCharacterStatusMap = new Map();
let listeners = [];

const emitChange = () => {
  for (const listener of listeners) {
    listener();
  }
};

liveCommunication.connection.on("CharacterTracker", event => {
  const newCharacterStatusMap = new Map(actualCharacterStatusMap);

  newCharacterStatusMap.set(event.name, event);
  actualCharacterStatusMap = newCharacterStatusMap;
  emitChange();
});

export const charactersTrackingStore = {
  addCharacterToTracking: async (characterName: string) => {
    if (actualCharacterStatusMap.has(characterName)) {
      return;
    }

    const newCharacterStatusMap = new Map(actualCharacterStatusMap);
    newCharacterStatusMap.set(characterName, { isOnline: undefined });

    await liveCommunication.start();

    liveCommunication.connection.send("JoinGroup", characterName);

    actualCharacterStatusMap = newCharacterStatusMap;
    emitChange();
  },
  removeCharacterFromTracking: async (characterName: string) => {
    if (!actualCharacterStatusMap.has(characterName)) {
      return;
    }

    await liveCommunication.connection.send("LeaveGroup", characterName);
    const newCharacterStatusMap = new Map(actualCharacterStatusMap);
    newCharacterStatusMap.delete(characterName);

    actualCharacterStatusMap = newCharacterStatusMap;
    emitChange();
  },
  subscribe: listener => {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  },
  getSnapshot: () => {
    return actualCharacterStatusMap;
  },
};

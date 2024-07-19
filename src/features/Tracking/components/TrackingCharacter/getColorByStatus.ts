import { CharacterStatus } from "../../enums";

const getColorByStatus = (status: CharacterStatus) => {
  switch (status) {
    case CharacterStatus.offline:
      return "red";
    case CharacterStatus.online:
      return "green";
    case CharacterStatus.unknown:
      return "#ffa726";
  }
};

export default getColorByStatus;

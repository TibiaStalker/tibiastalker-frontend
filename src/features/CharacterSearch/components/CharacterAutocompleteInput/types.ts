import { ReactNode } from "react";

export type CharacterAutocompleteInputProps = {
  name: string;
  acceptEnteredValue?: boolean;
  onSelected?: (characterName: string | null) => void;
  value?: string;
  children?: ReactNode;
  placeholder?: string;
  ariaLabel?: string;
};

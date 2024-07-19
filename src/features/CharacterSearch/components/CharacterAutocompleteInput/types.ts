import { ReactNode } from "react";

export type CharacterAutocompleteInputProps = {
  children?: ReactNode;
  placeholder?: string;
  ariaLabel?: string;
  onSubmit?: (characterName: string) => void;
  clearAfterSubmit?: boolean;
};

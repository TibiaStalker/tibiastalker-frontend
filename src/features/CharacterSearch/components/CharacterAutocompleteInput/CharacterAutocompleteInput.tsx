import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useState } from "react";

import usePromptList from "../../hooks/usePromptList";
import { CharacterAutocompleteInputProps } from "./types";

export const CharacterAutocompleteInput = ({
  placeholder,
  ariaLabel,
  name,
  onSelected,
  value,
  acceptEnteredValue = false,
}: CharacterAutocompleteInputProps) => {
  const { promptList, getPromptList } = usePromptList();
  const [isOpen, setIsOpen] = useState(false);
  const [isFocusOnInput, setIsFocusOnInput] = useState(false);

  const getPrompts = (event: never, characterName: string) => {
    isFocusOnInput && getPromptList(characterName);
  };

  return (
    <Autocomplete
      freeSolo={acceptEnteredValue}
      options={promptList}
      filterOptions={v => v}
      onInputChange={getPrompts}
      onFocus={() => setIsFocusOnInput(true)}
      onBlur={() => setIsFocusOnInput(false)}
      open={isOpen && promptList.length > 0}
      onOpen={() => {
        setIsOpen(true);
      }}
      onClose={() => {
        setIsOpen(false);
      }}
      value={value}
      onChange={(event: never, value: string | null) =>
        onSelected && onSelected(value)
      }
      renderInput={params => (
        <TextField
          {...params}
          hiddenLabel
          name={name}
          size="small"
          variant="outlined"
          aria-label={ariaLabel}
          placeholder={placeholder}
        />
      )}
    />
  );
};

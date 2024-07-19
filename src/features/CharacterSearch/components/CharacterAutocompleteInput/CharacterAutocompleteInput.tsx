import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { ChangeEvent, useState } from "react";

import usePromptList from "../../hooks/usePromptList";
import { CharacterAutocompleteInputProps } from "./types";

export const CharacterAutocompleteInput = ({
  children,
  placeholder,
  ariaLabel,
  onSubmit,
  clearAfterSubmit = false,
}: CharacterAutocompleteInputProps) => {
  const { promptList, getPromptList, clearPromptList } = usePromptList();
  const [localValue, setLocalValue] = useState("");

  const updateInputValue = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const characterName = event.target.value;

    setLocalValue(characterName);
    getPromptList(characterName);
  };

  const selectedFromPrompt = (_: never, newValue: string) => {
    if (clearAfterSubmit) {
      setLocalValue("");
    } else {
      setLocalValue(newValue);
    }

    if (onSubmit) {
      onSubmit(newValue);
    }

    clearPromptList();
  };

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      alignSelf="center"
      spacing={1}
      useFlexGap
      sx={{ pt: 2, width: { xs: "100%", sm: "auto" } }}
    >
      <Autocomplete
        freeSolo
        options={promptList}
        filterOptions={v => v}
        value={localValue}
        onChange={selectedFromPrompt}
        renderInput={params => (
          <TextField
            {...params}
            hiddenLabel
            size="small"
            variant="outlined"
            aria-label={ariaLabel}
            placeholder={placeholder}
            onChange={updateInputValue}
          />
        )}
      />
      {children}
    </Stack>
  );
};

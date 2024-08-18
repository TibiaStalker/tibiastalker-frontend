import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { forwardRef, useContext, useEffect, useState } from "react";

import CharacterSearchContext from "../../context/characterSearchContext";
import CharacterAutocompleteInput from "../CharacterAutocompleteInput";

const SEARCH_INPUT_NAME = "characterName";

export const SearchForm = forwardRef<HTMLFormElement>((prop: never, ref) => {
  const { search, searchStatus } = useContext(CharacterSearchContext);
  const { lastSearch } = searchStatus;

  const [autocompleteValue, setAutoCompleteValue] = useState("");

  useEffect(() => {
    if (lastSearch !== autocompleteValue) {
      setAutoCompleteValue(lastSearch);
    }
  }, [lastSearch]);

  const submit = (characterName: string | null) => {
    if (characterName) {
      search(characterName);
    }
  };

  return (
    <Stack
      ref={ref}
      direction={{ xs: "column", sm: "row" }}
      spacing={1}
      useFlexGap
      sx={{
        pt: 2,
        width: { xs: "100%", sm: "auto" },
        "scroll-margin-top": "72px",
      }}
      component="form"
      onSubmit={event => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const characterName = formData.get(SEARCH_INPUT_NAME);

        if (typeof characterName === "string" && characterName) {
          submit(characterName);
        }
      }}
    >
      <CharacterAutocompleteInput
        name={SEARCH_INPUT_NAME}
        ariaLabel="Enter your enemy name"
        placeholder="Your enemy name"
        onSelected={submit}
        value={autocompleteValue}
        acceptEnteredValue
        // TODO:
        // onChange={value => setAutoCompleteValue(value)}
      />
      <Button type="submit" variant="contained" color="primary">
        Start search
      </Button>
    </Stack>
  );
});

SearchForm.displayName = "SearchForm";

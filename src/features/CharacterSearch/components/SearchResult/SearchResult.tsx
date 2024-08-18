import SearchIcon from "@mui/icons-material/Search";
import { alpha, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { useContext, useEffect, useState } from "react";

// import ErrorResult from "../../../../components/RenderError";
import CharacterSearchContext from "../../context/characterSearchContext";
// import SimilarCharacters from "../SimilarCharacters";
import fetchCharacterData from "./fetchCharacterData";
import CharacterCard from "./subcomponents/CharacterCard";
import CharacterCharacterization from "./subcomponents/CharacterCharacterization";
import FormerNames from "./subcomponents/FormerNames";

export const SearchResult = () => {
  const { successfullyFound, notFound, searchStatus, search } = useContext(
    CharacterSearchContext,
  );
  const { lastSearch, isSearching } = searchStatus;
  const [status, setStatus] = useState({
    characterInfo: null,
    errorMessage: "",
  });
  const { characterInfo, errorMessage } = status;

  useEffect(() => {
    if (lastSearch) {
      fetchCharacterData(lastSearch)
        .then(characterInfo => {
          setStatus({
            characterInfo,
            errorMessage: "",
          });
          successfullyFound();
        })
        .catch(error => {
          setStatus({
            characterInfo: null,
            errorMessage: error.detail,
          });
          notFound();
        });
    }
  }, [lastSearch]);

  if (isSearching) {
    return <div>searching...</div>;
  }

  // if (errorMessage) {
  //   return (
  //     <div>
  //       <ErrorResult message={errorMessage} />
  //       <SimilarCharacters />
  //     </div>
  //   );
  // }

  if (characterInfo) {
    const {
      formerNames,
      formerWorlds,
      otherVisibleCharacters,
      possibleInvisibleCharacters,
    } = characterInfo;

    return (
      <Paper
        sx={theme => ({
          mt: 4,
          p: 3,
          borderRadius: "10px",
          outline: "1px solid",
          outlineColor:
            theme.palette.mode === "light"
              ? alpha("#BFCCD9", 0.5)
              : alpha("#9CCCFC", 0.1),
          boxShadow:
            theme.palette.mode === "light"
              ? `0 0 12px 8px ${alpha("#9CCCFC", 0.2)}`
              : `0 0 24px 12px ${alpha("#033363", 0.2)}`,
          maxWidth: "100%",
        })}
      >
        <Typography variant="h4" component="h2">
          character{" "}
          <Typography
            component="span"
            variant="h4"
            sx={{
              color: theme =>
                theme.palette.mode === "light"
                  ? "primary.main"
                  : "primary.light",
            }}
          >
            {characterInfo.name}
          </Typography>
          {characterInfo.traded ? "(traded)" : ""} information:
        </Typography>

        <FormerNames names={formerNames} />

        <CharacterCharacterization
          character={characterInfo}
          formerWorlds={formerWorlds}
        />

        {otherVisibleCharacters.length > 0 && (
          <>
            <Typography variant="h5" component="h3" sx={{ mt: 3 }} gutterBottom>
              other visible characters
            </Typography>

            <Stack direction="row" flexWrap="wrap" useFlexGap spacing={2}>
              {otherVisibleCharacters.map(characterName => (
                <Chip
                  key={characterName}
                  label={characterName}
                  sx={{ px: 1 }}
                  onClick={() => {
                    search(characterName);
                  }}
                  icon={<SearchIcon fontSize="small" />}
                />
              ))}
            </Stack>
          </>
        )}

        {possibleInvisibleCharacters.length > 0 && (
          <>
            <Typography variant="h5" component="h3" sx={{ mt: 3 }} gutterBottom>
              possible other characters
            </Typography>

            <Grid
              container
              spacing={3}
              alignItems="stretch"
              justifyContent="center"
            >
              {possibleInvisibleCharacters.map(otherCharacter => (
                <Grid
                  key={otherCharacter.otherCharacterName}
                  item
                  xs={12}
                  sm={7}
                  md={6}
                  lg={4}
                >
                  <CharacterCard
                    character={otherCharacter}
                    onClick={() => search(otherCharacter.otherCharacterName)}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Paper>
    );
  }

  return null;
};

import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Head from "next/head";
import { useState } from "react";

import { CharacterAutocompleteInput } from "~/features/CharacterSearch";
import { TrackingCharacter } from "~/features/Tracking";

const CHARACTER_FIELD_NAME = "characterName";

const Tracking = () => {
  const [characterList, setCharacterList] = useState<string[]>([]);

  const addCharacter = event => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const characterName = formData.get(CHARACTER_FIELD_NAME);

    if (typeof characterName === "string" && characterName) {
      setCharacterList(currentList => [...currentList, characterName]);
    }
  };

  const removeCharacter = (name: string) => () => {
    setCharacterList(currentList =>
      currentList.filter(characterOnList => characterOnList !== name),
    );
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Head>
        <title>Live Tracking</title>
      </Head>

      <Typography
        component="h1"
        variant="h2"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignSelf: "center",
          textAlign: "center",
          fontSize: "clamp(3.5rem, 10vw, 4rem)",
        }}
      >
        live&nbsp;
        <Typography
          component="span"
          variant="h2"
          sx={{
            fontSize: "clamp(3rem, 10vw, 4rem)",
            color: theme =>
              theme.palette.mode === "light" ? "primary.main" : "primary.light",
          }}
        >
          tracking
        </Typography>
        &nbsp;your enemy
      </Typography>

      <Paper
        component="section"
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
        })}
      >
        <Typography component="h2" variant="h5">
          Manage tracking characters list
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          useFlexGap
          sx={{ pt: 2, width: { xs: "100%", sm: "auto" } }}
          component="form"
          onSubmit={addCharacter}
        >
          <CharacterAutocompleteInput
            name={CHARACTER_FIELD_NAME}
            placeholder="enter character to stalking"
          />
          <Button type="submit" variant="contained" color="primary">
            Add
          </Button>
        </Stack>

        <h3>current tracking list:</h3>
        <div>
          {characterList.map(character => (
            <Stack
              spacing={1}
              key={character}
              direction="row"
              alignItems="center"
            >
              <TrackingCharacter characterName={character} />
              <IconButton
                color="inherit"
                onClick={removeCharacter(character)}
                aria-label={`remove ${character}`}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          ))}
        </div>
      </Paper>
    </Container>
  );
};

export default Tracking;

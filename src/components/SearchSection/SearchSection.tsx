import { Container, Stack, Typography } from "@mui/material";
import { useRef } from "react";

import { CharacterSearch } from "~/features/CharacterSearch";

export const SearchSection = () => {
  const searchFormRef = useRef<HTMLFormElement | null>(null);

  return (
    <CharacterSearch
      onSearch={() => {
        const rect = searchFormRef.current.getBoundingClientRect();

        const isInView = rect.top >= 0;

        if (!isInView) {
          searchFormRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          alignItems="center"
          sx={{ width: { xs: "100%", sm: "70%" } }}
        >
          <Typography
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignSelf: "center",
              textAlign: "center",
              fontSize: "clamp(3.5rem, 10vw, 4rem)",
            }}
          >
            start&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                fontSize: "clamp(3rem, 10vw, 4rem)",
                color: theme =>
                  theme.palette.mode === "light"
                    ? "primary.main"
                    : "primary.light",
              }}
            >
              stalking
            </Typography>
          </Typography>
          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ alignSelf: "center", width: { sm: "100%", md: "80%" } }}
          >
            Explore our cutting-edge dashboard, delivering high-quality
            solutions tailored to your needs. Elevate your experience with
            top-tier features and services.
          </Typography>

          <CharacterSearch.SearchForm ref={searchFormRef} />

          <CharacterSearch.SearchResult />
        </Stack>
      </Container>
    </CharacterSearch>
  );
};

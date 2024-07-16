import styled from "@emotion/styled";

export const Wrapper = styled("div")(({ theme }) => ({
  paddingTop: "6rem",

  [theme.breakpoints.up("sm")]: {
    paddingTop: "7rem",
  },
}));

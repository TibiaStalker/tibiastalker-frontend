import styled from "@emotion/styled";

export const Wrapper = styled("div")(({ theme }) => ({
  paddingTop: "6rem",
  // TODO: better fix this
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  [theme.breakpoints.up("sm")]: {
    paddingTop: "7rem",
  },
}));

import Button from "@mui/material/Button";

import { StandardLink } from "./StandardLink";

export const mainLinks = [
  <StandardLink href="/" key="Features">
    Features
  </StandardLink>,
  <StandardLink href="/" key="Testimonials">
    Testimonials
  </StandardLink>,
  <StandardLink href="/" key="Highlights">
    Highlights
  </StandardLink>,
  <StandardLink href="/" key="Pricing">
    Pricing
  </StandardLink>,
  <StandardLink href="/" key="FAQ">
    FAQ
  </StandardLink>,
];

export const accountLinks = [
  <Button
    color="primary"
    variant="text"
    size="small"
    component="a"
    href="/"
    key="sign-in"
  >
    Sign in
  </Button>,
  <Button
    color="primary"
    variant="contained"
    size="small"
    component="a"
    href="/"
    key="sign-up"
  >
    Sign up
  </Button>,
];

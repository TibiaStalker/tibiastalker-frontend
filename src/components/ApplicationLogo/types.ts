import { sizing } from "./constants";

export type ApplicationLogoProps = {
  size?: keyof typeof sizing;
  inline?: boolean;
};

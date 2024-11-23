import { paths } from "./paths";
import { queryClient } from "./query-client";

enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

export const configuration = {
  defaultTheme: Theme.LIGHT,
  paths,
  queryClient,
};

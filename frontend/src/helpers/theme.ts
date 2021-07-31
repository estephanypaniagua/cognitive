import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

import { defaultTheme } from "react-admin";

export const theme = createMuiTheme({
  ...defaultTheme,
  palette: {
    ...defaultTheme.palette,
    primary: {
      // ...defaultTheme.palette.primary,
      main: "#345995",
    },
    secondary: {
      ...defaultTheme.palette.secondary,
      main: "#54428E", // Not far from orange
    },
  },
  // overrides: {
  //   MuiCssBaseline: {
  //     "@global": {
  //       body: {
  //         backgroundImage:
  //           "url(https://designshack.net/wp-content/uploads/gradient-background.jpg)",
  //       },
  //     },
  //   },
  // },
});

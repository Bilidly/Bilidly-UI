import { createTheme } from "@material-ui/core/styles";
import coreTheme from "./coreTheme";

// Create a theme instance.
const theme = createTheme({
  ...coreTheme,
  palette: {
    ...coreTheme.palette,
    background: {
      default: "#291a13",
      paper: "rgb(56, 36, 25)"
    },
    primary: {
      main: "#ffb405"
    },
    text: {
      primary: "rgba(255, 255, 255, 0.87)",
      secondary: "#ada597",
    },
    type: "dark"
  },
  overrides: {
    ...coreTheme.overrides,
    MuiSnackbarContent: {
      root: {
        color: "#fff",
        backgroundColor: "#3c2d2a",
        padding: "0px",
        minWidth: "auto",
        "@media (min-width: 960px)": {
          minWidth: "400px"
        }
      },
      message: {
        padding: "0px"
      },
      action: {
        marginRight: "0px"
      }
    },
    MuiTooltip: {
      tooltip: {
        background: "#FFF !important",
        border: "1px solid #fff",
        borderRadius: "8px",
        color: "#000",
        fontSize: "13px"
      }
    }
  }
});

export default theme;

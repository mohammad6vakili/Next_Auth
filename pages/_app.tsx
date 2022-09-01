// react import
import { useEffect } from "react";

// next import
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

// styles import
import "../styles/globals.css";

// Mui import
import { createTheme, ThemeProvider } from "@mui/material/styles";

// utils import
import { Colors } from "../utils/Colors";

// redux imports
import { store } from "../Store";
import { Provider } from "react-redux";

const theme = createTheme({
  palette: {
    primary: {
      light: Colors.Primary,
      main: Colors.Primary,
      dark: Colors.Primary,
      contrastText: "white",
    },
    secondary: {
      light: Colors.Secondary,
      main: Colors.Secondary,
      dark: Colors.Secondary,
      contrastText: "white",
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    router.push("/auth");
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;

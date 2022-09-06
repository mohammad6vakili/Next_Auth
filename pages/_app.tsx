// react import
import { useEffect } from "react";
import styled from "styled-components";

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
import { store } from "../App/Store";
import { Provider } from "react-redux";

// custom Mui theme
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

// custom components
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.BgPrimary};
`;

function MyApp({ Component, pageProps }: AppProps) {
  // hooks ---------------------------------------
  const router = useRouter();

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Container>
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;

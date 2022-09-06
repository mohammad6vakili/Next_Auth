// Third party libraries import
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// next import
import type { AppProps } from "next/app";

// styles import
import "../styles/globals.css";

// Mui import
import { createTheme, ThemeProvider } from "@mui/material/styles";

// utils import
import { Colors } from "../utils/Colors";

// redux imports
import { store } from "../App/Store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persistor = persistStore(store);

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

// component imports
import { Container } from "../Components/Container/Index";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <PersistGate persistor={persistor}>
          <ToastContainer
            position="bottom-left"
            autoClose={5000}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Container>
            <Component {...pageProps} />
          </Container>
        </PersistGate>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;

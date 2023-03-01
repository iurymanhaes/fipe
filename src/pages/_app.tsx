import { ValuesProvider } from "@/contexts/valuesProvider";
import { GlobalStyle } from "@/styles";
import { ThemeProvider } from "@mui/material";
import { AppProps } from "next/app";
import theme from "../styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ValuesProvider>
        <Component {...pageProps} />
      </ValuesProvider>
    </ThemeProvider>
  );
}

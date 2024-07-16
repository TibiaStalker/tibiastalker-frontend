import { PaletteMode } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useState } from "react";

import ApplicationBar from "~/components/ApplicationBar";
import Footer from "~/components/Footer";
import getLPTheme from "~/utils/getLPTheme";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState<PaletteMode>("dark");
  const LPtheme = createTheme(getLPTheme(mode, { fontFamily: inter.style.fontFamily }));

  const toggleColorMode = () => {
    setMode(prev => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <AppCacheProvider {...pageProps}>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="The application allows finding all the characters of the player in the game Tibia" />
        <link rel="manifest" href="manifest.json" />

        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icons/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#212529" />
        <title>Tibia Stalker</title>
      </Head>
      <ThemeProvider theme={LPtheme}>
        <CssBaseline />
        <ApplicationBar mode={mode} toggleColorMode={toggleColorMode}>
          <Component {...pageProps} />
        </ApplicationBar>
        <Footer />
      </ThemeProvider>
    </AppCacheProvider>
  );
}

import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
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
      <Component {...pageProps} />
    </>
  );
}

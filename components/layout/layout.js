import Head from "next/head";
import classes from "./layout.module.css";
import Header from "../header";
import Navigation from "../navigation";
import SnackbarController from "../snackbar";

export default function Layout({
  children,
  configure,
  backClicked,
  changeTheme,
  title
}) {
  return (
    <div className={classes.container}>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <link
          rel="preload"
          href="/fonts/Inter/Inter-Regular.ttf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/Inter/Inter-Bold.ttf"
          as="font"
          crossOrigin=""
        />
        <meta name="description" content="Bilidly is a low cost decentralized exchange for all types of pairs on BNB chain." />
        <meta name="og:title" content="Bilidly" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div className={classes.content}>
        {!configure && (
          <Header backClicked={backClicked} changeTheme={changeTheme} title={ title } />
        )}
        <SnackbarController />
        <main>{children}</main>
      </div>
    </div>
  );
}

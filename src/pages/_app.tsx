// src/pages/_app.tsx
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import { NextPageWithLayout } from "next";
import MainLayout from "layout";
import { ButtplugProvider } from "components/ButtplugContext";
import { ThemeProvider } from "next-themes";
import ScrollHandler from "components/ScrollHandler";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const getLayout = (Component as typeof Component & NextPageWithLayout).getLayout ?? ((page) => <MainLayout>{page}</MainLayout>)
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class">
        <ButtplugProvider>
          <ScrollHandler />
          {getLayout(<Component {...pageProps} />)}
        </ButtplugProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import "@mantine/core/styles.css";
import ApolloWrapper from "../apolo/apoloWrapper";
import { CreateServerModal } from "../components/modals/CreateServerModal";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Messanger",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link data-rh="true" rel="icon" href="/logo.png" />
        <ColorSchemeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ApolloWrapper>
          <MantineProvider>
            <ClerkProvider
              publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
            >
              <CreateServerModal />
              {children}
            </ClerkProvider>
          </MantineProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}

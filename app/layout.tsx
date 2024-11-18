import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import "./globals.css";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/app/api/auth/[...nextauth]";
import { SessionProvider } from "next-auth/react";
import { AppProvider } from "@/components/app-provider";
import LoginPopup from "@/components/loginPopup";
import constants from "@/lib/constants";
import Script from "next/script";
import { getWebsiteData } from "@/lib/common";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
  description: constants.landingPage.subtitle,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const websiteDate = await getWebsiteData();
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col justify-between",
          fontSans.variable
        )}
      >
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.GOOGLE_ANALYTICS}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <AppProvider>
          <SessionProvider session={session}>
            <Toaster />
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Header />
              <div className="py-6">{children}</div>
              <LoginPopup />
              <Footer data={websiteDate} />
            </ThemeProvider>
          </SessionProvider>
        </AppProvider>
      </body>
    </html>
  );
}

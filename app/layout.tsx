import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.scss";
import Header from "./_components/molecules/header";
import SetScreenMinHeight from "./_components/atoms/setScreenMinHeight";
import Provider from "./_trpc/Provider";

const spaceGrotestFont = Space_Grotesk({
  subsets: ["latin"],
  weight: "variable",
  fallback: ["sans-serif"],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://localexpertai.com"),
  title: "Local Expert AI",
  description: "Your local guide right in your hands. Explore nearby attractions as if you had a local guide by your side.",
  openGraph: {
    siteName: "Local Expert AI",
  },
};

const appWrapperId = "app-wrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={spaceGrotestFont.className}>
        <Provider>
          <div id={appWrapperId} className="bg-ds-green-100 min-h-screen grid grid-rows-[auto,1fr]">
            <Header />
            <div className="w-100%">
              {children}
            </div>
            <SpeedInsights />
            <SetScreenMinHeight id={appWrapperId} />
          </div>

        </Provider>
      </body>
    </html>
  );
}

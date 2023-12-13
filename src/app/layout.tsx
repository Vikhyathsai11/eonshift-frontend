import "~/styles/globals.css";

import { type ReactElement } from "react";
import { Inter } from "next/font/google";

import { ReactFireProvider, ThemeProvider } from "~/providers";
import TailwindIndicator from "~/shared/custom/tailwind-indicator";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "EonShift",
  description: "Shifting energy for a better tomorrow.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: ReactElement }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`bg-background font-sans ${inter.variable}`}>
        <ThemeProvider
          attribute={"class"}
          defaultTheme={"dark"}
          disableTransitionOnChange
        >
          <ReactFireProvider>{children}</ReactFireProvider>
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}

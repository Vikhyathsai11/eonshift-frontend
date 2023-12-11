import "~/styles/globals.css";

import { type ReactElement } from "react";
import { Inter } from "next/font/google";

import { ReactFireProvider } from "~/app/providers";
import { ThemeProvider } from "~/app/providers/ThemeProvider";

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
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <ThemeProvider
          attribute={"class"}
          defaultTheme={"dark"}
          disableTransitionOnChange
        >
          <ReactFireProvider>{children}</ReactFireProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

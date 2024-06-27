import type { Metadata } from "next";
import { Bellefair, Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import "./typography.module.css";
import NavigationBar from "./_components/NavigationBar";

const bellefair = Bellefair({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bellefair",
  display: "swap",
});

const barlow = Barlow({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Space tourism website",
  description: "Practice project - space tourism website solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${barlowCondensed.variable} ${barlow.variable} ${bellefair.variable}`}>
        <NavigationBar />
        {children}
      </body>
    </html>
  );
}

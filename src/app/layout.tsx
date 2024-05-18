import type { Metadata } from "next";
import {  Poppins } from "next/font/google";
import "./globals.css";

const font = Poppins({
  subsets: ["latin"],
  weight: "500"
});

export const metadata: Metadata = {
  title: "Movie Marathon",
  description: "next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/favicon.ico" className="rounded-sm"/>
      </head>
      <body className={font.className}>{children}</body>
    </html>
  );
}

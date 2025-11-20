import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LinkedIn Profile Roaster - Get Your Career Humbled",
  description: "Paste your LinkedIn profile and get brutally honest, witty feedback from an AI recruiter who's seen it all.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

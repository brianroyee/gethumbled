import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LinkedIn Profile Roaster - Get Your Career Humbled",
  description: "Paste your LinkedIn profile or upload a screenshot of the about section and get brutally honest, witty feedback from an AI recruiter who's seen it all.",
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
        
        {/* Ad Script */}
        <script 
          async 
          data-cfasync="false" 
          src="//pl28099870.effectivegatecpm.com/4f6b2bd98afadfd3f05a20777c2cbc24/invoke.js"
        />
      </body>
    </html>
  );
}

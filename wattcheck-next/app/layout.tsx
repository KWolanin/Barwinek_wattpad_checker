import type { Metadata } from "next";
import "./globals.css";
// import "@/i18n";
import TitleUpdater from "@/components/ui/TitleUpdater";


export const metadata: Metadata = {
  title: "Check your Wattpad Statistics via Barwinek",
  description: "Web scrapping app to checking Wattpad story statistics!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <TitleUpdater />

        {children}
      </body>
    </html>
  );
}

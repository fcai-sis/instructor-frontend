import Locale from "intl-locale-textinfo-polyfill";
import { Rubik } from "next/font/google";
import "../globals.css";
import { Toaster } from "react-hot-toast";
import { Metadata } from "next";

const rubik = Rubik({ subsets: ["latin", "arabic"] });

export const metadata: Metadata = {
  title: "lol",
};

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { direction: dir } = new Locale(locale).textInfo;

  return (
    <html lang={locale} dir={dir}>
      <body className={`${rubik.className}`}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}

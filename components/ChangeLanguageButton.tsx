"use client";

import { Language } from "iconoir-react";
import { useChangeLocale, useCurrentLocale } from "../locales/client";

export default function ChangeLanguageButton() {
  const changeLocale = useChangeLocale();
  const locale = useCurrentLocale();

  const to = locale === "ar" ? "en" : "ar";

  return (
    <>
      <button
        onClick={() => changeLocale(to)}
        className={`rounded-lg cursor-pointer bg-white hover:bg-slate-100 transition-colors duration-300 p-2 flex gap-2 items-center justify-center`}
      >
        <Language />
      </button>
    </>
  );
}

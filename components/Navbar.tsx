import SignOutButton from "@/components/SignOutButton";
import { I18nProviderClient } from "@/locales/client";
import { getI18n } from "@/locales/server";
import Link from "next/link";
import Dropdown from "./Dropdown";
import ChangeLanguageButton from "./ChangeLanguageButton";
import { BookStack, Home, Megaphone, PageFlip } from "iconoir-react";
import Image from "next/image";

export default async function Navbar({ locale }: { locale: string }) {
  const t = await getI18n();

  return (
    <nav className="z-40 fixed top-0 left-0 right-0 bg-white flex justify-between items-center py-4 px-24 shadow-md gap-4">
      <Image src={"/fcai.png"} alt="Logo" width={70} height={70} />
      <div className="flex gap-2">
        <Link href="/" className="flex gap-2 items-center">
          <Home />
          {t("home.title")}
        </Link>
        <Link href="/courses/enrolled" className="flex gap-2 items-center">
          <BookStack />
          {t("myCourses.title")}
        </Link>
        <Link href="/announcements" className="flex gap-2 items-center">
          <Megaphone />
          {t("announcements.title")}
        </Link>
        <Link href="/requests" className="flex gap-2 items-center">
          <PageFlip />
          {t("serviceRequests.title")}
        </Link>
        <I18nProviderClient locale={locale}>
          <Dropdown label={t("nav.more")}>
            <Link href="/instructors" className="block w-full">
              {t("nav.instructors")}
            </Link>
            <Link href="/ta" className="block w-full">
              {t("nav.teacherAssistants")}
            </Link>
            <Link href="/profile" className="block w-full">
              {t("profile.title")}
            </Link>
            <SignOutButton />
          </Dropdown>
        </I18nProviderClient>
      </div>
      <I18nProviderClient locale={locale}>
        <ChangeLanguageButton />
      </I18nProviderClient>
    </nav>
  );
}

import AuthForm from "./AuthForm";
import { getI18n } from "@/locales/server";
import { I18nProviderClient } from "@/locales/client";

export default async function Page({
  params: { locale },
}: Readonly<{ params: { locale: string } }>) {
  const t = await getI18n();
  return (
    <div>
      <h1>{t("auth.title")}</h1>
      <I18nProviderClient locale={locale}>
        <AuthForm />
      </I18nProviderClient>
    </div>
  );
}

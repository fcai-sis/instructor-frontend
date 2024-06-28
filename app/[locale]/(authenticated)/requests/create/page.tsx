// const url = "https://ckes.cu.edu.eg/facultypayment.aspx";

import { I18nProviderClient } from "@/locales/client";
import CreateServiceRequestForm from "../CreateServiceRequestForm";
import { getI18n } from "@/locales/server";

export default async function Page({
  params: { locale },
}: Readonly<{
  params: { locale: string };
}>) {
  const t = await getI18n();
  return (
    <>
      <h1>{t("serviceRequests.createServiceRequest")}</h1>
      <I18nProviderClient locale={locale}>
        <CreateServiceRequestForm />
      </I18nProviderClient>
    </>
  );
}

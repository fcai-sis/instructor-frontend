import { I18nProviderClient } from "@/locales/client";
import ProfileDisplay from "./ProfileDisplay";
import { getProfileAction } from "./actions";
import { getCurrentLocale } from "@/locales/server";

export default async function Page() {
  const profileData = await getProfileAction();
  const editableFields = profileData.data?.editableFields;
  const viewableFields = profileData.data?.viewableFields;
  const locale = getCurrentLocale();

  return (
    <>
      <I18nProviderClient locale={locale}>
        <ProfileDisplay
          editableFields={editableFields}
          viewableFields={viewableFields}
        />
      </I18nProviderClient>
    </>
  );
}

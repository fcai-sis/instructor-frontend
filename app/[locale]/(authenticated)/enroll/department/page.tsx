import { I18nProviderClient } from "@/locales/client";
import DepartmentPreferenceForm from "./DepartmentPreferenceForm";
import { getAccessToken } from "@/lib";
import { departmentsAPI } from "@/api";
import { revalidatePath } from "next/cache";
import { DepartmentType } from "@fcai-sis/shared-models";

export const getDepartments = async () => {
  const accessToken = await getAccessToken();
  const response = await departmentsAPI.get(`/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 200) throw new Error("Failed to fetch departments");

  revalidatePath("/department");

  return response.data;
};

export default async function Page() {
  const response = await getDepartments();
  const departments = response.departments;

  return (
    <>
      <I18nProviderClient locale='en'>
        <DepartmentPreferenceForm
          departments={departments as DepartmentType[]}
        />
      </I18nProviderClient>
    </>
  );
}

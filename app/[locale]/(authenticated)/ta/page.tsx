import { departmentsAPI, instructorTaAPI } from "@/api";
import Pagination from "@/components/Pagination";
import { SelectFilter } from "@/components/SetQueryFilter";
import { getAccessToken, getCurrentPage, limit, tt } from "@/lib";
import { getCurrentLocale, getI18n } from "@/locales/server";
import { DepartmentType } from "@fcai-sis/shared-models";
import { revalidatePath } from "next/cache";

export const getTeachingAssistants = async (
  page: number,
  department: DepartmentType
) => {
  const accessToken = await getAccessToken();
  const response = await instructorTaAPI.get(`/teacherAssistants/read`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      skip: page * limit - limit,
      limit,
      department,
    },
  });

  if (response.status !== 200)
    throw new Error("Failed to fetch teaching assistants");

  revalidatePath("/ta");

  return response.data;
};

export const getDepartments = async () => {
  const accessToken = await getAccessToken();
  const response = await departmentsAPI.get(`/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log(response.data);

  if (response.status !== 200) throw new Error("Failed to fetch departments");

  revalidatePath("/department");

  return response.data;
};

export default async function Page({
  searchParams,
}: Readonly<{ searchParams: { page: string; department: string } }>) {
  const page = getCurrentPage(searchParams);
  const t = await getI18n();
  const locale = getCurrentLocale();
  const departmentSelected =
    searchParams.department as unknown as DepartmentType;

  const response = await getTeachingAssistants(page, departmentSelected);
  const teachingAssistants = response.teachingAssistants;
  const total = response.totalTeachingAssistants;

  const { departments } = await getDepartments();

  const departmentOptions = [
    {
      label: "All",
      value: "",
    },
    ...departments.map((department: any) => ({
      label: department.name.en,
      value: department.code,
    })),
  ];

  return (
    <>
      <div>
        <h1 className='text-3xl font-bold mb-6'>
          {t("instructorTa.assistantTitle")}
        </h1>
        <SelectFilter name='department' options={departmentOptions} />
        <div className='space-y-4 mt-4'>
          {teachingAssistants.map((ta: any, i: number) => (
            <div
              className='border border-gray-300 p-4 rounded-lg shadow-md'
              key={i}
            >
              <p className='text-gray-700 mb-2'>
                <b>{t("instructorTa.name")}: </b>
                {ta.fullName}
              </p>
              <p className='text-gray-700 mb-2'>
                <b>{t("instructorTa.email")}: </b>
                {ta.email}
              </p>
              <p className='text-gray-700 mb-2'>
                <b>{t("instructorTa.department")}: </b>
                {tt(locale, ta.department.name)}
              </p>
              {ta.officeHours && (
                <p className='text-gray-700 mb-2'>
                  <b>{t("instructorTa.officeHours")}: </b>
                  {ta.officeHours}
                </p>
              )}
              {ta.office && (
                <p className='text-gray-700 mb-2'>
                  <b>{t("instructorTa.office")}: </b>
                  {ta.office}
                </p>
              )}
            </div>
          ))}
          <Pagination totalPages={total / limit} />
        </div>
      </div>
    </>
  );
}

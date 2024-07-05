import { departmentsAPI, instructorsAPI, instructorTaAPI } from "@/api";
import Pagination from "@/components/Pagination";
import { SelectFilter, TextFilter } from "@/components/SetQueryFilter";
import { getAccessToken, getCurrentPage, limit, tt } from "@/lib";
import { getCurrentLocale, getI18n } from "@/locales/server";
import { DepartmentType } from "@fcai-sis/shared-models";
import { revalidatePath } from "next/cache";

export const getInstructors = async (
  page: number,
  department: DepartmentType,
  search: string
) => {
  const accessToken = await getAccessToken();
  const response = await instructorsAPI.get(`/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      page,
      limit,
      department,
      search,
    },
  });

  if (response.status !== 200) throw new Error("Failed to fetch instructors");

  revalidatePath("/instructors");

  return response.data;
};

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

export default async function Page({
  searchParams,
}: Readonly<{
  searchParams: { page: string; department: string; search: string };
}>) {
  const page = getCurrentPage(searchParams);
  const t = await getI18n();
  const locale = getCurrentLocale();
  const departmentSelected =
    searchParams.department as unknown as DepartmentType;

  const response = await getInstructors(
    page,
    departmentSelected,
    searchParams.search
  );
  const instructors = response.instructors;
  const total = response.totalInstructors;

  const departmentResponse = await getDepartments();
  const departments = departmentResponse.departments;

  const departmentOptions = [
    {
      label: tt(locale, { en: "All Departments", ar: "جميع الأقسام" }),
      value: "",
    },
    ...departments.map((department: any) => ({
      label: tt(locale, department.name),
      value: department.code,
    })),
  ];

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold mb-6">
          {t("instructorTa.instructorTitle")}
        </h1>
        <SelectFilter name="department" options={departmentOptions} />
        <div className="space-y-4 mt-4">
          {instructors.map((instructor: any, i: number) => (
            <div
              className="border border-gray-300 p-4 rounded-lg shadow-md"
              key={i}
            >
              <p className="text-gray-700 mb-2">
                <b>{t("instructorTa.name")}: </b>
                {instructor.fullName}
              </p>
              <p className="text-gray-700 mb-2">
                <b>{t("instructorTa.email")}: </b>
                {instructor.email}
              </p>
              <p className="text-gray-700 mb-2">
                <b>{t("instructorTa.department")}: </b>
                {tt(locale, instructor.department.name)}
              </p>
              {instructor.officeHours && (
                <p className="text-gray-700 mb-2">
                  <b>{t("instructorTa.officeHours")}: </b>
                  {instructor.officeHours}
                </p>
              )}
              {instructor.office && (
                <p className="text-gray-700 mb-2">
                  <b>{t("instructorTa.office")}: </b>
                  {instructor.office}
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

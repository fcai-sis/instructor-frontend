import { departmentsAPI, instructorTaAPI } from "@/api";
import Pagination from "@/components/Pagination";
import { SelectFilter } from "@/components/SetQueryFilter";
import { getAccessToken, getCurrentPage, limit } from "@/lib";
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

  if (response.status !== 200) throw new Error("Failed to fetch departments");

  revalidatePath("/department");

  return response.data;
};

export default async function Page({
  searchParams,
}: Readonly<{ searchParams: { page: string; department: string } }>) {
  const page = getCurrentPage(searchParams);
  const departmentSelected =
    searchParams.department as unknown as DepartmentType;

  const response = await getTeachingAssistants(page, departmentSelected);
  const teachingAssistants = response.teachingAssistants;
  const total = response.totalTeachingAssistants;

  const departments = await getDepartments();

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
        <h1>Teaching Assistants</h1>
        <SelectFilter name='department' options={departmentOptions} />
        <div>
          {teachingAssistants.map((ta: any) => (
            <div className='border border-black w-80'>
              <p>
                <b>Name: </b>
                {ta.fullName}
              </p>
              <p>
                <b>Email: </b>
                {ta.email}
              </p>
              <p>
                <b>Department: </b>
                {ta.department.name.en}
              </p>
              {ta.officeHours && (
                <p>
                  <b>Office Hours: </b>
                  {ta.officeHours}
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

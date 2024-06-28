import { departmentsAPI, instructorTaAPI } from "@/api";
import Pagination from "@/components/Pagination";
import { SelectFilter } from "@/components/SetQueryFilter";
import { getAccessToken, getCurrentPage, limit } from "@/lib";
import { DepartmentType } from "@fcai-sis/shared-models";
import { revalidatePath } from "next/cache";

export const getInstructors = async (
  page: number,
  department: DepartmentType
) => {
  const accessToken = await getAccessToken();
  const response = await instructorTaAPI.get(`/instructors/read`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      skip: page * limit - limit, // huh
      limit,
      department,
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
}: Readonly<{ searchParams: { page: string; department: string } }>) {
  const page = getCurrentPage(searchParams);

  const departmentSelected =
    searchParams.department as unknown as DepartmentType;

  const response = await getInstructors(page, departmentSelected);
  const instructors = response.instructors;
  const total = response.totalInstructors;

  const departmentResponse = await getDepartments();
  const departments = departmentResponse.departments;

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
        <h1>Instructors</h1>
        <SelectFilter name='department' options={departmentOptions} />
        <div>
          {instructors.map((instructor: any) => (
            <div className='border border-black w-80'>
              <p>
                <b>Name: </b>
                {instructor.fullName}
              </p>
              <p>
                <b>Email: </b>
                {instructor.email}
              </p>
              <p>
                <b>Department: </b>
                {instructor.department.name.en}
              </p>
              {instructor.officeHours && (
                <p>
                  <b>Office Hours: </b>
                  {instructor.officeHours}
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

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
        <h1 className='text-3xl font-bold mb-6'>Instructors</h1>
        <SelectFilter name='department' options={departmentOptions} />
        <div className='space-y-4 mt-4'>
          {instructors.map((instructor: any, i: number) => (
            <div
              className='border border-gray-300 p-4 rounded-lg shadow-md'
              key={i}
            >
              <p className='text-gray-700 mb-2'>
                <b>Name: </b>
                {instructor.fullName}
              </p>
              <p className='text-gray-700 mb-2'>
                <b>Email: </b>
                {instructor.email}
              </p>
              <p className='text-gray-700 mb-2'>
                <b>Department: </b>
                {instructor.department.name.en}
              </p>
              {instructor.officeHours && (
                <p className='text-gray-700 mb-2'>
                  <b>Office Hours: </b>
                  {instructor.officeHours}
                </p>
              )}
              {instructor.office && (
                <p className='text-gray-700 mb-2'>
                  <b>Office: </b>
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

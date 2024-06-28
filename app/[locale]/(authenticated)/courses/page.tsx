import { coursesAPI, departmentsAPI } from "@/api";
import Pagination from "@/components/Pagination";
import { SelectFilter } from "@/components/SetQueryFilter";
import { getAccessToken, getCurrentPage, limit } from "@/lib";
import { DepartmentType } from "@fcai-sis/shared-models";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export const getCourses = async (page: number, department: DepartmentType) => {
  const accessToken = await getAccessToken();

  const response = await coursesAPI.get(`/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      skip: page * limit - limit,
      limit,
      department,
    },
  });

  if (response.status !== 200) throw new Error("Failed to fetch courses");

  revalidatePath("/courses");

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

  const response = await getCourses(page, departmentSelected);
  const courses = response.courses;
  const total = response.totalCourses;
  console.log(courses);

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
      <h1>Courses</h1>
      <SelectFilter name='department' options={departmentOptions} />
      <div>
        {courses.map((course: any) => (
          <div className='border border-black w-80'>
            <p>
              <b>Code: </b>
              {course.code}
            </p>
            <p>
              <b>Name: </b>
              {course.name.en}
            </p>
            <p>
              <b>Departments: </b>
              {course.departments?.map((department: any) => (
                <span key={department.code}>{department.name.en}, </span>
              ))}
            </p>
            <Link href={`/courses/${course.code}`}>View details</Link>
          </div>
        ))}
        <Pagination totalPages={total / limit} />
      </div>
    </>
  );
}

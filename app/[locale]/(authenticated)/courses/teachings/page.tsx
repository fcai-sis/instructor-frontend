import { enrollmentsAPI, instructorTaAPI, scheduleAPI } from "@/api";
import Pagination from "@/components/Pagination";
import { getAccessToken, getCurrentPage, limit } from "@/lib";
import { getI18n } from "@/locales/server";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export const getInstructorTeachings = async () => {
  const accessToken = await getAccessToken();

  const response = await scheduleAPI.get(`/schedule/instructor-teachings/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 200) throw new Error("Failed to fetch teachings");

  revalidatePath("/teachings");

  return response.data;
};

export default async function Page({
  searchParams,
}: Readonly<{ searchParams: { page: string } }>) {
  const t = await getI18n();

  const page = getCurrentPage(searchParams);

  const response = await getInstructorTeachings();
  const teachings = response.myTeachings;

  return (
    <>
      <h1>{t("myCourses.title")}</h1>
      <div>
        {teachings.map((teaching: any) => (
          <div className='border border-black w-80'>
            <h2>{teaching.course.name.ar}</h2>
            <p>{teaching.course.code} </p>
            <p>
              <b>Credit Hours: </b>
              {teaching.course.creditHours}
            </p>

            <Link href={`/courses/teachings/${teaching.course.code}`}>
              View Students Enrolled
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

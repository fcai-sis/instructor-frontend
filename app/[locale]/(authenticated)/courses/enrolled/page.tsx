import { enrollmentsAPI } from "@/api";
import Pagination from "@/components/Pagination";
import { getAccessToken, getCurrentPage, limit } from "@/lib";
import { getI18n } from "@/locales/server";
import { EnrollmentStatusEnum } from "@fcai-sis/shared-models";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export const getStudentEnrollments = async (page: number) => {
  const accessToken = await getAccessToken();

  const response = await enrollmentsAPI.get(`/enrolled`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      skip: page * limit - limit,
      limit,
    },
  });

  if (response.status !== 200) throw new Error("Failed to fetch enrollments");

  revalidatePath("/courses");

  return response.data;
};

export default async function Page({
  searchParams,
}: Readonly<{ searchParams: { page: string } }>) {
  const t = await getI18n();

  const page = getCurrentPage(searchParams);

  const response = await getStudentEnrollments(page);
  const enrollments = response.courses;

  const total = response.totalStudentEnrollments;

  return (
    <>
      <h1>{t("myCourses.title")}</h1>
      <div>
        {enrollments.map((enrollment: any) => (
          <div className='border border-black w-80'>
            <h2>{enrollment.course.name.ar}</h2>
            <p>{enrollment.course.code} </p>
            <p>
              <b>Credit Hours: </b>
              {enrollment.course.creditHours}
            </p>

            {enrollment.examHall ? (
              <p>
                <b>Exam Hall: </b>
                {enrollment.examHall.name.en}
              </p>
            ) : null}
            {enrollment.seatNumber ? (
              <p>
                <b>Seat Number: </b>
                {enrollment.seatNumber}
              </p>
            ) : null}

            {enrollment.status !== EnrollmentStatusEnum[0] ? (
              <>
                <p>
                  <b>Mark: </b>
                  {enrollment.grade}
                </p>
                <p>
                  <b>Final Exam Grade: </b>
                  {enrollment.finalExamMark}
                </p>
                <p>
                  <b>Term Work Grade: </b>
                  {enrollment.termWorkMark}
                </p>
                <p>
                  <b>Total Grade: </b>
                  {enrollment.finalExamMark + enrollment.termWorkMark}
                </p>
              </>
            ) : null}
            <Link href={`/courses/${enrollment.course.code}`}>
              View details
            </Link>
          </div>
        ))}
        <Pagination totalPages={total / limit} />
      </div>
    </>
  );
}

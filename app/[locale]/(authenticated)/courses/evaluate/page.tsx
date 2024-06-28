import { enrollmentsAPI } from "@/api";
import { getAccessToken } from "@/lib";
import { revalidatePath } from "next/cache";
import Link from "next/link";

const getPassedEnrollments = async () => {
  const accessToken = await getAccessToken();

  const response = await enrollmentsAPI.get(`/enrolled`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 200) throw new Error("Failed to fetch enrollments");

  revalidatePath("/courses");

  return response.data;
};

export default async function Page() {
  const response = await getPassedEnrollments();
  const passedEnrollments = response.passedCourses;

  return (
    <>
      <h1>Course Evaluation</h1>
      {passedEnrollments.map((enrollment: any, i: number) => (
        <div key={i} className='border border-black'>
          <p>{enrollment.course.name.en}</p>
          <Link href={`/courses/evaluate/${enrollment.course.code}`}>
            Evaluate
          </Link>
        </div>
      ))}
    </>
  );
}

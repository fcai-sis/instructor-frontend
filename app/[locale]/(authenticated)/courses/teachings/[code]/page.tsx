import { getInstructorTeachings } from "../page";
import UpdateGradeForm from "./UpdateGradeForm";

export default async function Page({
  params: { code },
}: Readonly<{
  params: { code: string };
}>) {
  const response = await getInstructorTeachings();
  const course = response.myTeachings.find(
    (teaching: any) => teaching.course.code === code
  );

  const enrollments = response.enrolledStudents;

  const courseEnrollments = enrollments.filter(
    (enrollment: any) => (enrollment.course._id = course.course._id)
  );

  return (
    <>
      <h1>{<p>Students in {code}</p>}</h1>
      <div>
        {courseEnrollments.map((enrollment: any) => (
          <div className='border border-black w-80'>
            <h2>{enrollment.student.fullName}</h2>
            <p>{enrollment.student.studentId} </p>
            <UpdateGradeForm enrollment={enrollment} />
          </div>
        ))}
      </div>
    </>
  );
}

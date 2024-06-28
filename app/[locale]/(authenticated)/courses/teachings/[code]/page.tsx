import { StudentType } from "@fcai-sis/shared-models";
import { getInstructorTeachings } from "../page";

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
  // filter through enrollments to get students in the course
  const courseEnrollments = enrollments.filter(
    (enrollment: any) => (enrollment.course._id = course.course._id)
  );

  const students = courseEnrollments.map(
    (enrollment: any) => enrollment.student
  );

  return (
    <>
      <h1>{<p>Students in {code}</p>}</h1>
      <div>
        {students.map((student: StudentType) => (
          <div className='border border-black w-80'>
            <h2>{student.fullName}</h2>
            <p>{student.studentId} </p>
          </div>
        ))}
      </div>
    </>
  );
}

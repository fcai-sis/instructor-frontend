import { I18nProviderClient } from "@/locales/client";
import { getInstructorTeachings } from "../page";
import UpdateGradeForm from "./UpdateGradeForm";
import { getCurrentLocale } from "@/locales/server";
import { tt } from "@/lib";

export default async function Page({
  params: { code },
}: Readonly<{
  params: { code: string };
}>) {
  const locale = getCurrentLocale();
  const response = await getInstructorTeachings();
  const course = response.myTeachings.find(
    (teaching: any) => teaching.course.code === code
  );

  const enrollments = response.enrolledStudents;

  const courseEnrollments = enrollments.filter(
    (enrollment: any) => enrollment.course._id === course.course._id
  );

  return (
    <div className='flex flex-col w-2/6 mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6'>
        {tt(locale, {
          en: "Students in",
          ar: "الطلاب المسجلين في",
        })}
        {"  "}
        {code}
      </h1>
      <div className='space-y-4'>
        {courseEnrollments.map((enrollment: any) => (
          <div
            key={enrollment.student.studentId}
            className='border border-gray-300 p-4 rounded-lg shadow-md'
          >
            <h2 className='text-xl font-bold mb-2'>
              {enrollment.student.fullName}
            </h2>
            <p className='text-gray-700 mb-4'>{enrollment.student.studentId}</p>
            <I18nProviderClient locale={locale}>
              <UpdateGradeForm enrollment={enrollment} />
            </I18nProviderClient>
          </div>
        ))}
      </div>
    </div>
  );
}

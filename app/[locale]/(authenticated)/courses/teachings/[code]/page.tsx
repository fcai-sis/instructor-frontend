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
    <div className='flex flex-col w-full p-4'>
      <h1 className='text-3xl font-bold mb-6'>
        {tt(locale, {
          en: "Students in",
          ar: "الطلاب المسجلين في",
        })}
        {"  "}
        {code}
      </h1>
      <div className='overflow-x-auto w-full'>
        <table className='min-w-full bg-white border border-gray-200'>
          <thead>
            <tr>
              <th className='flex justify-start px-4 py-2 border-b text-left'>
                {tt(locale, { en: "Student Name", ar: "اسم الطالب" })}
              </th>
              <th className='px-4 py-2 border-b text-left'>
                {tt(locale, { en: "Student ID", ar: "رقم الطالب" })}
              </th>
              <th className='flex justify-center px-4 py-2 border-b text-left'>
                {tt(locale, { en: "Grades", ar: "الدرجات" })}
              </th>
            </tr>
          </thead>
          <tbody>
            {courseEnrollments.map((enrollment: any, index: number) => (
              <tr
                key={enrollment.student.studentId}
                className={index % 2 === 0 ? "bg-gray-100" : ""}
              >
                <td className='px-4 py-2 border-b'>
                  {enrollment.student.fullName}
                </td>
                <td className='px-4 py-2 border-b'>
                  {enrollment.student.studentId}
                </td>
                <td className='flex justify-center px-4 py-2 border-b'>
                  <I18nProviderClient locale={locale}>
                    <UpdateGradeForm enrollment={enrollment} />
                  </I18nProviderClient>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { dummyEnrollments } from "@/dummy/enrollments";
import {
  dummyCourseEvaluationQuestions,
  dummyInstructorEvaluationQuestions,
  dummyTAEvaluationQuestions,
} from "@/dummy/evaluationQuestions";
import { fakeResponse } from "@/dummy/utils";
import { getI18n } from "@/locales/server";
import EvaludationForm from "./EvaluationForm";
import { I18nProviderClient } from "@/locales/client";

export default async function Page({
  params: { locale, courseCode },
}: Readonly<{
  params: { locale: string; courseCode: string };
}>) {
  const t = await getI18n();

  const _enrollment = dummyEnrollments[0]; // TODO: Find the enrollment by course code

  const { data: evaluationData } = await fakeResponse({
    status: 200,
    data: {
      enrollment: _enrollment,
      questions: {
        course: dummyCourseEvaluationQuestions,
        instructor: dummyInstructorEvaluationQuestions,
        ta: dummyTAEvaluationQuestions,
      },
    },
  });

  const { enrollment, questions } = evaluationData;

  const options = [
    {
      label: { en: "Strongly disagree", ar: "لا أوافق على الإطلاق" },
      value: 1,
    },
    {
      label: { en: "Disagree", ar: "لا أوافق" },
      value: 2,
    },
    {
      label: { en: "Neutral", ar: "محايد" },
      value: 3,
    },
    {
      label: { en: "Agree", ar: "أوافق" },
      value: 4,
    },
    {
      label: { en: "Strongly agree", ar: "أوافق تماماً" },
      value: 5,
    },
  ];

  return (
    <>
      <h1>Evaluating {enrollment.course.name.ar}</h1>
      <I18nProviderClient locale={locale}>
        <EvaludationForm questions={questions} options={options} />
      </I18nProviderClient>
    </>
  );
}

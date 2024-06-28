"use client";

import { useI18n } from "@/locales/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { evaluateCourse } from "./actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const evaluationFormSchema = z.object({
  course: z.array(
    z.object({
      rating: z.string().refine((value) => value !== "0", {
        message: "Please select a rating",
      }),
    })
  ),
  instructor: z.array(
    z.object({
      rating: z.string().refine((value) => value !== "0", {
        message: "Please select a rating",
      }),
    })
  ),
  ta: z
    .array(
      z.object({
        rating: z.string().refine((value) => value !== "0", {
          message: "Please select a rating",
        }),
      })
    )
    .optional(),
});

export type EvaluationFormValues = z.infer<typeof evaluationFormSchema>;

export default function EvaludationForm({
  questions,
  options,
}: {
  questions: any;
  options: any;
}) {
  const t = useI18n();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm<EvaluationFormValues>({
    resolver: zodResolver(evaluationFormSchema),
    defaultValues: {
      course: questions.course.map(() => ({
        rating: "0",
      })),
      instructor: questions.instructor.map(() => ({
        rating: "0",
      })),
      ta: questions.ta
        ? questions.ta.map(() => ({
            rating: "0",
          }))
        : undefined,
    },
  });

  const { fields: courseFields } = useFieldArray({
    control,
    name: "course",
  });

  const onSubmit = async (values: EvaluationFormValues) => {
    console.log(values);
    const result = await evaluateCourse(values);
    if (!result.success) {
      return toast.error(result.error?.message ?? "Failed to evaluate course");
    }
    toast.success("Course evaluated successfully");
    router.push("/courses/evaluate");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Evalute Course</h2>
      {courseFields.map((field, index) => {
        const { question } = questions.course[index];
        return (
          <div key={field.id}>
            <label>{question.ar}</label>
            <select
              {...register(`course.${index}.rating` as const)}
              className={
                !!errors.course &&
                !!errors.course[index] &&
                !!errors.course[index]!.rating
                  ? "ring ring-red-500"
                  : ""
              }
            >
              <option value="0" disabled>
                {t("evaluation.selectRating")}
              </option>
              {options.map((option: any) => (
                <option key={option.value} value={option.value}>
                  {option.label.ar}
                </option>
              ))}
            </select>
          </div>
        );
      })}
      <h2>Evalute Instructor</h2>
      {questions.instructor.map(({ question }: any, index: number) => {
        return (
          <div key={index}>
            <label>{question.ar}</label>
            <select
              {...register(`instructor.${index}.rating` as const)}
              className={
                !!errors.instructor &&
                !!errors.instructor[index] &&
                !!errors.instructor[index]!.rating
                  ? "ring ring-red-500"
                  : ""
              }
            >
              <option value="0" disabled>
                {t("evaluation.selectRating")}
              </option>
              {options.map((option: any) => (
                <option key={option.value} value={option.value}>
                  {option.label.ar}
                </option>
              ))}
            </select>
          </div>
        );
      })}
      {questions.ta && (
        <>
          <h2>Evalute TA</h2>
          {questions.ta.map(({ question }: any, index: number) => {
            return (
              <div key={index}>
                <label>{question.ar}</label>
                <select
                  {...register(`ta.${index}.rating` as const)}
                  className={
                    !!errors.ta &&
                    !!errors.ta[index] &&
                    !!errors.ta[index]!.rating
                      ? "ring ring-red-500"
                      : ""
                  }
                >
                  <option value="0" disabled>
                    {t("evaluation.selectRating")}
                  </option>
                  {options.map((option: any) => (
                    <option key={option.value} value={option.value}>
                      {option.label.ar}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
        </>
      )}
      <button className="btn" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting" : "Submit"}
      </button>
    </form>
  );
}

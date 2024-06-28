"use client";
import { CourseType } from "@fcai-sis/shared-models";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import { dummyEnrollInCourseAction, enrollInCourseAction } from "./actions";

const enrollInCourseFormSchema = z.object({
  courses: z.array(
    z.object({ course: z.string(), group: z.string().optional() })
  ),
});

export type enrollInCourseFormValues = z.infer<typeof enrollInCourseFormSchema>;

export default function RegisterCourseForm({
  courses,
}: {
  courses: CourseType[];
}) {
  const router = useRouter();
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm<enrollInCourseFormValues>({
    resolver: zodResolver(enrollInCourseFormSchema),
    defaultValues: {
      courses: [],
    },
  });

  const {
    fields: courseFields,
    append: addCourse,
    remove: removeCourse,
  } = useFieldArray({
    control,
    name: "courses",
  });

  const handleCourseChange = (index: number, value: string) => {
    const newSelectedCourses = [...selectedCourses];
    newSelectedCourses[index] = value;
    setSelectedCourses(newSelectedCourses);
  };

  const onSubmit = async (values: enrollInCourseFormValues) => {
    const enrollInCourseResponse = await enrollInCourseAction(values);

    if (!enrollInCourseResponse.success) {
      return toast.error(
        enrollInCourseResponse.error?.message ?? "Failed to enroll in course"
      );
    }

    toast.success("Enrolled into selected courses successfully");
    router.push(`/courses/enrolled`);
  };

  return (
    <>
      <h1>Eligible Courses</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {courseFields.map((field, index) => (
          <div key={field.id}>
            <select
              {...register(`courses.${index}.course` as const)}
              defaultValue={field.course}
              onChange={(e) => handleCourseChange(index, e.target.value)}
            >
              <option value='' disabled>
                Select a course
              </option>
              {courses
                .filter(
                  (course) =>
                    !selectedCourses.includes(course.code) ||
                    course.code === selectedCourses[index]
                )
                .map((course) => (
                  <option key={course.code} value={course.code}>
                    {course.code}
                  </option>
                ))}
            </select>
            {errors.courses && errors.courses[index] && (
              <span>{errors.courses[index]?.message}</span>
            )}
            <select
              {...register(`courses.${index}.group` as const)}
              defaultValue={field.group}
            >
              <option value='' disabled>
                Select a group
              </option>
              {(courses as any)
                .find((course: any) => course.code === selectedCourses[index])
                ?.groups?.map((group: string) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
            </select>
            <button
              type='button'
              onClick={() => {
                removeCourse(index);
                const newSelectedCourses = [...selectedCourses];
                newSelectedCourses.splice(index, 1);
                setSelectedCourses(newSelectedCourses);
              }}
            >
              Remove Course
            </button>
          </div>
        ))}
        <button
          type='button'
          onClick={() => addCourse({ course: "", group: "" })}
        >
          Add Course
        </button>

        <button className='btn' type='submit' disabled={isSubmitting}>
          {isSubmitting ? "Submitting" : "Submit"}
        </button>
      </form>
    </>
  );
}

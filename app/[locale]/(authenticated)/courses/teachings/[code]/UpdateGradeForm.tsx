"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { updateEnrollmentGrade } from "./actions";

const updateGradeFormSchema = z.object({
  grade: z.number().int().min(0).max(40),
  enrollment: z.string(),
});

export type UpdateGradeFormValues = z.infer<typeof updateGradeFormSchema>;

export default function UpdateGradeForm({ enrollment }: { enrollment: any }) {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<UpdateGradeFormValues>({
    resolver: zodResolver(updateGradeFormSchema),
    defaultValues: {
      grade: enrollment.termWorkMark,
      enrollment: enrollment._id,
    },
  });

  const onSubmit = async (values: UpdateGradeFormValues) => {
    const updateEnrollmentGradeResponse = await updateEnrollmentGrade(values);

    if (!updateEnrollmentGradeResponse.success) {
      return toast.error(
        updateEnrollmentGradeResponse.error?.message ??
          "Failed to update enrollment grade"
      );
    }

    toast.success("Enrollment grade updated successfully");
    router.push(`/courses/teachings`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Term Work Grade</label>
      <input type='number' {...register("grade", { valueAsNumber: true })} />
      {errors.grade && <p>{errors.grade.message}</p>}
      <button className='btn' type='submit' disabled={isSubmitting}>
        {isSubmitting ? "Submitting" : "Submit"}
      </button>
    </form>
  );
}

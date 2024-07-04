"use server";
import { getAccessToken } from "@/lib";
import { UpdateGradeFormValues } from "./UpdateGradeForm";
import { gradeAPI } from "@/api";
import { revalidatePath } from "next/cache";

export const updateEnrollmentGrade = async (data: UpdateGradeFormValues) => {
  const accessToken = await getAccessToken();
  const { enrollment, termWorkGrade, finalExamGrade } = data;

  const requestBody = {
    termWorkMark: termWorkGrade,
    finalExamMark: finalExamGrade,
  };

  const response = await gradeAPI.patch(`/update/${enrollment}`, requestBody, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 200) {
    return {
      success: false,
      error: {
        message: response.data.errors
          .map((error: any) => error.message)
          .join(", "),
      },
    };
  }

  revalidatePath("/teachings");

  return {
    success: true,
  };
};

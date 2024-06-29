"use server";
import { getAccessToken } from "@/lib";
import { UpdateGradeFormValues } from "./UpdateGradeForm";
import { gradeAPI } from "@/api";
import { revalidatePath } from "next/cache";

export const updateEnrollmentGrade = async (data: UpdateGradeFormValues) => {
  const accessToken = await getAccessToken();
  const { enrollment, grade } = data;
  console.log(data);

  const requestBody = {
    termWorkMark: grade,
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
        message: response.data.error.message,
      },
    };
  }

  revalidatePath("/teachings");

  return {
    success: true,
  };
};

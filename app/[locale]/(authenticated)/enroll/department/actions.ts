"use server";
import { getAccessToken } from "@/lib";
import { DepartmentPreferenceFormValues } from "./DepartmentPreferenceForm";
import { departmentEnrollmentAPI, enrollmentsAPI } from "@/api";
import { revalidatePath } from "next/cache";

export const submitDepartmentPreferenceAction = async (
  data: DepartmentPreferenceFormValues
) => {
  const accessToken = await getAccessToken();

  const requestBody = {
    preferences: data.preferences.map((department) => department.code),
  };

  const response = await departmentEnrollmentAPI.post(`/`, requestBody, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 201) {
    return {
      success: false,
      error: {
        message: response.data.error.message,
      },
    };
  }

  revalidatePath("/enroll");

  return { success: true };
};

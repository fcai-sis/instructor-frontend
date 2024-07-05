"use server";

import { graduationAPI } from "@/api";
import { getAccessToken } from "@/lib";
import { revalidatePath } from "next/cache";
import { CreateGraduationFormValues } from "./CreateGraduationForm";

export const createGraduationTeamAction = async (
  data: CreateGraduationFormValues
) => {
  const accessToken = await getAccessToken();

  // if data contains any empty strings, return an error
  if (
    data.enrollments.some(
      (enrollment) => enrollment.enrollment.trim() === ""
    ) ||
    data.instructorTeachings.some(
      (instructorTeaching) =>
        instructorTeaching.instructorTeaching.trim() === ""
    )
  ) {
    return {
      success: false,
      error: { message: "Please fill in all fields" },
    };
  }
  const mappedAssistantTeachings = data.assistantTeachings?.map(
    (assistantTeaching) => assistantTeaching.assistantTeaching
  );
  const requestBody = {
    enrollments: data.enrollments.map(
      (enrollment: any) => enrollment.enrollment
    ),
    instructorTeachings: data.instructorTeachings.map(
      (instructorTeaching: any) => instructorTeaching.instructorTeaching
    ),
    assistantTeachings: mappedAssistantTeachings?.some(
      (assistantTeaching) => assistantTeaching.trim() === ""
    )
      ? undefined
      : mappedAssistantTeachings,
  };

  console.log(requestBody);

  const response = await graduationAPI.post(`/creat`, requestBody, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log(response.data);

  if (response.status !== 201) {
    return {
      success: false,
      error: {
        message: response.data.errors
          .map((error: any) => error.message)
          .join(", "),
      },
    };
  }

  revalidatePath("/graduation");

  return { success: true };
};

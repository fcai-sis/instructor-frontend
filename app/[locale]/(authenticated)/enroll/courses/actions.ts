"use server";

import { getAccessToken } from "@/lib";
import { revalidatePath } from "next/cache";
import { enrollInCourseFormValues } from "./RegisterCourseForm";
import { enrollmentsAPI } from "@/api";
import { fakeResponse } from "@/dummy/utils";

export const enrollInCourseAction = async (data: enrollInCourseFormValues) => {
  const accessToken = await getAccessToken();

  // map the form data to the request body, turn it into an actual array, remove any empty values and duplicates
  const formData = {
    courses: data.courses.map((course) => course.course).filter(Boolean),
  };

  const requestBody = {
    coursesToEnrollIn: formData.courses.map((course) => ({
      courseCode: course,
    })),
  };

  const response = await enrollmentsAPI.post(`/`, requestBody, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

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

  revalidatePath("/enroll");

  return { success: true };
};

export const dummyEnrollInCourseAction = async (
  data: enrollInCourseFormValues
) => {
  const repsonse = await fakeResponse({
    status: 201,
    data: {},
  });

  if (repsonse.status !== 201) {
    return {
      success: false,
      error: {
        message: "Failed to enroll in course",
      },
    };
  }

  return { success: true };
};

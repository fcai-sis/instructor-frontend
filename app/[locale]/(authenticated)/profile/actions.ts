"use server";

import { profileAPI } from "@/api";
import { getAccessToken } from "@/lib";
import { revalidatePath } from "next/cache";
import { updateProfileValues } from "./ProfileDisplay";

export const getProfileAction = async () => {
  const accessToken = await getAccessToken();

  const response = await profileAPI.get(`/student-profile`, {
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

  revalidatePath("/profile");

  return {
    success: true,
    data: {
      editableFields: response.data.editableProfileFields,
      viewableFields: response.data.immutableProfileFields,
    },
  };
};

export const updateProfileAction = async (data: updateProfileValues) => {
  const accessToken = await getAccessToken();

  const requestBody = {
    student: {
      ...data,
    },
  };
  console.log(data);

  const response = await profileAPI.patch(`/student-profile`, requestBody, {
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

  revalidatePath("/profile");

  return { success: true };
};

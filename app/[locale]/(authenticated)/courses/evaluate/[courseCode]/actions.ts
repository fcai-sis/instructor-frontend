"use server";

import { fakeResponse } from "@/dummy/utils";
import { EvaluationFormValues } from "./EvaluationForm";

export async function evaluateCourse(data: EvaluationFormValues) {
  const repsonse = await fakeResponse({
    status: 201,
    data: {},
  });

  if (repsonse.status !== 201) {
    return {
      success: false,
      error: {
        message: "Failed to evaluate course",
      },
    };
  }

  return { success: true };
}

"use server";

import { serviceRequestsAPI } from "@/api";
import { dummyServiceRequests } from "@/dummy/serviceRequests";
import { fakeResponse } from "@/dummy/utils";
import { getAccessToken } from "@/lib";
import { ServiceRequestStatusEnum } from "@fcai-sis/shared-models";
import { revalidatePath } from "next/cache";

export async function createServiceRequest(data: FormData) {
  const accessToken = await getAccessToken();

  console.log(data);

  const response = await serviceRequestsAPI.post("/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
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

  revalidatePath("/requests");

  return { success: true };
}

export async function dummyCreateServiceRequest(data: FormData) {
  const serviceName = data.get("serviceName");
  const image = data.get("image");

  let response: any;

  if (!serviceName || !image) {
    response = await fakeResponse({
      status: 400,
      errors: [
        {
          field: "serviceName",
          message: "Service name is required",
        },
        {
          field: "image",
          message: "Image is required",
        },
      ],
    });
  } else {
    const _created = {
      createdAt: new Date(),
      serviceName: serviceName.toString(),
      image: image.toString(),
      status: ServiceRequestStatusEnum[0],
    };

    response = await fakeResponse({
      status: 201,
      data: {
        serviceRequest: _created,
      },
    });

    dummyServiceRequests.push(response.data.serviceRequest);
  }

  if (response.status !== 201) {
    return { success: false, ...response.data };
  }

  return { success: true };
}

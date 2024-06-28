// const url = "https://ckes.cu.edu.eg/facultypayment.aspx";

import { serviceRequestsAPI } from "@/api";
import Pagination from "@/components/Pagination";
import ServiceRequestCard from "@/components/ServiceRequestCard";
import { SelectFilter } from "@/components/SetQueryFilter";
import { getAccessToken, getCurrentPage, limit, tt } from "@/lib";
import { getCurrentLocale, getI18n } from "@/locales/server";
import {
  ServiceRequestStatusEnum,
  ServiceRequestStatusEnumType,
  ServiceRequestType,
} from "@fcai-sis/shared-models";
import { Plus } from "iconoir-react";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export const getStudentServiceRequests = async (
  page: number,
  status?: ServiceRequestStatusEnumType
) => {
  const accessToken = await getAccessToken();
  const response = await serviceRequestsAPI.get<{
    serviceRequests: ServiceRequestType[];
    totalServiceRequests: number;
  }>(`/mine`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      page,
      limit,
      status,
    },
  });

  if (response.status !== 200)
    throw new Error("Failed to fetch service requests");

  revalidatePath("/requests");

  return response.data;
};

export default async function Page({
  searchParams,
}: Readonly<{
  searchParams: { page: string; status: string };
}>) {
  const t = await getI18n();
  const locale = getCurrentLocale();
  const page = getCurrentPage(searchParams);
  const status = searchParams.status as ServiceRequestStatusEnumType;

  const response = await getStudentServiceRequests(page, status);
  const studentServiceRequests = response.serviceRequests;
  const totalRequests = response.totalServiceRequests;

  const statusOptions = [
    {
      label: tt(locale, {
        en: "All requests",
        ar: "كل الطلبات",
      }),
      value: "",
    },
    {
      label: tt(locale, {
        en: "Pending",
        ar: "قيد الانتظار",
      }),
      value: ServiceRequestStatusEnum[0],
    },
    {
      label: tt(locale, {
        en: "In progress",
        ar: "قيد التنفيذ",
      }),
      value: ServiceRequestStatusEnum[1],
    },
    {
      label: tt(locale, {
        en: "Completed",
        ar: "مكتمل",
      }),
      value: ServiceRequestStatusEnum[2],
    },
    {
      label: tt(locale, {
        en: "Rejected",
        ar: "مرفوض",
      }),
      value: ServiceRequestStatusEnum[3],
    },
  ];

  return (
    <>
      <div className="flex gap-2 items-center justify-between">
        <h1>{t("serviceRequests.title")}</h1>
        <Link href="/requests/create" className="btn">
          {t("serviceRequests.createServiceRequest")}
          <Plus className="[&>*]:stroke-white" />
        </Link>
      </div>
      <div className="flex gap-2 items-center">
        <label htmlFor="status" className="">
          {tt(locale, {
            en: "Filter by status:",
            ar: "حسب الحالة:",
          })}
        </label>
        <SelectFilter name="status" options={statusOptions} />
      </div>
      <div>
        {studentServiceRequests.map((serviceRequest: any, i: number) => (
          <ServiceRequestCard key={i} serviceRequest={serviceRequest} />
        ))}
      </div>
      <Pagination totalPages={totalRequests / limit} />
    </>
  );
}

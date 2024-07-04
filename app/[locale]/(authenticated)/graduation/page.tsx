import { getAccessToken } from "@/lib";
import CreateGraduationForm from "./CreateGraduationForm";
import { revalidatePath } from "next/cache";
import { graduationAPI } from "@/api";
import { I18nProviderClient } from "@/locales/client";

export const getGraduationProjectEnrollments = async () => {
  const accessToken = await getAccessToken();

  const response = await graduationAPI.get(`/grad-enrolls`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 200) {
    revalidatePath("/graduation");
    return {
      enrollments: [],
    };
  }

  revalidatePath("/graduation");

  return response.data;
};

export const getGraduationProjectTeachings = async () => {
  const accessToken = await getAccessToken();

  const response = await graduationAPI.get(`/grad-teachings`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  console.log(response.status, response.data);

  if (response.status !== 200) {
    revalidatePath("/graduation");
    return {
      instructorTeachings: [],
      taTeachings: [],
    };
  }

  revalidatePath("/graduation");

  return response.data;
};

export default async function Page({
  params: { locale },
}: Readonly<{ params: { locale: string } }>) {
  const { enrollments } = await getGraduationProjectEnrollments();
  const { instructorTeachings, taTeachings } =
    await getGraduationProjectTeachings();

  return (
    <>
      <I18nProviderClient locale={locale}>
        <CreateGraduationForm
          enrollments={enrollments}
          instructorTeachings={instructorTeachings}
          assistantTeachings={taTeachings}
        />
      </I18nProviderClient>
    </>
  );
}

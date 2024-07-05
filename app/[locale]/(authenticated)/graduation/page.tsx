import { getAccessToken, tokenPayload, tt } from "@/lib";
import CreateGraduationForm from "./CreateGraduationForm";
import { revalidatePath } from "next/cache";
import { graduationAPI } from "@/api";
import { I18nProviderClient } from "@/locales/client";
import { getServerSession } from "next-auth";
import { InstructorModel } from "@fcai-sis/shared-models";
import { getCurrentLocale } from "@/locales/server";
import dbConnect from "@/database";

export const getAuthenticatedInstructor = async () => {
  const session = await getServerSession();
  const payload = tokenPayload(session);
  await dbConnect();
  const instructor = await InstructorModel.findOne({
    user: payload.userId,
  });

  if (!instructor) {
    return null;
  }
  revalidatePath("/graduation");
  return instructor;
};

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

  // console.log(response.status, response.data);

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

export default async function Page() {
  const locale = getCurrentLocale();
  const me = await getAuthenticatedInstructor();
  if (!me) {
    return (
      <div>
        <h1>Not Authorized</h1>
      </div>
    );
  }

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
          me={JSON.stringify(me)}
        />
      </I18nProviderClient>
    </>
  );
}

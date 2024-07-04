import Schedule from "@/components/Schedule";
import { dummyCourses } from "@/dummy/courses";
import dummySchedule from "@/dummy/schedule";
import { dummySlotsByDay, dummyTimeRanges } from "@/dummy/slots";
import { fakeResponse, localizedLevel } from "@/dummy/utils";
import { getAccessToken, tt } from "@/lib";
import { getCurrentLocale, getI18n } from "@/locales/server";
import { instructorTaAPI, studentsAPI } from "@/api";
import { revalidatePath } from "next/cache";

const getInstructor = async () => {
  const accessToken = await getAccessToken();

  const response = await instructorTaAPI.get(`/instructors/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 200) throw new Error("Failed to fetch instructor");

  revalidatePath("/");

  return response.data;
};

export default async function Page() {
  const t = await getI18n();
  const locale = getCurrentLocale();

  const getInstructorResponse = await getInstructor();
  const instructor = getInstructorResponse.instructor;

  const _eligibleCourses = dummyCourses;
  const _schedule = dummySchedule;

  const { data: scheduleData } = await fakeResponse({
    status: 200,
    data: {
      schedule: _schedule,
    },
  });
  const { schedule } = scheduleData;

  const _slots = dummySlotsByDay;
  const _timeRanges = dummyTimeRanges;

  const { data: slotData } = await fakeResponse({
    status: 200,
    data: {
      slots: _slots,
      timeRanges: _timeRanges,
    },
  });
  const { slots, timeRanges } = slotData;

  return (
    <>
      <div className='flex items-center justify-between pb-4 w-full'>
        <div className='flex flex-col gap-4'>
          <h2 className='flex gap-4 items-center'>
            {t("home.greeting", {
              name: instructor.fullName.split(" ")[0],
            })}
          </h2>
          <div className='flex gap-2'>
            <p className='rounded-lg bg-slate-100 text-slate-500 px-4 py-2'>
              {instructor.email}
            </p>
            <p className='rounded-lg bg-blue-100 text-blue-500 px-4 py-2'>
              {instructor.officeHours}
            </p>
            <p className='rounded-lg bg-blue-100 text-blue-500 px-4 py-2'>
              {tt(locale, instructor.department.name)}
            </p>
          </div>
        </div>
      </div>
      <div className='flex-col py-4 w-full'>
        <h2>{t("home.schedule")}</h2>
        <Schedule slots={slots} timeRanges={timeRanges} schedule={schedule} />
      </div>
    </>
  );
}

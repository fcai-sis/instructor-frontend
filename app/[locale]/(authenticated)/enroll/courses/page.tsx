import dummySchedule from "@/dummy/schedule";
import { dummySlotsByDay, dummyTimeRanges } from "@/dummy/slots";
import { fakeResponse } from "@/dummy/utils";
import RegisterCourseForm from "./RegisterCourseForm";
import Schedule from "@/components/Schedule";
import { getAccessToken } from "@/lib";
import { enrollmentsAPI } from "@/api";
import { revalidatePath } from "next/cache";

export const getEligibleEnrollments = async () => {
  const accessToken = await getAccessToken();

  const response = await enrollmentsAPI.get(`/eligible`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 200) throw new Error("Failed to fetch enrollments");

  revalidatePath("/enroll");

  return response.data;
};

export default async function Page() {
  const response = await getEligibleEnrollments();
  const enrollments = response.courses;
  const eligibleCourses = enrollments.map(
    (enrollment: any) => enrollment.course
  );
  console.log(eligibleCourses);

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
      <RegisterCourseForm courses={eligibleCourses as any} />
      <Schedule slots={slots} timeRanges={timeRanges} schedule={schedule} />
    </>
  );
}

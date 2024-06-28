import AnnouncementCard from "@/components/AnnouncementCard";
import RadialProgress from "@/components/RadialProgress";
import Schedule from "@/components/Schedule";
import ServiceRequestCard from "@/components/ServiceRequestCard";
import { dummyCourses } from "@/dummy/courses";
import dummySchedule from "@/dummy/schedule";
import { dummySlotsByDay, dummyTimeRanges } from "@/dummy/slots";
import { fakeResponse, localizedLevel } from "@/dummy/utils";
import { getAccessToken, tt } from "@/lib";
import { getCurrentLocale, getI18n } from "@/locales/server";
import { getStudentServiceRequests } from "./requests/page";
import { getAnnouncements } from "./announcements/page";
import { studentsAPI } from "@/api";
import { revalidatePath } from "next/cache";

const getStudent = async () => {
  const accessToken = await getAccessToken();

  const response = await studentsAPI.get(`/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 200) throw new Error("Failed to fetch student");

  revalidatePath("/");

  return response.data;
};

export default async function Page() {
  const t = await getI18n();
  const locale = getCurrentLocale();

  const getStudentResponse = await getStudent();
  const student = getStudentResponse.student;

  const { announcements } = await getAnnouncements(1);
  const { serviceRequests } = await getStudentServiceRequests(1);

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
              name: student.fullName.split(" ")[0],
            })}
          </h2>
          <div className='flex gap-2'>
            <p className='rounded-lg bg-slate-100 text-slate-500 px-4 py-2'>
              {student.studentId}
            </p>
            <p className='rounded-lg bg-blue-100 text-blue-500 px-4 py-2'>
              {tt(locale, localizedLevel(student.level))}
            </p>
            <p className='rounded-lg bg-blue-100 text-blue-500 px-4 py-2'>
              {tt(locale, student.major.name)}
            </p>
          </div>
        </div>
        <div className='flex gap-2'>
          <div className='flex flex-col items-center'>
            <RadialProgress
              colorize={false}
              value={student.creditHours}
              max={130}
            />
            <p>
              <b>
                {tt(locale, {
                  en: "Credit Hours",
                  ar: "عدد الساعات المعتمدة",
                })}
              </b>
            </p>
          </div>
          <div className='flex flex-col items-center'>
            <RadialProgress colorize value={student.gpa} max={4} />
            <p>
              <b>
                {tt(locale, {
                  en: "GPA",
                  ar: "المعدل التراكمي",
                })}
              </b>
            </p>
          </div>
        </div>
      </div>
      <div className='flex-col py-4 w-full'>
        <h2>{t("home.schedule")}</h2>
        <Schedule slots={slots} timeRanges={timeRanges} schedule={schedule} />
      </div>
      <div className='flex gap-4 py-4 w-full'>
        <div className='w-full'>
          <h2>{t("announcements.title")}</h2>
          {announcements.map((announcement, index) => (
            <AnnouncementCard key={index} announcement={announcement} />
          ))}
        </div>
        <div className='w-full'>
          <h2>{t("serviceRequests.title")}</h2>
          {serviceRequests.map((serviceRequest: any, i: number) => (
            <ServiceRequestCard key={i} serviceRequest={serviceRequest} />
          ))}
        </div>
      </div>
    </>
  );
}

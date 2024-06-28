import AnnouncementCard from "@/components/AnnouncementCard";
import { getCurrentLocale, getI18n } from "@/locales/server";
import Pagination from "@/components/Pagination";
import { localizedLevel, localizedSeverity } from "@/dummy/utils";
import { getCurrentPage, limit, tt } from "@/lib";
import { SelectFilter } from "@/components/SetQueryFilter";
import { announcementsAPI, departmentsAPI } from "@/api";
import { AnnouncementSeveritiesEnum } from "@fcai-sis/shared-models";

export const getDepartments = async () => {
  const response = await departmentsAPI.get("/");
  if (response.status !== 200) throw new Error("Failed to fetch departments");
  return response.data;
};

export const getAnnouncements = async (
  page: number,
  department?: string,
  level?: number,
  severity?: string
) => {
  const repsonse = await announcementsAPI.get<{
    announcements: any[];
    total: number;
  }>("/", {
    params: {
      page,
      department,
      level,
      severity,
    },
  });

  if (repsonse.status !== 200) throw new Error("Failed to fetch announcements");

  return repsonse.data;
};

export default async function Page({
  searchParams,
}: Readonly<{
  searchParams: {
    page: string;
    department: string;
    level: string;
    severity: string;
  };
}>) {
  const locale = getCurrentLocale();
  const t = await getI18n();

  const page = getCurrentPage(searchParams);
  const department = searchParams.department;
  const level = parseInt(searchParams.level);
  const severity = searchParams.severity;

  const { announcements, total } = await getAnnouncements(
    page,
    department,
    level,
    severity
  );

  const { departments } = await getDepartments();

  const departmentOptions = [
    {
      label: tt(locale, {
        en: "All Departments",
        ar: "جميع الأقسام",
      }),
      value: "",
    },
    ...departments.map((department: any) => ({
      label: tt(locale, department.name),
      value: department.code,
    })),
  ];

  const levelOptions = [
    {
      label: tt(locale, {
        en: "All Levels",
        ar: "جميع المستويات",
      }),
      value: "",
    },
    ...[1, 2, 3, 4].map((level) => ({
      label: tt(locale, localizedLevel(level)),
      value: level.toString(),
    })),
  ];

  const severityOptions = [
    {
      label: tt(locale, {
        en: "All Severities",
        ar: "جميع الخطورات",
      }),
      value: "",
    },
    ...AnnouncementSeveritiesEnum.map((severity, index) => ({
      label: tt(locale, localizedSeverity(severity)),
      value: AnnouncementSeveritiesEnum[index],
    })),
  ];

  return (
    <>
      <h1>{t("announcements.title")}</h1>
      <div className="flex gap-4 py-4">
        <div className="flex gap-2 items-center">
          <label htmlFor="department" className="">
            {tt(locale, {
              en: "Filter by department:",
              ar: "حسب القسم:",
            })}
          </label>
          <SelectFilter name="department" options={departmentOptions} />
        </div>
        <div className="flex gap-2 items-center">
          <label htmlFor="level" className="">
            {tt(locale, {
              en: "Filter by level:",
              ar: "حسب المستوى:",
            })}
          </label>
          <SelectFilter name="level" options={levelOptions} />
        </div>
        <div className="flex gap-2 items-center">
          <label htmlFor="severity" className="">
            {tt(locale, {
              en: "Filter by severity:",
              ar: "حسب الخطورة:",
            })}
          </label>
          <SelectFilter name="severity" options={severityOptions} />
        </div>
      </div>
      <div>
        {announcements.map((announcement: any, i: number) => (
          <AnnouncementCard key={i} announcement={announcement} />
        ))}
      </div>
      <Pagination totalPages={total / limit} />
    </>
  );
}

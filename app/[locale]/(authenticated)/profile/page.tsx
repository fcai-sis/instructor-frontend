import { fakeResponse } from "@/dummy/utils";
import { getProfileAction } from "./actions";
import ProfileDisplay from "./ProfileDisplay";
import { dummyStudents } from "@/dummy/students";
import { StudentType } from "@fcai-sis/shared-models";

export default async function Page() {
  // const profileDataResponse = await getProfileAction();

  const _student = dummyStudents[0];
  const _editableProfileFields: Partial<StudentType>[] = [
    { address: _student.address },
    { birthYear: _student.birthYear },
    { birthMonth: _student.birthMonth },
    { birthDay: _student.birthDay },
    { birthPlace: _student.birthPlace },
    { phoneNumber: _student.phoneNumber },
    { gender: _student.gender },
    { religion: _student.religion },
  ];
  const _immutableProfileFields: Partial<StudentType>[] = [
    { studentId: _student.studentId },
    { fullName: _student.fullName },
    { scientificDivision: _student.scientificDivision },
    { nationality: _student.nationality },
  ];

  const { data: profileData } = await fakeResponse({
    data: {
      editableFields: _editableProfileFields,
      viewableFields: _immutableProfileFields,
    },
  });

  return (
    <>
      <ProfileDisplay profileData={profileData} />
    </>
  );
}

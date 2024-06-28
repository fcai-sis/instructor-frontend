import ProfileDisplay from "./ProfileDisplay";
import { getProfileAction } from "./actions";

export default async function Page() {
  const profileData = await getProfileAction();

  return (
    <>
      <ProfileDisplay profileData={profileData} />
    </>
  );
}

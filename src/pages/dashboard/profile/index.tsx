import { RoleBadge } from "@/components/roleBadge";
import { Detail } from "./detail";
import { userCredential } from "@/store";
import { useRecoilValue } from "recoil";

export default function Profile() {
  const credential = useRecoilValue(userCredential);

  return (
    <>
      <div className="text-center py-5">
        <h2 className="text-lg lg:text-2xl font-semibold tracking-wide">
          DETAIL PROFIL
        </h2>
        <div className="flex items-center gap-2 mt-3 w-max mx-auto">
          <p className="font-light"> Your login as</p>
          <RoleBadge role={credential.role} />
        </div>
      </div>
      <Detail />
    </>
  );
}

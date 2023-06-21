// import { ButtonTab } from "@/components/buttonTab";
// import { useState } from "react";
import { RoleBadge } from "@/components/roleBadge";
import { Detail } from "./detail";
import { userCredential } from "@/store";
import { useRecoilValue } from "recoil";
// import { Berkas } from "./berkas";

// type Tabs = "DETAIL" | "BERKAS";

export default function Profile() {
  const credential = useRecoilValue(userCredential)
  // const [tab, setTab] = useState<Tabs>("DETAIL");

  // const handleMoveTab = (tab: Tabs) => () => {
  //   setTab(tab);
  // };

  return (
    <>
      <div className="text-center py-5">
        <h2 className="text-lg lg:text-2xl font-semibold tracking-wide">
          DETAIL PROFIL
        </h2>
        <div className="flex items-center gap-2 mt-3 w-max mx-auto">
         <p className="font-light"> Your login as</p>
          <RoleBadge role={credential.role}/>
        </div>
        
      </div>
      {/* <h2 className="text-lg font-semibold dark:text-gray-200">Profile</h2> */}
      {/* <div className="my-5 w-max flex gap-2" aria-label="tabs">
        <ButtonTab
          isActive={tab === "DETAIL"}
          onClick={handleMoveTab("DETAIL")}
        >
          Detail
        </ButtonTab>
        <ButtonTab
          isActive={tab === "BERKAS"}
          onClick={handleMoveTab("BERKAS")}
        >
          Berkas saya
        </ButtonTab>
      </div> */}
      <Detail />
      {/* {tab === "GALLERY" && <Gallery />} */}
      {/* {tab === 'DETAIL' && <Detail />}
      {tab === 'BERKAS' && <Berkas />} */}
    </>
  );
}

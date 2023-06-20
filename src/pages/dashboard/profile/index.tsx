import { ButtonTab } from "@/components/buttonTab";
import { useState } from "react";
import { Detail } from "./detail";
// import { Berkas } from "./berkas";

type Tabs = 'DETAIL' | 'BERKAS'

export default function Profile() {

  const [tab, setTab] = useState<Tabs>('DETAIL')

  const handleMoveTab = (tab: Tabs) => () => {
    setTab(tab)
  }

  return (
    <>
      <h2 className="text-lg font-semibold dark:text-gray-200">Profile</h2>
      <div className="my-5 w-max flex gap-2" aria-label="tabs">
        <ButtonTab
          isActive={tab === "DETAIL"}
          onClick={handleMoveTab("DETAIL")}
        >
          Detail
        </ButtonTab>
        {/* <ButtonTab
          isActive={tab === "BERKAS"}
          onClick={handleMoveTab("BERKAS")}
        >
          Berkas saya
        </ButtonTab> */}
      </div>
      <Detail />
      {/* {tab === "GALLERY" && <Gallery />} */}
      {/* {tab === 'DETAIL' && <Detail />}
      {tab === 'BERKAS' && <Berkas />} */}
    </>
  );
}

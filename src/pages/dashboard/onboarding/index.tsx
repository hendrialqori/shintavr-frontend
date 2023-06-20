import { useEffect, useState } from "react";
import { Gallery } from "./gallery";
import { Announcement } from "./announcement";
import { ButtonTab } from "@/components/buttonTab";
import { useSearchParams, useNavigate } from "react-router-dom";

type Tabs = "GALLERY" | "ANNOUNCEMENT";

export default function Onboarding() {
  const [tab, setTab] = useState<Tabs>("GALLERY");

  const navigate = useNavigate();

  const [query] = useSearchParams();

  useEffect(() => {
    setTab((query.get("tab")?.toLocaleUpperCase() as Tabs) ?? "GALLERY");
  }, []);

  useEffect(() => {
    if (query.get("tab") === "announcement") {
      setTab("ANNOUNCEMENT");
    }
  }, [query.get("tab")]);

  const handleMoveTab = (tab: Tabs) => () => {
    setTab(tab);
    navigate("/onboarding?tab=" + tab.toLowerCase());
  };

  return (
    <>
      <h2 className="text-2xl font-semibold dark:text-gray-200">
        Selamat Datang di website pendaftaran siswa baru !
      </h2>
      <div className="my-5 w-max flex gap-2" aria-label="tabs">
        <ButtonTab
          isActive={tab === "GALLERY"}
          onClick={handleMoveTab("GALLERY")}
        >
          Galeri
        </ButtonTab>
        <ButtonTab
          isActive={tab === "ANNOUNCEMENT"}
          onClick={handleMoveTab("ANNOUNCEMENT")}
        >
          Pengumuman
        </ButtonTab>
      </div>
      {tab === "GALLERY" && <Gallery />}
      {tab === "ANNOUNCEMENT" && <Announcement />}
    </>
  );
}

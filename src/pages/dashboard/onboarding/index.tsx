import { useEffect, useState } from "react";
import { Gallery } from "./gallery";
import { Announcement } from "./announcement";
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
      <div className="text-center mt-5 mb-8">
        <h2 className="text-lg lg:text-2xl font-semibold tracking-wide">
          SELAMAT DATANG DI WEBSITE PENDAFTARAN SISWA/SIWI BARU
        </h2>
        <div className="my-5 w-max flex gap-2 mx-auto" aria-label="tabs">
          <button
            onClick={handleMoveTab("GALLERY")}
            className={`rounded-md text-sm md:text-base p-1 md:p-2 font-light md:font-semibold tracking-wide ${
              tab === "GALLERY" ? "bg-blue-100 text-blue-600" : "text-gray-500"
            }`}
          >
            Galeri Sekolah
          </button>
          <button
            onClick={handleMoveTab("ANNOUNCEMENT")}
            className={`rounded-md text-sm md:text-base  p-1 md:p-2 font-light md:font-semibold tracking-wide ${
              tab === "ANNOUNCEMENT"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-500"
            }`}
          >
            Pengumuman
          </button>
        </div>
      </div>
      {tab === "GALLERY" && <Gallery />}
      {tab === "ANNOUNCEMENT" && <Announcement />}
    </>
  );
}

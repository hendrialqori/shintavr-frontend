import { useEffect, useState } from "react";
import { TfiAnnouncement } from "react-icons/tfi";
import { AnnouncementDelete } from "./announcementDelete";
import { AnnouncementUpdate } from "./announcementEdit";
import { collection, onSnapshot } from "firebase/firestore";
import { db_firestore } from "@/configs/firebase";
import dayjs from "dayjs";
import { Loading } from "@/components/loading";
import { useRecoilValue } from "recoil";
import { userCredential } from "@/store";
import { CgTrashEmpty } from "react-icons/cg";
import { LuEdit2 } from "react-icons/lu";
import type { Announcement as TAnnouncement } from "@/types";

export const Announcement = () => {
  const credential = useRecoilValue(userCredential);

  const [announcements, setAnnouncement] = useState<TAnnouncement[]>([]);

  const [isLoading, setLoading] = useState(false);

  const [isDelete, setDelete] = useState({
    id: "",
    openModal: false,
  });

  const [isEdit, setEdit] = useState({
    id: "",
    openModal: false,
    message: "",
  });

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db_firestore, "announcement"),
      (snapshot) => {
        const dataMapping = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
          };
        }) as unknown as TAnnouncement[];

        setAnnouncement(dataMapping);
      },
      (error) => {
        throw new Error(error.message);
      }
    );

    return () => unSubscribe();
  }, []);

  const handleModalEdit = (
    id: string = "",
    message: string = "",
    type: "show" | "close"
  ) => {
    if (type === "show") {
      setEdit({
        id: id,
        openModal: true,
        message: message,
      });
    } else {
      setEdit({
        id: "",
        openModal: false,
        message: "",
      });
    }
  };

  const handleModalDelete = (id: string = "", type: "show" | "close") => {
    if (type === "show") {
      setDelete({
        id: id,
        openModal: true,
      });
    } else {
      setDelete({
        id: "",
        openModal: false,
      });
    }
  };

  return (
    <>
      {isLoading ? <Loading /> : null}
      <div className="flex flex-col gap-6 mb-10">
        {announcements.length === 0 ? (
          <p className="font-semibold text-lg text-center">Tidak ada pengumuman!</p>
        ) : null}
        {announcements?.map((announcement, i) => (
          <div key={i}>
            <div className="flex items-center justify-start gap-1 p-2">
             
              <TfiAnnouncement className="text-xl text-blue-600" /> -
              <p className="text-sm dark:text-blue-300 text-blue-600 tracking-wider">Administrator | {dayjs(announcement.create_at).format('DD, MMM')}</p>
            </div>
            <div
              className="flex flex-col gap-3 bg-gray-100 shadow-sm font-light dark:border-none dark:bg-dark2 dark:text-white p-5 text-sm leading-5 md:text-lg"
              aria-label="announcement-card"
            >
              <div role="textbox">{announcement.message}</div>
              <div className="flex items-center justify-end">
                {credential.role === "superadmin" ? (
                  <div className="flex gap-2" aria-label="action">
                    <button
                      onClick={() =>
                        handleModalEdit(
                          announcement.id,
                          announcement.message,
                          "show"
                        )
                      }
                      className="text-lg md:text-xl bg-blue-300 rounded-md p-2 text-white"
                    >
                      <LuEdit2 />
                    </button>
                    <button
                      onClick={() => handleModalDelete(announcement.id, "show")}
                      className="text-lg md:text-xl bg-red-300 rounded-md p-2 text-white"
                    >
                      <CgTrashEmpty />
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>

      {isEdit.openModal ? (
        <AnnouncementUpdate
          id={isEdit.id}
          message={isEdit.message}
          closeModal={() => handleModalEdit("", "", "close")}
          setLoading={setLoading}
        />
      ) : null}

      {isDelete.openModal ? (
        <AnnouncementDelete
          id={isDelete.id}
          closeModal={() => handleModalDelete("", "close")}
          setLoading={setLoading}
        />
      ) : null}
    </>
  );
};

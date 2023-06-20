import { useEffect, useState } from "react";
import { MdAnnouncement } from "react-icons/md";
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
      <div className="flex flex-col gap-2 mb-10">
        {announcements.length === 0 ? (
          <p className="font-semibold text-lg">Tidak ada pengumuman!</p>
        ) : null}
        {announcements?.map((announcement, i) => (
          <div
            key={i}
            className="flex flex-col gap-3 font-light border-[1px] dark:border-none dark:bg-dark2 dark:text-white rounded-md p-5 text-lg"
          >
            <div className="text-3xl text-blue-400 dark:text-white">
              <MdAnnouncement />
            </div>
            <div role="textbox">{announcement.message}</div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">
                {dayjs(announcement?.create_at).format("DD MMM")}
              </p>
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
                    className="text-xl lg:text-2xl bg-gray-300 rounded-md p-2 text-white"
                  >
                    <LuEdit2 />
                  </button>
                  <button
                    onClick={() => handleModalDelete(announcement.id, "show")}
                    className="text-xl lg:text-2xl bg-gray-300 rounded-md p-2 text-white"
                  >
                    <CgTrashEmpty />
                  </button>
                </div>
              ) : null}
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

import { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdAnnouncement } from "react-icons/md";
import { AnnouncementDelete } from "./announcementDelete";
import { AnnouncementUpdate } from "./announcementEdit";
import type { Announcement as TAnnouncement } from "@/types";
import { collection, onSnapshot } from "firebase/firestore";
import { db_firestore } from "@/configs/firebase";
import dayjs from "dayjs";
import { Loading } from "@/components/loading";

export const Announcement = () => {
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
      <div className="flex flex-col gap-2">
        {announcements.length === 0  ? <p className="font-semibold text-lg">Tidak ada pengumuman!</p> : null}
        {announcements?.map((announcement, i) => (
          <div
            key={i}
            className="flex flex-col gap-3 font-light border-[1px] rounded-md p-5 text-lg"
          >
            <div className="text-3xl">
              <MdAnnouncement />
            </div>
            <div role="textbox">{announcement.message}</div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">{dayjs(announcement?.create_at).format('DD MMM')}</p>
              <div className="flex gap-4 dis" aria-label="action">
                <button
                  onClick={() =>
                    handleModalEdit(
                      announcement.id,
                      announcement.message,
                      "show"
                    )
                  }
                  className="text-2xl lg:text-3xl bg-gray-500 rounded-md p-2 text-white"
                >
                  <AiFillEdit />
                </button>
                <button
                  onClick={() => handleModalDelete(announcement.id, "show")}
                  className="text-2xl lg:text-3xl bg-gray-500 rounded-md p-2 text-white"
                >
                  <AiFillDelete />
                </button>
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

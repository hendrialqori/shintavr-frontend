import { useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdAnnouncement } from "react-icons/md";
import { AnnouncementDelete } from "./announcementDelete";
import { AnnouncementUpdate } from "./announcementEdit";

const dummy = [
  {
    message:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delenitimodi, molestias doloribus officia consequatur neque enim suscipittempore. Aliquam quis rerum laboriosam minima magni saepe sunt fugitarchitecto quasi maiores?",
    date: "12 Mei",
  },
  {
    message:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delenitimodi, molestias doloribus officia consequatur neque enim suscipittempore. Aliquam quis rerum laboriosam minima magni saepe sunt fugitarchitecto quasi maiores?",
    date: "13 Mei",
  },
];

export const Announcement = () => {
  const [isDelete, setDelete] = useState({
    id: 0,
    openModal: false,
  });

  const [isEdit, setEdit] = useState({
    id: 0,
    openModal: false,
    message: "",
  });

  const handleModalEdit = (
    id: number = 0,
    message: string = "",
    type: "show" | "close"
  ) => {
    if (type === "show") {
      setEdit({
        id: id,
        openModal: true,
        message: message
      });
    } else {
      setEdit({
        id: 0,
        openModal: false,
        message: "",
      });
    }
  };

  const handleModalDelete = (id: number = 0, type: "show" | "close") => {
    if (type === "show") {
      setDelete({
        id: id,
        openModal: true,
      });
    } else {
      setDelete({
        id: 0,
        openModal: false,
      });
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        {dummy.map((announcement, i) => (
          <div
            key={i}
            className="flex flex-col gap-3 font-light border-[1px] rounded-md p-5 text-lg"
          >
            <div className="text-3xl">
              <MdAnnouncement />
            </div>
            {announcement.message}
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">{announcement.date}</p>
              <div className="flex gap-4 dis" aria-label="action">
                <button
                  onClick={() =>
                    handleModalEdit(i, announcement.message, "show")
                  }
                  className="text-2xl lg:text-3xl bg-gray-500 rounded-md p-2 text-white"
                >
                  <AiFillEdit />
                </button>
                <button
                  onClick={() => handleModalDelete(i, "show")}
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
          closeModal={() => handleModalEdit(0, "", "close")}
        />
      ) : null}

      {isDelete.openModal ? (
        <AnnouncementDelete
          id={isDelete.id}
          closeModal={() => handleModalDelete(0, "close")}
        />
      ) : null}
    </>
  );
};

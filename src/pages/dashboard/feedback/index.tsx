import { Loading } from "@/components/loading";
import { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit, AiOutlineMessage } from "react-icons/ai";
import type { Feedback as TFeedback } from "@/types";
import { FeedbackUpdate } from "./feedbackUpdate";
import { FeedbackDelete } from "./feedbackDelete";
import { collection, onSnapshot } from "firebase/firestore";
import { db_firestore } from "@/configs/firebase";

export default function Feedback() {
  const [feedbacks, setfeedback] = useState<TFeedback[]>([]);

  const [isLoading, setLoading] = useState(false);

  const [isDelete, setDelete] = useState({
    id: "",
    person: "",
    openModal: false,
  });

  const [isEdit, setEdit] = useState({
    id: "",
    openModal: false,
    message: "",
  });

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db_firestore, "feedback"),
      (snapshot) => {
        const dataMapping = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
          };
        }) as unknown as TFeedback[];

        setfeedback(dataMapping);
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

  const handleModalDelete = (
    id: string = "",
    person: string = "",
    type: "show" | "close"
  ) => {
    if (type === "show") {
      setDelete({
        id: id,
        person: person,
        openModal: true,
      });
    } else {
      setDelete({
        id: "",
        person: "",
        openModal: false,
      });
    }
  };

  return (
    <>
      {isLoading ? <Loading /> : null}
      <h2 className="text-lg font-semibold">Feedback</h2>
      <div className="mt-5 flex flex-col gap-3">
        {feedbacks.length === 0 ? (
          <p className="font-semibold text-lg">Tidak ada feedback!</p>
        ) : null}
        {feedbacks?.map((feedback) => (
          <div
            key={feedback.id}
            className="flex flex-col gap-2 font-light border-[1px] rounded-md px-5 py-4 text-lg"
          >
            <div className="text-3xl">
              <AiOutlineMessage />
            </div>
            <h1 className="font-semibold">{feedback.person}</h1>
            <div>{feedback.message}</div>
            <p className="font-semibold text-sm">12 Mei</p>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold"></p>
              <div className="flex gap-4 dis" aria-label="action">
                <button
                  onClick={() =>
                    handleModalEdit(feedback.id, feedback.message, "show")
                  }
                  className="text-xl lg:text-2xl bg-gray-500 rounded-md p-2 text-white"
                >
                  <AiFillEdit />
                </button>
                <button
                  onClick={() =>
                    handleModalDelete(feedback.id, feedback.person, "show")
                  }
                  className="text-xl lg:text-2xl bg-gray-500 rounded-md p-2 text-white"
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isEdit.openModal ? (
        <FeedbackUpdate
          id={isEdit.id}
          message={isEdit.message}
          setLoading={setLoading}
          closeModal={() => handleModalEdit("", "", "close")}
        />
      ) : null}

      {isDelete.openModal ? (
        <FeedbackDelete
          id={isDelete.id}
          person={isDelete.person}
          setLoading={setLoading}
          closeModal={() => handleModalDelete("", "", "close")}
        />
      ) : null}
    </>
  );
}
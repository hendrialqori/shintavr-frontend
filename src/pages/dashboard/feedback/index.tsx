import { Loading } from "@/components/loading";
import { useEffect, useMemo, useState } from "react";
import type { Feedback as TFeedback } from "@/types";
import { FeedbackUpdate } from "./feedbackUpdate";
import { FeedbackDelete } from "./feedbackDelete";
import { collection, onSnapshot } from "firebase/firestore";
import { db_firestore } from "@/configs/firebase";
import { useRecoilValue } from "recoil";
import { userCredential } from "@/store";
import dayjs from "dayjs";
import { TfiAnnouncement } from "react-icons/tfi";
import { LuEdit2 } from "react-icons/lu";
import { CgTrashEmpty } from "react-icons/cg";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function Feedback() {
  const credential = useRecoilValue(userCredential);

  const navigate = useNavigate();

  const [feedbacks, setfeedback] = useState<TFeedback[]>([]);

  const [search, setSearch] = useState("");

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

  const feedbackMemoize = useMemo(() => {
    return feedbacks.filter((f) => f.person.toLowerCase().includes(search));
  }, [search, feedbacks]);

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
    id = "",
    message = "",
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
    id = "",
    person = "",
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
      <div className="text-center py-5">
        <h2 className="text-lg lg:text-2xl font-semibold tracking-wide">
          FEEDBACK
        </h2>
        <span className="text-sm font-light">
          Berikan pada sekolah pesan supaya kami menjadi lebih baik lagi
          kedepannya.
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <div className="flex items-center">
          <div className="bg-gray-200 text-gray-800 py-2 px-3 rounded-l-xl">
            <BiSearch className="text-2xl" />
          </div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            className="text-md border-none rounded-r-xl bg-gray-100 focus:ring-2 focus:ring-blue-600 focus:bg-white p-2 w-full placeholder:text-center"
            placeholder="Cari nama pendaftar"
          />
        </div>
        {credential.role !== "superadmin" ? (
          <button
            onClick={() => navigate("/profile")}
            className="bg-blue-400 py-2 px-4 rounded-xl text-white font-semibold"
          >
            Tambah Feedback
          </button>
        ) : null}
      </div>

      <div className="mt-5 flex flex-col gap-6 mb-10">
        {/* jika feedback tidak ada */}
        {feedbackMemoize?.length === 0 ? (
          <p className="font-semibold text-lg dark:text-gray-100 text-center mt-10">
            Tidak ada feedback!
          </p>
        ) : null}

        {feedbackMemoize?.map((feedback) => (
          <div key={feedback.id}>
            <div className="flex items-center justify-start gap-1 p-2">
              <TfiAnnouncement className="text-sm lg:text-xl text-blue-600" /> -
              <p className="text-xs lg:text-sm dark:text-blue-300 text-blue-600 tracking-wider">
                {feedback.person} |{" "}
                {dayjs(feedback.create_at).format("DD, MMM")}
              </p>
            </div>
            <div
              className="flex flex-col gap-3 bg-gray-100 shadow-sm font-light dark:border-none dark:bg-dark2 dark:text-white p-5 text-base lg:text-lg"
              aria-label="announcement-card"
            >
              <div role="textbox">{feedback.message}</div>
              {feedback.person === credential.fullname ? (
                <div className="flex items-center justify-end">
                  <div className="flex gap-2" aria-label="action">
                    <button
                      onClick={() =>
                        handleModalEdit(feedback.id, feedback.message, "show")
                      }
                      className="text-lg lg:text-xl bg-blue-300 rounded-md p-2 text-white"
                    >
                      <LuEdit2 />
                    </button>
                    <button
                      onClick={() =>
                        handleModalDelete(feedback.id, feedback.person, "show")
                      }
                      className="text-lg lg:text-xl bg-red-300 rounded-md p-2 text-white"
                    >
                      <CgTrashEmpty />
                    </button>
                  </div>
                </div>
              ) : null}
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

import { AiFillEdit } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db_firestore } from "@/configs/firebase";
import { useState } from "react";
import { Loading } from "@/components/loading";
import { useNavigate } from "react-router-dom";

export const Detail = () => {
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);

  const handleCreateAnnouncement = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const currentValue = e.target as HTMLInputElement & { value: string }[];

    const message = currentValue[0].value;

    try {
      setLoading(true);
      await addDoc(collection(db_firestore, "announcement"), {
        message: message,
        create_at: Date.now(),
      }).then(async (data) => {
        await updateDoc(doc(db_firestore, "announcement", data.id), {
          id: data.id,
        });
        setLoading(false);
        navigate("/onboarding?tab=announcement");
      });
    } catch (error) {
      setLoading(false);
      throw new Error(error as string);
    }
  };

  const handleCreateFeedback = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const currentValue = e.target as HTMLInputElement & { value: string }[];

    const message = currentValue[0].value;

    try {
      setLoading(true);
      await addDoc(collection(db_firestore, "feedback"), {
        message: message,
        create_at: Date.now(),
      }).then(async (data) => {
        await updateDoc(doc(db_firestore, "feedback", data.id), {
          id: data.id,
        });
        setLoading(false);
        navigate("/feedback");
      });
    } catch (error) {
      setLoading(false);
      throw new Error(error as string);
    }
  };

  return (
    <>
      {isLoading ? <Loading /> : null}
      <div>
        <div
          className="h-40 rounded-lg rounded-t-[40px] relative"
          aria-label="banner"
        >
          <div
            className="h-20 w-20 rounded-full flex justify-center items-center absolute left-6 md:left-10 lg:left-12 -bottom-5 md:bottom-5 lg:-bottom-10"
            aria-label="avatar"
          >
            <div className="text-[5rem] md:text-[7rem] lg:text-[8rem] bg-blue-300 rounded-full text-white">
              <BsPersonCircle />
            </div>
          </div>
        </div>
        <div className="mt-7 md:mt-5 flex flex-col gap-4 lg:ml-44">
          <div className="flex flex-col w-full gap-1">
            <p className="text-sm md:text-lg font-light ">username</p>
            <div className="w-full bg-gray-100 px-3 py-3 text-lg rounded-md">
              hendrialqori
            </div>
          </div>
          <div className="flex flex-col w-full gap-1">
            <p className="text-sm md:text-lg font-light ">Password</p>
            <div className="w-full bg-gray-100 px-3 py-3 text-lg rounded-md">
              **********
            </div>
          </div>

          <button className="text-2xl lg:text-3xl bg-gray-500 rounded-md p-2 text-white w-max ml-auto mr-0">
            <AiFillEdit />
          </button>

          <div className="mt-5">

          {/* Pengumuman */}
          <form
            onSubmit={handleCreateAnnouncement}
            className="flex flex-col mt-6"
          >
            <label htmlFor="announ">Buat Pengumumam</label>
            <textarea
              className="border-none bg-gray-100 rounded-md p-4 my-2"
              id="announ"
              required
            />
            <button className="roundd-md p-2 bg-gray-200">Simpan</button>
          </form>

          {/* feedback */}
          <form onSubmit={handleCreateFeedback} className="flex flex-col mt-6">
            <label htmlFor="feedback">Tulis feedback</label>
            <textarea
              className="border-none bg-gray-100 rounded-md p-4 my-2"
              id="feedback"
              required
            />
            <button className="roundd-md p-2 bg-gray-200">Simpan</button>
          </form>
          </div>

        </div>
      </div>
    </>
  );
};

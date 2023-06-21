import { AiFillEdit } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db_firestore } from "@/configs/firebase";
import { useState } from "react";
import { Loading } from "@/components/loading";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userCredential } from "@/store";
import dayjs from "dayjs";

export const Detail = () => {
  const navigate = useNavigate();

  const credential = useRecoilValue(userCredential);

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
        person: credential.fullname,
        creator_id: credential.username,
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
        {/* <div
          className="h-40 rounded-lg rounded-t-[40px] relative"
          aria-label="banner"
        >
          <div
            className="h-20 w-20 rounded-full flex justify-center items-center absolute left-6 md:left-10 lg:left-12 bottom-5 lg:-bottom-10"
            aria-label="avatar"
          >
            <div className="text-[5rem] md:text-[7rem] lg:text-[8rem] bg-blue-300 rounded-full text-white" aria-label="banner">
              <BsPersonCircle />
            </div>
          </div>
        </div> */}
        <div className="mt-7 md:mt-10 flex flex-col gap-4">
          <div className="grid grid-cols-8 gap-x-2 gap-y-7">
            <div className="col-span-4 lg:col-span-2 flex flex-col gap-1 items-center">
              <div className="bg-gray-200 rounded-md w-max px-2 text-xs lg:text-base font-light">
                Nama Lengkap
              </div>
              <div className="text-sm md:text-lg ml-2 dark:text-gray-300">
                {credential.fullname}
              </div>
            </div>
            <div className="col-span-4 lg:col-span-2 flex flex-col gap-1 items-center">
              <div className="bg-gray-200 rounded-md w-max px-2 text-xs lg:text-base font-light">
                Username
              </div>
              <div className="text-sm md:text-lg ml-2 dark:text-gray-300">
                {credential.username}
              </div>
            </div>
            <div className="col-span-4 lg:col-span-2 flex flex-col gap-1 items-center">
              <div className="bg-gray-200 rounded-md w-max px-2 text-xs lg:text-base font-light">
                Email
              </div>
              <div className="text-sm md:text-lg ml-2 dark:text-gray-300">
                {credential?.email?.length! < 25
                  ? credential.email
                  : credential.email?.replace("@gmail.com", "") + "..."}
              </div>
            </div>
            <div className="col-span-4 lg:col-span-2 flex flex-col gap-1 items-center">
              <div className="bg-gray-200 rounded-md w-max px-2 text-xs lg:text-base font-light">
                Role
              </div>
              <div className="text-sm md:text-lg ml-2 dark:text-gray-300">
                {credential.role}
              </div>
            </div>
            <div className="col-span-4 lg:col-span-2 flex flex-col gap-1 items-center">
              <div className="bg-gray-200 rounded-md w-max px-2 text-xs lg:text-base font-light">
                Password
              </div>
              <div className="text-sm md:text-lg ml-2 dark:text-gray-300">
                {credential.password}
              </div>
            </div>
            <div className="col-span-4 lg:col-span-2 flex flex-col gap-1 items-center">
              <div className="bg-gray-200 rounded-md w-max px-2 text-xs lg:text-base font-light">
                Dibuat pada
              </div>
              <div className="text-sm md:text-lg ml-2 dark:text-gray-300">
                {!credential.create_at
                  ? "-"
                  : dayjs(credential.create_at).format("DD, MMM YYYY")}
              </div>
            </div>
            <div className="col-span-8 md:col-span-4 lg:col-span-2 flex justify-center gap-1 items-center mt-4">
              <p className="text-gray-600 text-sm">Login with</p>
              {credential.authThrough === "firebase" ? (
                <div className="flex items-center bg-gray-100 px-2 rounded-md py-1">
                  <img
                    className="h-9 w-9"
                    src="/firebase.svg"
                    alt="firebase-icon"
                  />
                  <p className="text-sm">Firebase Auth</p>
                </div>
              ) : (
                <div className="flex items-center bg-gray-100 px-2 rounded-md py-1">
                  <img
                    className="h-9 w-9"
                    src="/google.svg"
                    alt="firebase-icon"
                  />
                  <p className="text-sm">Google Auth</p>
                </div>
              )}
            </div>
            {/* <div className="col-span-4 lg:col-span-2 flex flex-col gap-1 items-center">
              <div className="bg-gray-200 rounded-md w-max px-2 text-xs lg:text-base font-light">
                edit profile
              </div>
              <button className="text-2xl lg:text-3xl bg-blue-300 mt-auto mb-0 rounded-md p-1 w-max h-max text-white">
                <AiFillEdit />
              </button>
            </div> */}
          </div>

          <div className="mt-5">
            {/* Pengumuman */}
            {credential.role === "superadmin" ? (
              <form
                onSubmit={handleCreateAnnouncement}
                className="flex flex-col mt-6 w-full lg:w-10/12 mx-auto"
              >
                <label
                  htmlFor="announ"
                  className="dark:text-gray-200 font-light"
                >
                  Buat Pengumumam
                </label>
                <textarea
                  className="border-none bg-gray-100 rounded-xl p-4 my-2 focus:ring-2"
                  id="announ"
                  rows={7}
                  required
                />
                <button
                  type="submit"
                  className="text-white px-4 lg:px-6 py-2 lg:py-3 rounded-xl bg-blue-400 w-max mr-0 ml-auto"
                >
                  Simpan
                </button>
              </form>
            ) : null}

            {/* feedback */}
            {credential.role !== "superadmin" ? (
              <form
                onSubmit={handleCreateFeedback}
                className="flex flex-col mt-6 w-full lg:w-10/12 mx-auto"
              >
                <label
                  htmlFor="feedback"
                  className="dark:text-gray-300 font-light"
                >
                  Tulis Feedback
                </label>
                <textarea
                  className="border-none bg-gray-100 rounded-xl p-4 my-2 focus:ring-2"
                  id="feedback"
                  rows={7}
                  required
                />
                <button
                  type="submit"
                  className="text-white px-4 lg:px-6 py-2 lg:py-3 rounded-xl bg-blue-400 w-max mr-0 ml-auto"
                >
                  Simpan
                </button>
              </form>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

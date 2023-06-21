import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { Loading } from "@/components/loading";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db_firestore } from "@/configs/firebase";
import { useNavigate } from "react-router-dom";
import { userCredential } from "@/store";
import { useRecoilValue } from "recoil";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineUser, AiOutlineFileText } from "react-icons/ai";
import { BsCalendarDate, BsGenderAmbiguous } from "react-icons/bs";
import { TbSchool } from "react-icons/tb";
import { FaRegAddressCard } from "react-icons/fa";

type Form = {
  fullname: string;
  dob: string;
  origin_school: string;
  address: string;
  gender: "male" | "female";
  score_test: number;
  quotes: string;
};

export default function FormPendaftaran() {
  const UUID = (uuidv4() as any).replaceAll("-", "").slice(0, 15);

  const credential = useRecoilValue(userCredential);

  const { register, handleSubmit: submit, setValue } = useForm<Form>();

  const [query] = useSearchParams();

  const isEdit = query.get("isEdit");
  const idEdit = query.get("idEdit");

  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        // data edit
        if (isEdit) {
          setLoading(true);
          const docRef = doc(db_firestore, "registers-list", idEdit!);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const {
              fullname,
              dob,
              origin_school,
              address,
              gender,
              quotes,
              score_test,
            } = docSnap.data() as Form;

            console.log("snap data", score_test);

            setValue("score_test", score_test);
            setValue("fullname", fullname);
            setValue("dob", dob);
            setValue("origin_school", origin_school);
            setValue("address", address);
            setValue("gender", gender);
            setValue("quotes", quotes);

            setLoading(false);
          } else {
            setLoading(false);
            console.warn("No such document!");
          }
        }
      } catch (error) {
        setLoading(false);
        throw new Error(error as string);
      }
    })();
  }, []);

  const handleSubmit = submit(async (data) => {
    console.log(data);

    setLoading(true);
    try {
      if (!!isEdit) {
        await updateDoc(doc(db_firestore, "registers-list", idEdit!), {
          id: idEdit,
          fullname: data.fullname,
          dob: data.dob,
          gender: data.gender,
          score_test: Number(data.score_test),
          origin_school: data.origin_school,
          address: data.address,
          quotes: data.quotes,
        });
      } else {
        await setDoc(doc(db_firestore, "registers-list", UUID), {
          id: UUID,
          fullname: data.fullname,
          dob: data.dob,
          gender: data.gender,
          score_test: Number(data.score_test),
          origin_school: data.origin_school,
          address: data.address,
          quotes: data.quotes,
          creator_id: credential.username,
        });
      }

      setLoading(false);
      navigate("/list-pendaftar");
    } catch (error) {
      setLoading(false);
      throw new Error(error as string);
    }
  });

  return (
    <>
      {isLoading ? <Loading /> : null}
      <div className="text-center py-5">
        <h2 className="text-lg lg:text-2xl font-semibold tracking-wide">
          FORM PENDAFTARAN
        </h2>
        <span className="text-sm font-light">
          Siswa/siswi hanya dapat membuat 1 data pendaftaran
        </span>
      </div>

      <div className="rounded-md p-1 lg:p-2 font-normal lg:font-semibold tracking-wide bg-blue-100 text-blue-600 w-max mx-auto text-sm">
        {isEdit && isEdit ? "Update mode" : "Create mode"}
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full mt-5 flex flex-col gap-6 lg:gap-4"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="col-span-2 flex h-10 lg:h-14">
            <label
              htmlFor="fullname"
              className="flex flex-col items-center justify-center bg-blue-400 rounded-l-md w-1/12"
            >
              <AiOutlineUser className="text-white text-sm lg:text-2xl" />
            </label>
            <input
              id="fullname"
              type="text"
              className="font-light text-base lg:text-lg w-full rounded-r-md border-none shadow-sm focus:ring-0 bg-gray-100 focus:border-none"
              placeholder="Nama Lengkap"
              required
              {...register("fullname")}
            />
          </div>
          <div className="col-span-2 flex h-10 lg:h-14">
            <label
              htmlFor="dob"
              className="flex flex-col items-center justify-center bg-blue-400 rounded-l-md w-1/12"
            >
              <BsCalendarDate className="text-white text-sm lg:text-2xl" />
            </label>
            <input
              id="dob"
              type="text"
              className="font-light text-base lg:text-lg w-full rounded-r-md border-none shadow-sm focus:ring-0 bg-gray-100 focus:border-none"
              placeholder="Tempat, tanggal lahir | cth: Jakarta, 12 Mei 2000"
              required
              {...register("dob")}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="col-span-2 flex h-10 lg:h-14">
            <label
              htmlFor="origin_school"
              className="flex flex-col items-center justify-center bg-blue-400 rounded-l-md w-1/12"
            >
              <TbSchool className="text-white text-sm lg:text-2xl" />
            </label>
            <input
              id="origin_school"
              type="text"
              className="font-light text-base lg:text-lg w-full rounded-r-md border-none shadow-sm focus:ring-0 bg-gray-100 focus:border-none"
              placeholder="Sekolah asal"
              required
              {...register("origin_school")}
            />
          </div>
          <div className="col-span-2 flex h-10 lg:h-14">
            <label
              htmlFor="address"
              className="flex flex-col items-center justify-center bg-blue-400 rounded-l-md w-1/12"
            >
              <FaRegAddressCard className="text-white text-sm lg:text-2xl" />
            </label>
            <input
              id="address"
              type="text"
              className="font-light text-base lg:text-lg w-full rounded-r-md border-none shadow-sm focus:ring-0 bg-gray-100 focus:border-none"
              placeholder="Alamat"
              required
              {...register("address")}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="col-span-2 flex h-10 lg:h-14">
            <label
              htmlFor="gender"
              className="flex flex-col items-center justify-center bg-blue-400 rounded-l-md w-1/12"
            >
              <BsGenderAmbiguous className="text-white text-sm lg:text-2xl" />
            </label>
            <select
              id="gender"
              className="font-light text-base lg:text-lg w-full rounded-r-md border-none shadow-sm focus:ring-0 bg-gray-100 focus:border-none"
              {...register("gender")}
            >
              <option value="male">Laki laki</option>
              <option value="female">Perempuan</option>
            </select>
          </div>
          <div className="col-span-2 flex h-10 lg:h-14">
            <label
              htmlFor="score"
              className="flex flex-col items-center justify-center bg-blue-400 rounded-l-md w-1/12"
            >
              <AiOutlineFileText className="text-white text-sm lg:text-2xl" />
            </label>
            <input
              id="score"
              type="number"
              className="font-light text-base lg:text-lg w-full rounded-r-md border-none shadow-sm focus:ring-0 bg-gray-100 focus:border-none"
              placeholder="Nilai ujian"
              required
              {...register("score_test")}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="col-span-4 flex flex-col gap-2">
            <textarea
              className="font-light text-base lg:text-lg w-full rounded-r-md border-none shadow-sm focus:ring-0 bg-gray-100 focus:border-none"
              {...register("quotes")}
              rows={6}
              placeholder="Quotes"
            />
          </div>
        </div>
        <button
          className="bg-blue-400 hover:bg-blue-300 py-2 lg:py-4 rounded-lg text-white w-max px-2 lg:px-3"
          type="submit"
        >
          Simpan
        </button>
      </form>
    </>
  );
}

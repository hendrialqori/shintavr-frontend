import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { Loading } from "@/components/loading";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db_firestore } from "@/configs/firebase";
import { useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { BsCalendarDate, BsGenderAmbiguous } from "react-icons/bs";
import { TbSchool } from "react-icons/tb";
import { FaRegAddressCard } from "react-icons/fa";
import { useCredential } from "@/hooks/useCredential";
import { UUID } from "@/utils/uuid";
import { Input } from "@/components/input";

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
  const { credential } = useCredential();

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
    setLoading(true);
    try {
      if (isEdit) {
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
            <Input
              id="fullname"
              required
              placeholder="Nama Lengkap"
              {...register("fullname")}
              renderIcon={() => (
                <AiOutlineUser className="text-white text-sm lg:text-2xl" />
              )}
            />
          </div>
          <div className="col-span-2 flex h-10 lg:h-14">
            <Input
              id="dob"
              required
              placeholder="Tempat, tanggal lahir | cth: Jakarta, 12 Mei 2000"
              {...register("dob")}
              renderIcon={() => (
                <BsCalendarDate className="text-white text-sm lg:text-2xl" />
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="col-span-2 flex h-10 lg:h-14">
            <Input
              id="origin_school"
              required
              placeholder="Sekolah asal"
              {...register("origin_school")}
              renderIcon={() => (
                <TbSchool className="text-white text-sm lg:text-2xl" />
              )}
            />
          </div>
          <div className="col-span-2 flex h-10 lg:h-14">
            <Input
              id="address"
              required
              placeholder="Alamat"
              {...register("address")}
              renderIcon={() => (
                <FaRegAddressCard className="text-white text-sm lg:text-2xl" />
              )}
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
              className="font-light text-base lg:text-lg w-full rounded-r-md border-none shadow-sm focus:ring-0 bg-gray-100 foucs:bg-white focus:border-none"
              {...register("gender")}
            >
              <option value="male">Laki laki</option>
              <option value="female">Perempuan</option>
            </select>
          </div>
          <div className="col-span-2 flex h-10 lg:h-14">
            <Input
              id="score"
              required
              type="number"
              min={10}
              max={100}
              placeholder="Nilai Ujian"
              {...register("score_test")}
              renderIcon={() => (
                <FaRegAddressCard className="text-white text-sm lg:text-2xl" />
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="col-span-4 flex flex-col gap-2">
            <textarea
              className="font-light text-base lg:text-lg w-full rounded-r-md border-none shadow-sm focus:ring-0 focus:bg-white bg-gray-100 focus:border-none"
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

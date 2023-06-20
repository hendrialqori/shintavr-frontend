import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { Loading } from "@/components/loading";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db_firestore } from "@/configs/firebase";
import { useNavigate } from "react-router-dom";
import { userCredential } from "@/store";
import { useRecoilValue } from "recoil";
import { v4 as uuidv4 } from 'uuid';

type Form = {
  fullname: string;
  dob: string;
  origin_school: string;
  address: string;
  gender: "male" | "female";
  quotes: string;
};

export default function FormPendaftaran() {

  const UUID = (uuidv4() as any).replaceAll('-', '').slice(0, 15)

  const credential = useRecoilValue(userCredential)

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
            const { fullname, dob, origin_school, address, gender, quotes } =
              docSnap.data() as Form;
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
      if (!!isEdit) {
        await updateDoc(doc(db_firestore, "registers-list", idEdit!), {
          id: idEdit,
          fullname: data.fullname,
          dob: data.dob,
          gender: data.gender,
          origin_school: data.origin_school,
          address: data.address,
          quotes: data.quotes,
        });
      } else {
        await setDoc(
          doc(
            db_firestore,
            "registers-list",
            UUID
          ),
          {
            id: UUID,
            fullname: data.fullname,
            dob: data.dob,
            gender: data.gender,
            origin_school: data.origin_school,
            address: data.address,
            quotes: data.quotes,
            creator_id: credential.username
          }
        );
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
      <h2 className="text-lg font-semibold">Form Pendaftaran</h2>
      <form
        onSubmit={handleSubmit}
        className="w-full mt-5 flex flex-col gap-6 lg:gap-4"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="col-span-2 flex flex-col gap-2">
            <label htmlFor="nama-lengkap">Nama lengkap</label>
            <input
              className="border-none p-5 bg-gray-100 rounded-lg"
              type="text"
              {...register("fullname")}
              required
            />
          </div>
          <div className="col-span-2 flex flex-col gap-2">
            <label htmlFor="nama-lengkap">Tempat, tanggal lahir</label>
            <input
              className="border-none p-5 bg-gray-100 rounded-lg"
              type="text"
              placeholder="cth : Jakarta, 12 Mei 1990"
              {...register("dob")}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="col-span-2 flex flex-col gap-2">
            <label htmlFor="nama-lengkap">Asal Sekolah</label>
            <input
              className="border-none p-5 bg-gray-100 rounded-lg"
              type="text"
              {...register("origin_school")}
              required
            />
          </div>
          <div className="col-span-2 flex flex-col gap-2">
            <label htmlFor="nama-lengkap">Alamat</label>
            <input
              className="border-none p-5 bg-gray-100 rounded-lg"
              type="text"
              {...register("address")}
              required
            />
          </div>
        </div>
        <div className="col-span-2 my-2">
          <div>Gender</div>
          <div className="flex items-center gap-4 mt-1">
            <div className="flex gap-2 items-center">
              <label htmlFor="male">Laki-laki</label>
              <input
                id="male"
                type="radio"
                value="male"
                {...register("gender")}
              />
            </div>
            <div className="flex gap-2 items-center">
              <label htmlFor="female">Perempuan</label>
              <input
                id="female"
                type="radio"
                value="female"
                {...register("gender")}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="col-span-4 flex flex-col gap-2">
            <label htmlFor="nama-lengkap">Quotes</label>
            <textarea
              className="border-none p-5 bg-gray-100 rounded-lg"
              {...register("quotes")}
            />
          </div>
        </div>
        <button
          className="bg-blue-400 hover:bg-blue-300 py-4 rounded-lg text-white"
          type="submit"
        >
          Simpan
        </button>
      </form>
    </>
  );
}

import { useEffect, useMemo, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { BerkasDelete } from "./berkasDelete";
import { useNavigate } from "react-router-dom";
import { Loading } from "@/components/loading";
import { onSnapshot, collection } from "firebase/firestore";
import { db_firestore } from "@/configs/firebase";
import { Register } from "@/types";

export default function ListPendaftar() {
  const thead = useMemo(() => {
    return [
      {
        title: "Name Lengkap",
        className:
          "bg-gray-100 rounded-md p-2 text-sm lg:text-lg font-light text-center",
      },
      {
        title: "Tempat, tanggal lahir",
        className:
          "bg-gray-100 rounded-md p-2 text-sm lg:text-lg font-light text-center col-span-2",
      },
      {
        title: "Asal Sekolah",
        className:
          "bg-gray-100 rounded-md p-2 text-sm lg:text-lg font-light text-center",
      },
      {
        title: "Alamat",
        className:
          "bg-gray-100 rounded-md p-2 text-sm lg:text-lg font-light text-center",
      },
      {
        title: "Action",
        className:
          "bg-gray-100 rounded-md p-2 text-sm lg:text-lg font-light text-center",
      },
    ];
  }, []);

  const navigate = useNavigate();

  const [listRegister, setListRegister] = useState<Register[]>([]);

  const [loadingBeforeEdit, setLoadingBeforeEdit] = useState(false);

  const [isLoading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db_firestore, "registers-list"),
      (snapshot) => {
        const dataMapping = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
          };
        }) as unknown as Register[];

        setListRegister(dataMapping);
      },
      (error) => {
        throw new Error(error.message);
      }
    );

    return () => unSubscribe();
  }, []);

  const [isDelete, setDelete] = useState({
    id: "",
    name: "",
    openModal: false,
  });

  const handleEdit = (id: string) => () => {
    setLoadingBeforeEdit(true);

    setTimeout(() => {
      navigate(`/formulir?isEdit=true&idEdit=${id}`);
    }, 1500);
  };

  const handleModalDelete = (
    id: string = "",
    name: string,
    type: "show" | "close"
  ) => {
    if (type === "show") {
      setDelete({
        id: id,
        name: name,
        openModal: true,
      });
    } else {
      setDelete({
        id: "",
        name: "",
        openModal: false,
      });
    }
  };

  const registersMemoize = useMemo(() => {
    return listRegister.filter((data) => data.fullname.toLowerCase().includes(search));
  }, [search, listRegister]);

  return (
    <>
      {loadingBeforeEdit ? <Loading /> : null}
      {isLoading ? <Loading /> : null}
      <h2 className="text-lg font-semibold">List Pendaftar</h2>
      <div
        className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-3 mt-5"
        aria-label=""
      >
        <div className="col-span-2 bg-blue-100 text-gray-700 rounded-md p-7">
          <h2 className="font-semibold tracking-wide">Siswa Terdaftar</h2>
          <p className="text-[3rem] font-bold">{listRegister?.length}</p>
        </div>
        <div className="col-span-2 bg-green-100 text-gray-700 rounded-md p-7">
          <h2 className="font-semibold tracking-wide">Nilai ujian Tertinggi</h2>
          <p className="text-[3rem] font-bold">90.1</p>
        </div>
        <div className="col-span-2 bg-pink-100 text-gray-700 rounded-md p-7">
          <h2 className="font-semibold tracking-wide">
            Asal Sekolah terbanyak
          </h2>
          <div className="flex gap-1">
            <p className="text-[3rem] font-bold">50</p>
            <p className="text-xs font-semibold mt-auto mb-4">SMP 1 Landak</p>
          </div>
        </div>
        <div className="col-span-2 bg-red-100 text-gray-700 rounded-md p-7">
          <h2 className="font-semibold tracking-wide">Gender terbanyak</h2>
          <div className="flex gap-1">
            <p className="text-[3rem] font-bold">49</p>
            <p className="text-xs font-semibold mt-auto mb-4">Laki-laki</p>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          className="font-light text-md lg:text-lg border-none bg-gray-100 rounded-md p-3"
          placeholder="cari pendaftar"
        />
      </div>

      {/* tab and laptop version */}
      <div className="mt-4 hidden md:block" role="table">
        <div className="grid grid-cols-6 gap-1" aria-label="table-head">
          {thead.map((row, i) => (
            <div key={i} className={row.className}>
              {row.title}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-1 mt-3" aria-label="table-data">
          {registersMemoize?.map((register, i) => (
            <div
              key={i}
              className="grid grid-cols-6 gap-1"
              aria-label="table-head"
            >
              <div className="rounded-md p-2 text-sm lg:text-lg font-light text-center">
                {register.fullname}
              </div>
              <div className="rounded-md p-2 text-sm lg:text-lg font-light text-center col-span-2">
                {register.dob}
              </div>
              <div className="rounded-md p-2 text-sm lg:text-lg font-light text-center">
                {register.origin_school}
              </div>
              <div className="rounded-md p-2 text-sm lg:text-lg font-light text-center">
                {register.address}
              </div>
              <div className="rounded-md p-2 text-sm lg:text-lg font-light text-center flex gap-8 justify-center">
                <button
                  onClick={handleEdit(register.id)}
                  className="text-2xl lg:text-3xl"
                >
                  <AiFillEdit />
                </button>
                <button
                  onClick={() =>
                    handleModalDelete(register.id, register.fullname, "show")
                  }
                  className="text-2xl lg:text-3xl"
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* phone version */}
      <div className="flex flex-col gap-4 md:hidden mt-4">
        {registersMemoize.map((register, i) => (
          <div
            key={i}
            className="bg-gray-100 p-5 w-full flex flex-col gap-3"
            aria-label="card"
          >
            <div className="">
              <div className="text-xs">Nama lengkap</div>
              <h1 className="text-lg font-semibold">{register.fullname}</h1>
            </div>
            <div className="">
              <div className="text-xs">Tempat, tanggal lahir</div>
              <h1 className="text-lg font-semibold">{register.dob}</h1>
            </div>
            <div className="">
              <div className="text-xs">Asal Sekolah</div>
              <h1 className="text-lg font-semibold">
                {register.origin_school}
              </h1>
            </div>
            <div className="">
              <div className="text-xs">Alamat</div>
              <h1 className="text-lg font-semibold">{register.address}</h1>
            </div>
            <div className="flex gap-4 dis" aria-label="action">
              <button
                onClick={handleEdit(register.id)}
                className="text-2xl lg:text-3xl bg-gray-500 rounded-md p-2 text-white"
              >
                <AiFillEdit />
              </button>
              <button
                onClick={() =>
                  handleModalDelete(register.id, register.fullname, "show")
                }
                className="text-2xl lg:text-3xl bg-gray-500 rounded-md p-2 text-white"
              >
                <AiFillDelete />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isDelete.openModal ? (
        <BerkasDelete
          id={isDelete.id}
          name={isDelete.name}
          closeModal={() => handleModalDelete("", "", "close")}
          setLoading={setLoading}
        />
      ) : null}
    </>
  );
}

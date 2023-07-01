import { useEffect, useMemo, useState } from "react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { BerkasDelete } from "./berkasDelete";
import { useNavigate } from "react-router-dom";
import { Loading } from "@/components/loading";
import { onSnapshot, collection } from "firebase/firestore";
import { db_firestore } from "@/configs/firebase";
import { Register } from "@/types";
import { useRecoilValue } from "recoil";
import { userCredential } from "@/store";
import { CgTrashEmpty } from "react-icons/cg";
import { LuEdit2 } from "react-icons/lu";
import { BiSearch } from "react-icons/bi";

export default function ListPendaftar() {
  const thead = useMemo(() => {
    return [
      {
        title: "Name Lengkap",
        className:
          "bg-white text-gray-400 font-semibold dark:bg-dark2 dark:text-white rounded-md p-2 text-sm lg:text-base font-light text-center",
      },
      {
        title: "Tempat, tanggal lahir",
        className:
          "bg-white text-gray-400 font-semibold dark:bg-dark2 dark:text-white rounded-md p-2 text-sm lg:text-base font-light text-center col-span-2",
      },
      {
        title: "Asal Sekolah",
        className:
          "bg-white text-gray-400 font-semibold dark:bg-dark2 dark:text-white rounded-md p-2 text-sm lg:text-base font-light text-center",
      },
      {
        title: "Alamat",
        className:
          "bg-white text-gray-400 font-semibold dark:bg-dark2 dark:text-white rounded-md p-2 text-sm lg:text-base font-light text-center",
      },
      {
        title: "Action",
        className:
          "bg-white text-gray-400 font-semibold dark:bg-dark2 dark:text-white rounded-md p-2 text-sm lg:text-base font-light text-center",
      },
    ];
  }, []);

  const credential = useRecoilValue(userCredential);

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
    id = "",
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
    return listRegister.filter((data) =>
      data.fullname.toLowerCase().includes(search)
    );
  }, [search, listRegister]);

  return (
    <>
      {loadingBeforeEdit ? <Loading /> : null}
      {isLoading ? <Loading /> : null}
      <div className="text-center py-5">
        <h2 className="text-lg lg:text-2xl font-semibold tracking-wide">
          LIST PENDAFTAR
        </h2>
        <span className="text-sm font-light">
          Berisi list siswa/siswi yang mendaftar sendiri atau di daftarkan oleh
          guru
        </span>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-3 mt-5"
        aria-label=""
      >
        <div className="col-span-2 bg-blue-100 dark:bg-blue-300 text-gray-700 rounded-md p-7">
          <h2 className="font-semibold tracking-wide">Siswa Terdaftar</h2>
          <p className="text-[3rem] font-bold">{listRegister?.length}</p>
        </div>
        <div className="col-span-2 bg-green-100 dark:bg-yellow-300 text-gray-700 rounded-md p-7">
          <h2 className="font-semibold tracking-wide">
            Nilai ujian tertinggi
          </h2>
          <div className="flex gap-1">
            <p className="text-[3rem] font-bold">91</p>
            <p className="text-xs font-semibold mt-auto mb-4">Hendri Alqori</p>
          </div>
        </div>
        <div className="col-span-2 bg-pink-100 dark:bg-yellow-300 text-gray-700 rounded-md p-7">
          <h2 className="font-semibold tracking-wide">
            Asal Sekolah terbanyak
          </h2>
          <div className="flex gap-1">
            <p className="text-[3rem] font-bold">50</p>
            <p className="text-xs font-semibold mt-auto mb-4">SMP 1 Landak</p>
          </div>
        </div>
        <div className="col-span-2 bg-red-100 dark:bg-red-300 text-gray-700 rounded-md p-7">
          <h2 className="font-semibold tracking-wide">Gender terbanyak</h2>
          <div className="flex gap-1">
            <p className="text-[3rem] font-bold">49</p>
            <p className="text-xs font-semibold mt-auto mb-4">Laki-laki</p>
          </div>
        </div>
      </div>

      {/* tab and laptop version */}
      <div
        className="my-4 hidden md:block bg-white rounded-lg shadow-md py-5"
        role="table"
      >
        {/* Input search */}
        <div className="mx-4 mb-5 flex items-center">
          <div className="bg-gray-200 text-gray-800 py-3 px-5 rounded-l-lg">
            <BiSearch className="text-2xl" />
          </div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            className={`text-md border-none bg-gray-100 focus:ring-2 focus:ring-blue-600 focus:bg-white p-3 w-full placeholder:text-center ${
              credential.role !== "teacher" ? "rounded-r-lg" : null
            }`}
            placeholder="Cari nama pendaftar"
          />
          {credential.role === "teacher" ? (
            <button
              onClick={() => navigate("/formulir")}
              className="bg-blue-400 py-3 px-5 rounded-r-lg text-white font-semibold"
            >
              Tambah
            </button>
          ) : null}
        </div>

        {/* Table Head */}
        <div className="grid grid-cols-6 gap-1" aria-label="table-head">
          {thead.map((row, i) => (
            <div key={i} className={row.className}>
              {row.title}
            </div>
          ))}
        </div>

        {/* Table Body */}
        <div className="flex flex-col gap-1 mt-3" aria-label="table-data">
          {registersMemoize?.map((register, i) => (
            <div
              key={i}
              className="grid items-center grid-cols-6 gap-1 border-b border-gray-100 dark:border-dark2 h-max"
              aria-label="table-body"
            >
              <div className="dark:text-gray-100 rounded-md p-2 text-sm lg:text-base text-center">
                {register.fullname}
              </div>
              <div className="dark:text-gray-100 rounded-md p-2 text-sm lg:text-base font-light text-center col-span-2">
                {register.dob}
              </div>
              <div className="dark:text-gray-100 rounded-md p-2 text-sm lg:text-base font-light text-center">
                {register.origin_school}
              </div>
              <div className="dark:text-gray-100 rounded-md p-2 text-sm lg:text-base font-light text-center">
                {register.address}
              </div>
              <div className="dark:text-gray-100 rounded-md p-2 text-sm lg:text-base font-light text-center flex gap-5 justify-center">
                {/* edit permission */}
                {/* all teacher can edit and delete */}
                {/* user creator can edit */}
                {credential.role === "teacher" ? (
                  <button
                    onClick={handleEdit(register.id)}
                    className="text-xl lg:text-2xl"
                  >
                    <LuEdit2 />
                  </button>
                ) : null}

                {(credential.role === "student" &&
                  credential.username === register.creator_id) ||
                credential.email === register.creator_id ? (
                  <button
                    onClick={handleEdit(register.id)}
                    className="text-xl lg:text-2xl"
                  >
                    <LuEdit2 />
                  </button>
                ) : null}

                {/* all teacher can edit and delete */}
                {credential.role === "teacher" ? (
                  <button
                    onClick={() =>
                      handleModalDelete(register.id, register.fullname, "show")
                    }
                    className="text-2xl lg:text-3xl"
                  >
                    <CgTrashEmpty />
                  </button>
                ) : null}

                {credential.role === "superadmin" ? (
                  <div className="text-xs lg:text-sm bg-gray-100 h-max p-1 rounded-md tracking-wide">
                    You don't have permission here
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div
          className="flex items-center gap-3 justify-end mt-10 mr-4"
          aria-label="pagination"
        >
          {/* show per row */}
          <div className="flex items-center gap-3 text-sm">
            <p> Rows per page</p>
            <select className="border-gray-100 outline-none bg-gray-100 rounded-lg">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">10</option>
            </select>
          </div>

          {/* button move page */}
          <div className="flex items-center gap-3">
            <button className="p-2 dark:bg-dark2 text-black dark:text-white  active:bg-gray-300 rounded-md text-lg">
              <AiOutlineDoubleLeft />
            </button>
            <p className="dark:text-white text-sm">1 of 2 page</p>
            <button className="p-2 dark:bg-dark2 text-black dark:text-white  active:bg-gray-300 rounded-md text-lg">
              <AiOutlineDoubleRight />
            </button>
          </div>
        </div>
      </div>

      {/* phone version */}
      <div className="flex flex-col gap-4 md:hidden mt-4">
        <div className="mt-8 flex items-center">
          <div className="bg-gray-200 text-gray-800 p-3 rounded-l-lg">
            <BiSearch className="text-2xl" />
          </div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            className={`text-md border-none bg-gray-100 focus:ring-2 focus:ring-blue-600 focus:bg-white p-3 w-full placeholder:text-center ${
              credential.role !== "teacher" ? "rounded-r-lg" : null
            }`}
            placeholder="Cari nama pendaftar"
          />
        </div>

        {/* card list registration */}
        {registersMemoize.map((register, i) => (
          <div
            key={i}
            className="dark:bg-gray-100 rounded-lg shadow-md p-5 w-full flex flex-col gap-3"
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
            <div className="flex gap-3 justify-end" aria-label="action">
              {/* edit permission */}
              {/* all teacher can edit and delete */}
              {/* user creator can edit */}
              {credential.role === "teacher" ? (
                <button
                  onClick={handleEdit(register.id)}
                  className="text-xl lg:text-2xl bg-gray-400 rounded-md p-2 text-white"
                >
                  <LuEdit2 />
                </button>
              ) : null}

              {credential.role === "student" &&
              credential.username === register.creator_id ? (
                <button
                  onClick={handleEdit(register.id)}
                  className="text-xl lg:text-2xl bg-gray-400 rounded-md p-2 text-white"
                >
                  <LuEdit2 />
                </button>
              ) : null}

              {/* all teacher can edit and delete */}
              {credential.role === "teacher" ? (
                <button
                  onClick={() =>
                    handleModalDelete(register.id, register.fullname, "show")
                  }
                  className="text-2xl lg:text-3xl bg-gray-400 rounded-md p-2 text-white"
                >
                  <CgTrashEmpty />
                </button>
              ) : null}
            </div>
          </div>
        ))}

        {/* pagination */}
        <div
          className="flex flex-col-reverse items-center gap-3 justify-center"
          aria-label="pagination"
        >
          {/* show per row */}
          <div className="flex items-center gap-3 text-sm">
            <p> Rows per page</p>
            <select className="border-gray-100 outline-none bg-gray-100 rounded-lg">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">10</option>
            </select>
          </div>

          {/* button move page */}
          <div className="flex items-center gap-3">
            <button className="p-2 dark:bg-dark2 text-black dark:text-white  active:bg-gray-300 rounded-md text-lg">
              <AiOutlineDoubleLeft />
            </button>
            <p className="dark:text-white text-sm">1 of 2 page</p>
            <button className="p-2 dark:bg-dark2 text-black dark:text-white  active:bg-gray-300 rounded-md text-lg">
              <AiOutlineDoubleRight />
            </button>
          </div>
        </div>
      </div>

      {/* <div
        className="mb-10 mt-7 flex items-center gap-3  justify-end"
        aria-label="pagination"
      >
        <button className="p-2 bg-gray-200 dark:bg-dark2 text-black/60 dark:text-white  active:bg-gray-300 rounded-md text-xl">
          <AiOutlineDoubleLeft />
        </button>
        <p className="dark:text-white">1 of 2</p>
        <button className="p-2 bg-gray-200 dark:bg-dark2 text-black/60 dark:text-white  active:bg-gray-300 rounded-md text-xl">
          <AiOutlineDoubleRight />
        </button>
      </div> */}

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

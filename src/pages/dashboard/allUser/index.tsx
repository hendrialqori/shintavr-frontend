import { useEffect, useMemo, useState } from "react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { UserDelete } from "./userDelete";
import { UserEdit } from "./userEdit";
import { db_firestore } from "@/configs/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { User } from "@/types";
import { Loading } from "@/components/loading";
import { useRecoilValue } from "recoil";
import { userCredential } from "@/store";
import { LuEdit2 } from "react-icons/lu";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { RoleBadge } from "@/components/roleBadge";

const initalValueUser = {
  id: "",
  name: "",
  permission: "",
  openModal: false,
};

export default function AllUser() {
  const thead = useMemo(() => {
    return [
      {
        title: "Name Lengkap",
        className:
          "bg-white text-gray-400 font-semibold dark:bg-dark2 dark:text-white rounded-md p-2 text-sm lg:text-base font-light text-center",
      },
      {
        title: "Permission",
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

  const [users, setUsers] = useState<User[]>([]);

  const [search, setSearch] = useState("");

  const [isDelete, setDelete] = useState(initalValueUser);

  const [isEdit, setEdit] = useState(initalValueUser);

  const [isLoading, setLoading] = useState(false);

  const usersMemoize = useMemo(() => {
    return users
      .filter((user) => user.role !== "superadmin")
      .filter((user) => user.fullname.toLowerCase().includes(search));
  }, [users, search]);

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db_firestore, "users"),
      (snapshot) => {
        const dataMapping = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
          };
        }) as unknown as User[];

        setUsers(dataMapping);
      },
      (error) => {
        throw new Error(error.message);
      }
    );

    return () => unSubscribe();
  }, []);

  const handleModalEdit = (
    id = "",
    name: string,
    permission: string,
    type: "show" | "close"
  ) => {
    if (type === "show") {
      setEdit({
        id: id,
        name: name,
        permission: permission,
        openModal: true,
      });
    } else {
      setEdit(initalValueUser);
    }
  };

  const handleModalDelete = (
    id = "",
    name: string,
    permission: string,
    type: "show" | "close"
  ) => {
    if (type === "show") {
      setDelete({
        id: id,
        name: name,
        permission: permission,
        openModal: true,
      });
    } else {
      setDelete(initalValueUser);
    }
  };

  return (
    <>
      {isLoading ? <Loading /> : null}
      <div className="text-center py-5">
        <h2 className="text-lg lg:text-2xl font-semibold tracking-wide">
          ALL USER & SETTING PERMISSION
        </h2>
        <span className="text-sm font-light">
          Terdapat 3 role, Superadmin, Teacher dan Student (Pendaftar)
        </span>
      </div>
      <div className="bg-blue-300 text-white rounded-xl p-7 w-full md:w-6/12 lg:w-2/12 mx-auto text-center">
        <h2 className="font-semibold tracking-wide">User Aktif</h2>
        <p className="text-[3rem] font-bold">{users?.length}</p>
      </div>

      {/* Tablet and Destop verion */}
      <div
        className="my-4 hidden md:block bg-white rounded-lg shadow-md py-5"
        role="table"
      >
        {/* search input */}
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
            placeholder="Cari nama user"
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

        {/* table head */}
        <div className="grid grid-cols-3 gap-1" aria-label="table-head">
          {thead.map((row, i) => (
            <div key={i} className={row.className}>
              {row.title}
            </div>
          ))}
        </div>

        {/* table data */}
        <div className="flex flex-col gap-1 mt-1" aria-label="table-data">
          {usersMemoize?.map((user, i) => (
            <div
              key={i}
              className="grid grid-cols-3 gap-1 items-center border-b border-gray-100 h-max"
              aria-label="table-head"
            >
              <div className="dark:text-gray-100 rounded-md p-2 text-sm lg:text-base text-center">
                {user.fullname}
              </div>
              <div className="dark:text-gray-100 rounded-md p-2 text-sm lg:text-base text-center">
                <RoleBadge role={user.role} />
              </div>
              <div className="rounded-md p-2 text-sm lg:text-lg font-light text-center flex gap-5 justify-center">
                {credential.role === "superadmin" ? (
                  user.role !== "superadmin" && (
                    <>
                      <button
                        onClick={() =>
                          handleModalEdit(
                            user.id,
                            user.fullname,
                            user.role,
                            "show"
                          )
                        }
                        className="text-xl lg:text-2xl rounded-md p-2"
                      >
                        <LuEdit2 />
                      </button>
                      {/* <button
                      onClick={() =>
                        handleModalEdit(user.id, user.fullname, user.role, "show")
                      }
                      className="text-xl lg:text-2xl bg-gray-500 rounded-md p-2 text-white"
                    >
                      <AiFillDelete />
                    </button> */}
                    </>
                  )
                ) : (
                  <div className="text-sm bg-gray-100 h-max p-1 rounded-md tracking-wide">
                    You don't have permission here
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
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

      {/* Mobile verison */}
      <div className="flex flex-col gap-4 md:hidden my-4">
        {/* Input search */}
        <div className="mb-5 flex items-center">
          <div className="bg-gray-200 text-gray-800 py-3 px-3 rounded-l-lg">
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
        {usersMemoize.map((user) => (
          <div
            key={user.id}
            className="rounded-lg shadow-md p-5 w-full flex flex-col gap-3"
            aria-label="card"
          >
            <div className="flex items-center gap-1">
              <div className="text-xs">Role</div>
              <div>
                <RoleBadge role={user.role} />
              </div>
            </div>
            <div className="">
              <div className="text-xs">Nama lengkap</div>
              <h1 className="text-lg font-semibold">{user.fullname}</h1>
            </div>

            <div className="flex gap-4 justify-end" aria-label="action">
              {credential.role === "superadmin" ? (
                user.role !== "superadmin" && (
                  <>
                    <button
                      onClick={() =>
                        handleModalEdit(
                          user.id,
                          user.fullname,
                          user.role,
                          "show"
                        )
                      }
                      className="text-xl lg:text-2xl bg-gray-400 rounded-md p-2 text-white"
                    >
                      <LuEdit2 />
                    </button>
                    {/* <button
                      onClick={() =>
                        handleModalEdit(user.id, user.fullname, user.role, "show")
                      }
                      className="text-xl lg:text-2xl bg-gray-500 rounded-md p-2 text-white"
                    >
                      <AiFillDelete />
                    </button> */}
                  </>
                )
              ) : (
                <div className="text-xs bg-white h-max p-1 rounded-md tracking-wide">
                  You don't have permission here
                </div>
              )}
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
          <div className="flex items-center gap-3 ">
            <button className="p-2 dark:bg-dark2 text-black dark:text-white active:bg-gray-300 rounded-md text-lg">
              <AiOutlineDoubleLeft />
            </button>
            <p className="dark:text-white text-sm">1 of 2 page</p>
            <button className="p-2 dark:bg-dark2 text-black dark:text-white active:bg-gray-300 rounded-md text-lg">
              <AiOutlineDoubleRight />
            </button>
          </div>
        </div>
      </div>

      {isEdit.openModal ? (
        <UserEdit
          {...isEdit}
          setLoading={setLoading}
          closeModal={() => handleModalEdit("", "", "", "close")}
        />
      ) : null}

      {isDelete.openModal ? (
        <UserDelete
          {...isDelete}
          setLoading={setLoading}
          closeModal={() => handleModalDelete("", "", "", "close")}
        />
      ) : null}
    </>
  );
}

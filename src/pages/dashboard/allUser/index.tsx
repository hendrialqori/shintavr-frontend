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
          "bg-gray-300 rounded-md p-2 text-sm lg:text-lg font-light text-center",
      },
      {
        title: "Permission",
        className:
          "bg-gray-300 rounded-md p-2 text-sm lg:text-lg font-light text-center",
      },
      {
        title: "Action",
        className:
          "bg-gray-300 rounded-md p-2 text-sm lg:text-lg font-light text-center",
      },
    ];
  }, []);

  const credential = useRecoilValue(userCredential);

  const [users, setUsers] = useState<User[]>([]);

  const [isDelete, setDelete] = useState(initalValueUser);

  const [isEdit, setEdit] = useState(initalValueUser);

  const [isLoading, setLoading] = useState(false);

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
    id: string = "",
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
    id: string = "",
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
      <h2 className="text-lg font-semibold">Semua user dan permission</h2>
      <div className="bg-blue-100 text-gray-700 rounded-md p-7 w-full md:w-6/12 lg:w-2/12 mt-5">
        <h2 className="font-semibold tracking-wide">User Aktiv</h2>
        <p className="text-[3rem] font-bold">{users?.length}</p>
      </div>

      {/* Tablet and Destop verion */}
      <div className="mt-4 hidden md:block" role="table">
        <div className="grid grid-cols-3 gap-1" aria-label="table-head">
          {thead.map((row, i) => (
            <div key={i} className={row.className}>
              {row.title}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-1 mt-1" aria-label="table-data">
          {users.map((user, i) => (
            <div
              key={i}
              className="grid grid-cols-3 gap-1 items-center border-b border-gray-200 h-max"
              aria-label="table-head"
            >
              <div className="rounded-md p-2 text-sm lg:text-lg font-light text-center">
                {user.fullname}
              </div>
              <div className="rounded-md p-2 text-sm lg:text-lg font-light text-center">
                {user.role}
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
                <div className="text-sm bg-gray-100 h-max p-1 rounded-md tracking-wide">You don't have permission here</div>
              )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile verison */}
      <div className="flex flex-col gap-4 md:hidden mt-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="rounded-lg shadow-md p-5 w-full flex flex-col gap-3"
            aria-label="card"
          >
            <div className="">
              <div className="text-xs">Nama lengkap</div>
              <h1 className="text-lg font-semibold">{user.fullname}</h1>
            </div>
            <div className="">
              <div className="text-xs">Role</div>
              <h1 className="text-lg font-semibold">{user.role}</h1>
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
                <div className="text-xs bg-white h-max p-1 rounded-md tracking-wide">You don't have permission here</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination  */}
      <div className="flex items-center gap-3 mt-5 justify-end" aria-label="pagination">
        <button className="p-2 bg-gray-200 active:bg-gray-300 rounded-md text-xl">
          <AiOutlineDoubleLeft/>
        </button>
        <p className="">1 of 2</p>
        <button className="p-2 bg-gray-200 active:bg-gray-300 rounded-md text-xl">
          <AiOutlineDoubleRight/>
        </button>
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

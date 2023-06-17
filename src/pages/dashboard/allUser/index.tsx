import { useMemo, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { UserDelete } from "./userDelete";
import { UserEdit } from "./userEdit";

const initalValueUser = {
  id: 0,
  name: "",
  permission: "",
  openModal: false,
};

export default function AllUser() {
  const dummy = [
    {
      id: 0,
      nama_lengkap: "Hendri Alqori",
      role: "teacher",
    },
    {
      id: 1,
      nama_lengkap: "Yakuza",
      role: "student",
    },
    {
      id: 3,
      nama_lengkap: "Keeren",
      role: "student",
    },
  ];

  const thead = useMemo(() => {
    return [
      {
        title: "Name Lengkap",
        className:
          "bg-gray-100 rounded-md p-2 text-sm lg:text-lg font-light text-center",
      },
      {
        title: "Permission",
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

  const [isDelete, setDelete] = useState(initalValueUser);

  const [isEdit, setEdit] = useState(initalValueUser);

  const handleModalEdit = (
    id: number = 0,
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
    id: number = 0,
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
      <h2 className="text-lg font-semibold">Semua user dan permission</h2>
      <div className="bg-blue-100 text-gray-700 rounded-md p-7 w-full md:w-6/12 lg:w-2/12 mt-5">
        <h2 className="font-semibold tracking-wide">User Aktiv</h2>
        <p className="text-[3rem] font-bold">100</p>
      </div>
      <div className="mt-4 hidden md:block" role="table">
        <div className="grid grid-cols-3 gap-1" aria-label="table-head">
          {thead.map((row, i) => (
            <div key={i} className={row.className}>
              {row.title}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-1 mt-3" aria-label="table-data">
          {dummy.map((d, i) => (
            <div
              key={i}
              className="grid grid-cols-3 gap-1"
              aria-label="table-head"
            >
              <div className="rounded-md p-2 text-sm lg:text-lg font-light text-center">
                {d.nama_lengkap}
              </div>
              <div className="rounded-md p-2 text-sm lg:text-lg font-light text-center">
                {d.role}
              </div>
              <div className="rounded-md p-2 text-sm lg:text-lg font-light text-center flex gap-8 justify-center">
                <button
                  onClick={() =>
                    handleModalEdit(d.id, d.nama_lengkap, d.role, "show")
                  }
                  className="text-2xl lg:text-3xl"
                >
                  <AiFillEdit />
                </button>
                <button
                  onClick={() =>
                    handleModalDelete(d.id, d.nama_lengkap, d.role, "show")
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
      <div className="flex flex-col gap-4 md:hidden mt-4">
        {dummy.map((d) => (
          <div
            className="bg-gray-100 p-5 w-full flex flex-col gap-3"
            aria-label="card"
          >
            <div className="">
              <div className="text-xs">Nama lengkap</div>
              <h1 className="text-lg font-semibold">{d.nama_lengkap}</h1>
            </div>
            <div className="">
              <div className="text-xs">Role</div>
              <h1 className="text-lg font-semibold">{d.role}</h1>
            </div>
            <div className="flex gap-4 dis" aria-label="action">
              <button
                onClick={() =>
                  handleModalEdit(d.id, d.nama_lengkap, d.role, "show")
                }
                className="text-2xl lg:text-3xl bg-gray-500 rounded-md p-2 text-white"
              >
                <AiFillEdit />
              </button>
              <button
                onClick={() =>
                  handleModalDelete(d.id, d.nama_lengkap, d.role, "show")
                }
                className="text-2xl lg:text-3xl bg-gray-500 rounded-md p-2 text-white"
              >
                <AiFillDelete />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isEdit.openModal ? (
        <UserEdit
          {...isEdit}
          closeModal={() => handleModalEdit(0, "", "", "close")}
        />
      ) : null}

      {isDelete.openModal ? (
        <UserDelete
          {...isDelete}
          closeModal={() => handleModalDelete(0, "", "", "close")}
        />
      ) : null}
    </>
  );
}

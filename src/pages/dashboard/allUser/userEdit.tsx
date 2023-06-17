import { Loading } from "@/components/loading";
import { ModalWrapper } from "@/components/modalWrapper";
import { ModalChildrenWrapper } from "@/components/modalChildenWrapper";
import { useState } from "react";
import { Checkbox } from "@/components/checkbox";
import { useForm } from "react-hook-form";

type Props = {
  id: number;
  name: string;
  permission: string;
  openModal?: boolean; // tidak dipake
  closeModal: () => void;
};

type FormType = {
  permission: string
} 

export const UserEdit = ({ id, name, permission, closeModal }: Props) => {
  const [isLoading, setLoading] = useState(false);

  const { register, handleSubmit: submit, getValues } = useForm({
    defaultValues: {
      permission: permission,
    },
  });

  const handleEdirPermission = submit((data) => {
    alert(JSON.stringify({ id, permission: data.permission }));
  });

  getValues('permission')

  return (
    <>
      {isLoading ? <Loading /> : null}
      <ModalWrapper>
        <ModalChildrenWrapper>
          <h1 className="flex items-center justify-center gap-1 text-md font-semibold text-center">
            {name} <span className="text-xs font-normal">permission ?</span>
          </h1>
          <div className="flex justify-center items-center gap-3 my-5">
            <div className="flex flex-col items-center gap-2">
              <label htmlFor="student" className={`text-sm bg-gray-100 rounded-md py-1 px-3 ${ getValues('permission') === ''}`}>
                Student
              </label>
              <input
                type="radio"
                id="student"
                value={"student"}
                {...register("permission")}
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <label htmlFor="teacher" className="text-sm bg-gray-100 rounded-md py-1 px-3">
                Teacher
              </label>
              <input
                type="radio"
                id="teacher"
                value={"teacher"}
                {...register("permission")}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <button
              className="bg-gray-300 w-full py-2 rounded-md"
              onClick={closeModal}
            >
              Batal
            </button>
            <button
              className="bg-blue-300 w-full py-2 rounded-md"
              onClick={handleEdirPermission}
            >
              Simpan
            </button>
          </div>
        </ModalChildrenWrapper>
      </ModalWrapper>
    </>
  );
};

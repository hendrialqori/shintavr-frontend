import { ModalWrapper } from "@/components/modalWrapper";
import { ModalChildrenWrapper } from "@/components/modalChildenWrapper";
import { useForm } from "react-hook-form";
import { doc, updateDoc } from "firebase/firestore";
import { db_firestore } from "@/configs/firebase";

type Props = {
  id: string;
  name: string;
  permission: string;
  openModal?: boolean; // tidak dipake
  
  closeModal: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

type FormType = {
  permission: string;
};

export const UserEdit = ({
  id,
  name,
  permission,
  closeModal,
  setLoading,
}: Props) => {
  const { register, handleSubmit: submit } = useForm<FormType>({
    defaultValues: {
      permission: permission,
    },
  });

  const handleEdirPermission = submit(async (data) => {
    setLoading(true);
    try {
      const userRef = doc(db_firestore, "users", id);
      await updateDoc(userRef, {
        role: data.permission,
      });
      setLoading(false);
      closeModal();
    } catch (error) {
      setLoading(false);
      throw new Error(error as string);
    }
  });

  return (
    <>
      <ModalWrapper>
        <ModalChildrenWrapper>
          <h1 className="flex items-center justify-center gap-1 text-md font-semibold text-center">
            {name} <span className="text-xs font-normal">permission ?</span>
          </h1>
          <div className="flex justify-center items-center gap-3 my-5">
            <div className="flex flex-col items-center gap-2">
              <label
                htmlFor="student"
                className={`text-sm bg-gray-100 rounded-md py-1 px-3`}
              >
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
              <label
                htmlFor="teacher"
                className="text-sm bg-gray-100 rounded-md py-1 px-3"
              >
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
          <div className="flex w-6/12 mx-auto gap-2 mt-4">
            <button
              className="bg-gray-300 w-full py-2 rounded-md"
              onClick={closeModal}
            >
              Batal
            </button>
            <button
              className="bg-blue-300 w-full py-2 rounded-md text-white"
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

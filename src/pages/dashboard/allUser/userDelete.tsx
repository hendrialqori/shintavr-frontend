import { Loading } from "@/components/loading";
import { ModalWrapper } from "@/components/modalWrapper";
import { ModalChildrenWrapper } from "@/components/modalChildenWrapper";
import { useState } from "react";

type Props = {
  id: number;
  name: string;
  permission: string;
  openModal?: boolean; // tidak dipake
  closeModal: () => void;
};

export const UserDelete = ({ id, name, permission, closeModal }: Props) => {
  const [isLoading, setLoading] = useState(false);
  const handleDelete = () => {
    alert(id);
  };
  return (
    <>
      {isLoading ? <Loading /> : null}
      <ModalWrapper>
        <ModalChildrenWrapper>
          <h1 className="text-md text-center">
            Anda yakin ingin menghapus{" "} <br />
            <span className="font-semibold">{name}</span> dengan permission{" "}
            <span className="font-semibold">{permission}</span> ?
          </h1>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <button
              className="bg-gray-300 w-full py-2 rounded-md"
              onClick={closeModal}
            >
              Batal
            </button>
            <button
              className="bg-red-300 w-full py-2 rounded-md"
              onClick={handleDelete}
            >
              Iya
            </button>
          </div>
        </ModalChildrenWrapper>
      </ModalWrapper>
    </>
  );
};

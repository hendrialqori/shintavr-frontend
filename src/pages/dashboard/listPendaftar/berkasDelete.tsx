import { Loading } from "@/components/loading";
import { ModalWrapper } from "@/components/modalWrapper";
import { ModalChildrenWrapper } from "@/components/modalChildenWrapper";
import { useState } from "react";

type Props = {
  id: number;
  name: string;
  closeModal: () => void;
};

export const BerkasDelete = ({ id, name, closeModal }: Props) => {
  const [isLoading, setLoading] = useState(false);
  const handleDelete = () => {
    alert(id);
  };
  return (
    <>
      {isLoading ? <Loading /> : null}
      <ModalWrapper>
        <ModalChildrenWrapper>
          <h1 className="text-lg text-center">
            Anda yakin ingin menghapus data dari {name} ?
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
              Hapus
            </button>
          </div>
        </ModalChildrenWrapper>
      </ModalWrapper>
    </>
  );
};

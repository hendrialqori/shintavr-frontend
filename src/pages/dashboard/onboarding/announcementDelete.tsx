import { Loading } from "@/components/loading";
import { ModalWrapper } from "@/components/modalWrapper";
import { ModalChildrenWrapper } from "@/components/modalChildenWrapper";
import { useState } from "react";

type Props = {
  id: number;
  closeModal: () => void;
};

export const AnnouncementDelete = ({ id, closeModal }: Props) => {
  const [isLoading, setLoading] = useState(false);
  const handleDelete = () => {
    alert(id)
  };
  return (
    <>
      {isLoading ? <Loading /> : null}
      <ModalWrapper>
        <ModalChildrenWrapper>
          <h1 className="text-lg text-center">
            Anda yakin ingin menghapus pengumuman ini ?
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

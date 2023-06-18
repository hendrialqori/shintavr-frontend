import { ModalWrapper } from "@/components/modalWrapper";
import { ModalChildrenWrapper } from "@/components/modalChildenWrapper";
import { deleteDoc, doc } from "firebase/firestore";
import { db_firestore } from "@/configs/firebase";

type Props = {
  id: string;
  name: string;
  closeModal: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const BerkasDelete = ({ id, name, closeModal, setLoading }: Props) => {
  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteDoc(doc(db_firestore, "registers-list", id));
      setLoading(false);
      closeModal();
    } catch (error) {
      setLoading(false);
      throw new Error(error as string);
    }
  };
  return (
    <>
      <ModalWrapper>
        <ModalChildrenWrapper>
          <h1 className="text-lg text-center">
            Anda yakin ingin menghapus data dari <br />{" "}
            <span className="font-semibold">{name}</span> ?
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

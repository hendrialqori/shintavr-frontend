import { ModalWrapper } from "@/components/modalWrapper";
import { ModalChildrenWrapper } from "@/components/modalChildenWrapper";
import { deleteDoc, doc } from "firebase/firestore";
import { db_firestore } from "@/configs/firebase";

type Props = {
  id: string;
  person: string;
  closeModal: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FeedbackDelete = ({
  id,
  person,
  closeModal,
  setLoading,
}: Props) => {
  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteDoc(doc(db_firestore, "feedback", id));
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
          <h1 className="text-md text-center">
            Anda yakin ingin feedback dari{" "}
            <span className="font-semibold">{person}</span> ?
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

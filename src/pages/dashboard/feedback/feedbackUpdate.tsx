import { ModalWrapper } from "@/components/modalWrapper";
import { ModalChildrenWrapper } from "@/components/modalChildenWrapper";
import { useForm } from "react-hook-form";
import { doc, updateDoc } from "firebase/firestore";
import { db_firestore } from "@/configs/firebase";
import { useEffect } from "react";

type Form = {
  message: string;
};

type Props = {
  id: string;
  message: string;
  closeModal: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FeedbackUpdate = ({
  id,
  message,
  closeModal,
  setLoading,
}: Props) => {
  const { register, handleSubmit: submit, setValue } = useForm<Form>();

  useEffect(() => {
    setValue("message", message);
  }, []);

  const handleSubmit = submit(async (data) => {
    setLoading(true);
    try {
      await updateDoc(doc(db_firestore, "feedback", id), {
        message: data.message,
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
          <form onSubmit={handleSubmit}>
            <textarea
              cols={30}
              rows={10}
              {...register("message")}
              className="border-none w-full rounded-md focus:ring-2"
              required
            />
            <div className="flex gap-2 mt-4 w-6/12 mx-auto pb-3">
              <button
                className="bg-gray-300 w-full py-2 rounded-md"
                onClick={closeModal}
              >
                Batal
              </button>
              <button
                className="bg-blue-300 w-full py-2 rounded-md"
                type="submit"
              >
                Simpan
              </button>
            </div>
          </form>
        </ModalChildrenWrapper>
      </ModalWrapper>
    </>
  );
};

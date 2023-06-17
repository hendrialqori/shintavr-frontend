import { Loading } from "@/components/loading";
import { ModalWrapper } from "@/components/modalWrapper";
import { ModalChildrenWrapper } from "@/components/modalChildenWrapper";
import { useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
  id: number;
  message: string;
  closeModal: () => void;
};

export const AnnouncementUpdate = ({ id, message, closeModal }: Props) => {
  const [isLoading, setLoading] = useState(false);

  const { register, handleSubmit: submit } = useForm({
    defaultValues: {
      message: message,
    },
  });

  const handleSubmit = submit((data) => {
    alert(JSON.stringify({ id, data }));
  });

  return (
    <>
      {isLoading ? <Loading /> : null}
      <ModalWrapper>
        <ModalChildrenWrapper>
          <form onSubmit={handleSubmit}>
            <textarea
              cols={30}
              rows={10}
              {...register("message")}
              className="border-none w-full rounded-md"
              maxLength={10}
            />
            <div className="grid grid-cols-2 gap-2 mt-4">
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

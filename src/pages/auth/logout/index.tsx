import { Loading } from "@/components/loading";
import { ModalWrapper } from "@/components/modalWrapper";

type Props = {
  loading?: boolean;
  actionLogout: () => void;
  actionCencel: () => void;
};

export const Logout = ({
  loading = false,
  actionLogout,
  actionCencel,
}: Props) => {
  return (
    <>
    {loading ? <Loading /> : null}
       <ModalWrapper>
      <div className="bg-white px-2 py-5 rounded-md w-3/12">
        <h1 className="text-lg text-center">Yakin keluar dari aplikasi ?</h1>
        <div className="grid grid-cols-2 gap-2 mt-4">
          <button
            className="bg-gray-300 w-full py-2 rounded-md"
            onClick={actionCencel}
          >
            Batal
          </button>
          <button
            className="bg-gray-300 w-full py-2 rounded-md"
            onClick={actionLogout}
          >
            Iya
          </button>
        </div>
      </div>
    </ModalWrapper>
    </>
   
  );
};

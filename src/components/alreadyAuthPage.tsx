import { useNavigate } from "react-router-dom";
import { FiLock } from "react-icons/fi";
export const AlreadyAuthPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-[100vh] w-[100vw]">
      <div className="flex flex-col justify-center items-center gap-1">
        <FiLock className="text-green-500 text-5xl" />
        <h1 className="text-sm font-light">Anda sudah terverifikasi</h1>
        <button
          className="bg-gray-400 text-white font-light text-sm px-2 py-1 rounded-md"
          onClick={() => navigate("/onboarding")}
        >
          Kembali ke halaman utama
        </button>
      </div>
    </div>
  );
};

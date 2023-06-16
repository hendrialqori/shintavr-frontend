import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useState } from "react";
import { AxiosError } from "axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Input } from "@/components/input";
import { InputPassword } from "@/components/inputPassword";
import { Loading } from "@/components/loading";

export default function Register() {
  const [showModal, setShowModal] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [seePassword, setSeePassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const currentValue = e.target as HTMLInputElement & { value: string }[];

    const username = currentValue[0].value;
    const password = currentValue[1].value;
  };

  return (
    <>
      <div className="h-[100vh] w-full border-2 flex flex-col justify-center items-center">
        <div className="p-4 w-11/12 md:w-6/12 lg:w-4/12 border rounded-md shadow-sm">
          <h1 className="text-lg font-bold mb-4">Buat akun dulu :)</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <Input title="fullname" required />
            <Input title="username" required />
            <InputPassword />
            <button
              // disabled={isLoading}
              className="bg-gray-200 w-max px-4 py-2 rounded-md text-sm mt-2 active:bg-gray-300"
              type="submit"
            >
              Register
            </button>
          </form>
        </div>
        <div
          className="text-xs flex items-center gap-1 mt-6"
          aria-label="register-action"
        >
          <p>Sudah punya akun ?</p>
          <Link className="underline text-blue-600" to={"/login"}>
            Masuk di sini
          </Link>
        </div>
      </div>
    </>
  );
}

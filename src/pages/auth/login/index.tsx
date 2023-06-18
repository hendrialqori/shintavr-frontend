// import { useNavigate } from "react-router";
// import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/input";
import { InputPassword } from "@/components/inputPassword";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db_firestore, app } from "@/configs/firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Loading } from "@/components/loading";

export default function Login() {
  const auth = getAuth(app);

  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);

  // const [showModal, setShowModal] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  // const [seePassword, setSeePassword] = useState(false);

  // const navigate = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const currentValue = e.target as HTMLInputElement & { value: string }[];

    const email = currentValue[0].value;
    const password = currentValue[1].value;

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password).then(() => {
        navigate("/");
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      setErrorMessage((error as any).message);
    }
  };

  return (
    <>
      {/* {showModal ? <ModalInfomation message={errorMessage} /> : null} */}
      {isLoading ? <Loading /> : null}

      <div className="h-[100vh] w-full border-2 flex flex-col justify-center items-center">
        <div className="p-4 w-11/12 md:w-6/12 lg:w-4/12 border rounded-md shadow-sm">
          <h1 className="text-lg font-bold mb-4">Selamat datang :)</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <Input title="email" type="email" required />
            <InputPassword />
            <button
              disabled={isLoading}
              className="bg-gray-200 w-max px-4 py-2 rounded-md text-sm mt-2 active:bg-gray-300"
              type="submit"
            >
              Login
            </button>

            <div className="text-center font-light text-red-500">
              {errorMessage}
            </div>

            <div className="grid grid-cols-7 items-center my-5 ">
              <div className="col-span-3 h-[0.10rem] w-full bg-gray-200" />
              <p className="text-xs text-center col-span-1">atau</p>
              <div className="col-span-3 h-[0.10rem] w-full bg-gray-200" />
            </div>

            <div className="cursor-pointer" role="button">
              <div className="flex items-center justify-center gap-3">
                <img
                  className="h-10 w-10 bg-gray-100 rounded-md"
                  src="google.svg"
                  alt="google-icon"
                />
                <p className="font-light">Login dengan google</p>
              </div>
            </div>
          </form>
        </div>
        <div
          className="text-xs flex items-center gap-1 mt-6"
          aria-label="register-action"
        >
          <p>Belum punya akun ?</p>
          <Link className="underline text-blue-600" to={"/register"}>
            Daftar di sini
          </Link>
        </div>
      </div>
    </>
  );
}

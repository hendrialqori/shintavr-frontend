// import { useNavigate } from "react-router";
// import { useState } from "react";
// import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Input } from "@/components/input";
import { InputPassword } from "@/components/inputPassword";
import { Loading } from "@/components/loading";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { db_firestore, app } from "@/configs/firebase";

export default function Register() {
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

    const fullname = currentValue[0].value;
    const username = currentValue[1].value;
    const email = currentValue[2].value;
    const password = currentValue[3].value;

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        async () => {
          await setDoc(doc(db_firestore, "users", username), {
            id: username,
            fullname: fullname,
            username: username,
            password: password,
            role: "student",
          }).then(() => {
            setLoading(false);
            navigate("/profile");
          });
        }
      );
    } catch (error) {
      setLoading(false);
      setErrorMessage((error as any).message);
    }
  };

  return (
    <>
      {isLoading ? <Loading /> : null}
      <div className="h-[100vh] w-full border-2 flex flex-col justify-center items-center">
        <div className="p-4 w-11/12 md:w-6/12 lg:w-4/12 border rounded-md shadow-sm">
          <h1 className="text-lg font-bold mb-4">Buat akun dulu :)</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <Input title="fullname" required />
            <Input title="username" required />
            <Input title="email" type="email" required />
            <InputPassword />
            <button
              disabled={isLoading}
              className="bg-gray-200 w-max px-4 py-2 rounded-md text-sm mt-2 active:bg-gray-300"
              type="submit"
            >
              Register
            </button>
            <div className="text-center font-light text-red-500">
              {errorMessage}
            </div>
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

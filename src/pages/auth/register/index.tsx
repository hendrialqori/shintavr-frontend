import { Link } from "react-router-dom";
import { Loading } from "@/components/loading";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { db_firestore, app, googleProvider } from "@/configs/firebase";
import { AlreadyAuthPage } from "@/components/alreadyAuthPage";
import { AiOutlineUser, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { TfiEmail } from "react-icons/tfi";
import { FiLock } from "react-icons/fi";
import { MdAlternateEmail } from "react-icons/md";
import { useSetRecoilState } from "recoil";
import { userCredential, loginThrough } from "@/store";


export default function Register() {
  const setUserCredential = useSetRecoilState(userCredential);

  const setLoginThrough = useSetRecoilState(loginThrough);

  const [seePassword, setSeePassword] = useState(false);

  const auth = getAuth(app);

  const [isVerify, setVerify] = useState(true);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (credential) => {
      if (!credential) {
        setVerify(false);
        return;
      }
    });

    return () => unSubscribe();
  }, []);

  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

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
          await setDoc(doc(db_firestore, "users", email), {
            id: email,
            fullname: fullname,
            email: email,
            username: username,
            password: password,
            role: "student",
            create_at: Date.now(),
          }).then(() => {
            setLoading(false);
            navigate("/onboarding");
          });
        }
      );
    } catch (error) {
      setLoading(false);
      setErrorMessage((error as any).message);
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider).then((result) => {
        setUserCredential({
          id: result.user.email!,
          fullname: result.user.displayName!,
          password: "********",
          role: "student",
          username: '-',
          authThrough: "google",
          email: result.user.email!,
          create_at: result.user.metadata.creationTime,
        });

        setLoginThrough("google");

        window.localStorage.setItem("provider", "google");

        navigate("/profile");
      });
    } catch (error) {
      setErrorMessage((error as any).message);
    }
  };

  if (isVerify) return <AlreadyAuthPage />;

  return (
    <>
      {isLoading ? <Loading /> : null}
      <div className="h-[100vh] w-full border-2 flex flex-col justify-center items-center">
        <div
          className="p-4 w-11/12 md:w-6/12 lg:w-4/12 rounded-xl"
          aria-label="form-container"
        >
          <h1 className="text-xl font-semibold mb-8 text-center">
            Buat akun dulu guys :)
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-9 h-12">
              <label
                htmlFor="fullname"
                className="col-span-1 flex flex-col items-center justify-center bg-blue-400 rounded-l-md"
              >
                <AiOutlineUser className="text-white text-2xl" />
              </label>
              <input
                id="fullname"
                type="text"
                className="font-light text-lg col-span-8 rounded-r-md border-none shadow-sm focus:ring-0 bg-gray-100 focus:border-none"
                placeholder="Nama Lengkap"
                required
              />
            </div>
            <div className="grid grid-cols-9 h-12">
              <label
                htmlFor="username"
                className="col-span-1 flex flex-col items-center justify-center bg-blue-400 rounded-l-md"
              >
                <MdAlternateEmail className="text-white text-2xl" />
              </label>
              <input
                id="username"
                type="text"
                className="font-light text-lg col-span-8 rounded-r-md border-none shadow-sm focus:ring-0 bg-gray-100 focus:border-none"
                placeholder="Username"
                required
              />
            </div>
            <div className="grid grid-cols-9 h-12">
              <label
                htmlFor="email"
                className="col-span-1 flex flex-col items-center justify-center bg-blue-400 rounded-l-md"
              >
                <TfiEmail className="text-white text-2xl" />
              </label>
              <input
                id="email"
                type="email"
                className="font-light text-lg col-span-8 rounded-r-md border-none shadow-sm focus:ring-0 bg-gray-100 focus:border-none"
                placeholder="Email"
                required
              />
            </div>
            <div className="grid grid-cols-9 h-12 relative">
              <label
                htmlFor="password"
                className="col-span-1 flex flex-col items-center justify-center bg-blue-400 rounded-l-md"
              >
                <FiLock className="text-white text-2xl" />
              </label>
              <input
                id="password"
                className="font-light text-lg col-span-8 rounded-r-md border-none shadow-sm focus:ring-0 bg-gray-100 focus:border-none"
                type={seePassword ? "text" : "password"}
                placeholder="Password"
                required
              />
              <div
                role="button"
                tabIndex={0}
                onClick={() => setSeePassword((prev) => !prev)}
                className="absolute text-2xl top-3 right-3 text-gray-500"
              >
                {seePassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </div>
            </div>

            <button
              disabled={isLoading}
              className="bg-gray-200 w-max px-4 py-3 rounded-md font-light mt-2 active:bg-gray-300 mr-0 ml-auto"
              type="submit"
            >
              Register
            </button>
            <div className="text-center font-light text-red-500">
              {errorMessage}
            </div>
            <div className="grid grid-cols-7 items-center my-5 ">
              <div className="col-span-3 h-[0.10rem] w-full bg-gray-200" />
              <p className="font-light text-center col-span-1">atau</p>
              <div className="col-span-3 h-[0.10rem] w-full bg-gray-200" />
            </div>

            <div
              className="cursor-pointer"
              role="button"
              onClick={handleLoginWithGoogle}
            >
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
          className="font-light flex items-center gap-1 mt-6"
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

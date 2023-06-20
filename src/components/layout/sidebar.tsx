import { RxPerson } from "react-icons/rx";
import { BsFillPersonVcardFill, BsBuildingLock } from "react-icons/bs";
import { FaWpforms, FaSchool } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { VscFeedback } from "react-icons/vsc";
import { Href } from "../href";
import { Logout } from "@/pages/auth/logout";
import { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userCredential } from "@/store";
import { collection, onSnapshot } from "firebase/firestore";
import { db_firestore } from "@/configs/firebase";
import { Register } from "@/types";
import { FiMoon } from "react-icons/fi";
import { useMode } from "@/hooks/useMode";

export const Sidebar = () => {
  const { toogleMode } = useMode();

  const credential = useRecoilValue(userCredential);

  const [temporaryRegisterData, setTemporaryRegisterData] = useState<
    Register[]
  >([]);

  const [showModalLogout, setModalLogout] = useState(false);

  const [isLoading, setLoading] = useState(false);

  const [haveRegister, setHaveRegister] = useState(false);

  const [haveRegisterId, setHaveRegisterId] = useState("");

  const navigate = useNavigate();

  const auth = getAuth();

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db_firestore, "registers-list"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
          };
        }) as unknown as Register[];

        setTemporaryRegisterData(data);
      },
      (error) => {
        throw new Error(error.message);
      }
    );

    return () => unSubscribe();
  }, []);

  useEffect(() => {
    const isHaveRegisterData = temporaryRegisterData.find(
      (d) => d.creator_id === credential.username
    );

    if (isHaveRegisterData) {
      setHaveRegister(true);
      setHaveRegisterId(isHaveRegisterData.id);
    }
  }, [temporaryRegisterData]);

  const actionLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth).then(() => {
        navigate("/login");
        setLoading(false);
        localStorage.removeItem("provider");
      });
    } catch (error) {
      setLoading(false);
      throw new Error(error as string);
    }
  };

  return (
    <>
      <aside className="w-14 lg:w-20 h-screen flex flex-col justify-between p-4 dark:bg-black bg-gray-100 z-10">
        <nav className="flex flex-col items-center">
          <Href to="/onboarding" name="onboarding">
            <FaSchool size={20} />
          </Href>
          <Href to="/profile" name="profile">
            <RxPerson size={20} />
          </Href>
          {credential.role !== "superadmin" ? (
            <Href
              to={
                haveRegister && haveRegisterId && credential.role === "student"
                  ? `/formulir?isEdit=true&idEdit=${haveRegisterId}`
                  : "/formulir"
              }
              name="formulir"
            >
              <FaWpforms size={20} />
            </Href>
          ) : null}
          <Href to="/list-pendaftar" name="list pendaftar">
            <BsFillPersonVcardFill size={20} />
          </Href>
          <Href to="/feedback" name="feedback">
            <VscFeedback size={20} />
          </Href>
          {credential.role === "superadmin" ? (
            <Href to="/all-user" name="setting permission">
              <BsBuildingLock size={20} />
            </Href>
          ) : null}
        </nav>
        <div className="flex flex-col items-center">
          <button
            onClick={toogleMode}
            className="bg-gray-200 hover:bg-gray-300 rounded-lg p-3 inline-block my-4"
          >
            <FiMoon size={20} />
          </button>
          <button
            onClick={() => setModalLogout(true)}
            className="bg-gray-200 hover:bg-gray-300 rounded-lg p-3 inline-block my-4"
          >
            <AiOutlineLogout size={20} />
          </button>
        </div>
      </aside>
      {showModalLogout ? (
        <Logout
          loading={isLoading}
          actionLogout={actionLogout}
          actionCencel={() => setModalLogout(false)}
        />
      ) : null}
    </>
  );
};

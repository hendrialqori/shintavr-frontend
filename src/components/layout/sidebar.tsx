import { Link } from "react-router-dom";
import { RxPerson } from "react-icons/rx";
// import { FaChalkboardTeacher } from "react-icons/fa";
import { BsFillPersonVcardFill, BsBuildingLock } from "react-icons/bs";
import { FaWpforms, FaSchool } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { Href } from "../href";
import { Logout } from "@/pages/auth/logout";
import { useState } from "react";

export const Sidebar = () => {
  const [showModalLogout, setModalLogout] = useState(false);

  const actionLogout = () => {};

  return (
    <>
      <aside className="w-20 h-screen flex flex-col justify-between p-4 bg-gray-100 z-[100]">
        <nav className="flex flex-col items-center">
          <Link to="/">
            <div className="bg-blue-800 rounded-lg text-white p-3 inline-block">
              <FaSchool size={20} />
            </div>
          </Link>
          <span className="border-b-[1px] border-gray-200 w-full p-2" />
          <Href to="/profile" name="profile">
            <RxPerson size={20} />
          </Href>
          <Href to="/formulir" name="formulir">
            <FaWpforms size={20} />
          </Href>
          <Href to="/list-pendaftar" name="list pendaftar">
            <BsFillPersonVcardFill size={20} />
          </Href>
          {/* <Href to="/list-guru" name="list guru">
            <FaChalkboardTeacher size={20} />
          </Href> */}
          <Href to="/all-user" name="setting permission">
                        <BsBuildingLock size={20} />
          </Href>
        </nav>
        <button
          onClick={() => setModalLogout(true)}
          className="bg-gray-100 hover:bg-gray-200 rounded-lg p-3 inline-block my-4"
        >
          <AiOutlineLogout size={20} />
        </button>
      </aside>
      {showModalLogout ? (
        <Logout
          actionLogout={actionLogout}
          actionCencel={() => setModalLogout(false)}
        />
      ) : null}
    </>
  );
};

import { AiFillEdit } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";

export const Detail = () => {
  return (
    <div>
      <div
        className="h-40 rounded-lg rounded-t-[40px] relative"
        aria-label="banner"
      >
        <div
          className="h-20 w-20 rounded-full flex justify-center items-center absolute left-6 md:left-10 lg:left-12 -bottom-5 md:bottom-5 lg:-bottom-10"
          aria-label="avatar"
        >
          <div className="text-[5rem] md:text-[7rem] lg:text-[8rem] bg-blue-300 rounded-full text-white">
            <BsPersonCircle />
          </div>
        </div>
      </div>
      <div className="mt-7 md:mt-5 flex flex-col gap-4 lg:ml-44">
        <div className="flex flex-col w-full gap-1">
          <p className="text-sm md:text-lg font-light ">username</p>
          <div className="w-full bg-gray-100 px-3 py-3 text-lg rounded-md">
            hendrialqori
          </div>
        </div>
        <div className="flex flex-col w-full gap-1">
          <p className="text-sm md:text-lg font-light ">Password</p>
          <div className="w-full bg-gray-100 px-3 py-3 text-lg rounded-md">
            **********
          </div>
        </div>

        <button className="text-2xl lg:text-3xl bg-gray-500 rounded-md p-2 text-white w-max ml-auto mr-0">
          <AiFillEdit />
        </button>

        <form className="flex flex-col mt-6">
          <label htmlFor="announ">Buat Pengumumam</label>
          <textarea
            className="border-none bg-gray-100 rounded-md p-4 my-2"
            id="announ"
          />
          <button className="roundd-md p-2 bg-gray-200">Simpan</button>
        </form>
      </div>
    </div>
  );
};

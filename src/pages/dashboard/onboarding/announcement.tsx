import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdAnnouncement } from "react-icons/md";

export const Announcement = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-3 font-light border-[1px] rounded-md p-5 text-lg">
        <div className="text-3xl">
          <MdAnnouncement />
        </div>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti modi,
        molestias doloribus officia consequatur neque enim suscipit tempore.
        Aliquam quis rerum laboriosam minima magni saepe sunt fugit architecto
        quasi maiores?
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">20, maret 2020</p>
          <div className="flex gap-4 dis" aria-label="action">
            <button className="text-2xl lg:text-3xl bg-gray-500 rounded-md p-2 text-white">
              <AiFillEdit />
            </button>
            <button className="text-2xl lg:text-3xl bg-gray-500 rounded-md p-2 text-white">
              <AiFillDelete />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 font-light border-[1px] rounded-md p-5 text-lg">
        <div className="text-3xl">
          <MdAnnouncement />
        </div>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti modi,
        molestias doloribus officia consequatur neque enim suscipit tempore.
        Aliquam quis rerum laboriosam minima magni saepe sunt fugit architecto
        quasi maiores?
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">20, maret 2020</p>
          <div className="flex gap-4 dis" aria-label="action">
            <button className="text-2xl lg:text-3xl bg-gray-500 rounded-md p-2 text-white">
              <AiFillEdit />
            </button>
            <button className="text-2xl lg:text-3xl bg-gray-500 rounded-md p-2 text-white">
              <AiFillDelete />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

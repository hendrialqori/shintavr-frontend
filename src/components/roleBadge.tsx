import { cn } from "@/utils/classNames";

type Props = {
  role: "superadmin" | "teacher" | "student";
};

export const RoleBadge = ({ role }: Props) => {
  let bgColor: string;

  if (role === "superadmin") bgColor = "bg-orange-300";
  if (role === "teacher") bgColor = "bg-yellow-300 text-black";
  if (role === "student") bgColor = "bg-blue-300 text-white";

  return (
    <div
      className={cn(
        "text-sm lg:text-base rounded-xl capitalize",
        "w-max mx-auto py-1 px-2 lg:px-3",
        bgColor!
      )}
    >
      {role}
    </div>
  );
};


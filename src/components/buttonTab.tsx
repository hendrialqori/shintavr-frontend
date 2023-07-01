import { cn } from "@/utils/classNames";

type ButtonProps = React.ComponentProps<"button"> & {
  isActive: boolean;
  children: React.ReactNode;
};

export const ButtonTab = ({ isActive, children, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className={cn(
        "text-sm md:text-base p-1 md:p-2 font-light md:font-semibold",
        "rounded-md tracking-wide",
        isActive ? "bg-blue-100 text-blue-600" : "text-gray-500"
      )}
    >
      {children}
    </button>
  );
};

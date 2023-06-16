type ButtonProps = React.ComponentProps<"button"> & {
  isActive: boolean;
  children: React.ReactNode;
};

export const ButtonTab = ({ isActive, children, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className={`px-6 py-1 rounded-md ${
        isActive
          ? "bg-blue-300 text-white tracking-wider"
          : "font-medium bg-white text-black border-[1px]"
      }`}
    >
      {children}
    </button>
  );
};
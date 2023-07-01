import { forwardRef } from "react";
import { cn } from "@/utils/classNames";

type Props = React.ComponentProps<"input"> & {
  renderIcon: () => React.ReactNode;
};

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ renderIcon, id, ...rest }, ref) => {
    return (
      <>
        <label
          htmlFor={id}
          className="flex flex-col items-center justify-center bg-blue-400 rounded-l-md w-1/12"
        >
          {renderIcon()}
        </label>
        <input
          ref={ref}
          id={id}
          className={cn(
            "font-light text-base lg:text-lg w-full",
            "px-2 rounded-r-md border-none shadow-sm bg-gray-100",
            "focus:outline-0 focus:bg-white focus:ring-0 focus:border-none"
          )}
          {...rest}
        />
      </>
    );
  }
);

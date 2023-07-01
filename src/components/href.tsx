import React from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { useLocation } from "react-router-dom";
import { cn } from "@/utils/classNames";

type Props = {
  to: string;
  name: string;
  children: React.ReactNode;
};

export const Href = ({ to = "/", name, children }: Props) => {
  const { pathname } = useLocation();
  return (
    <>
      <Tooltip id="my-tooltip" place="right" />
      <Link to={to} data-tooltip-id="my-tooltip" data-tooltip-content={name}>
        <div
          className={cn(
            "p-2 md:p-3 my-3 md:my-4",
            "rounded-lg inline-block",
            pathname.includes(to)
              ? "bg-blue-400 text-white"
              : "bg-gray-100 dark:bg-gray-300"
          )}
        >
          {children}
        </div>
      </Link>
    </>
  );
};

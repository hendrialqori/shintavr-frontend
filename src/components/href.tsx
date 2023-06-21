import React from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { useLocation } from "react-router-dom";

type Props = {
  to: string;
  name: string;
  index?: boolean;
  children: React.ReactNode;
};

export const Href = ({ to = "/", index, name, children }: Props) => {
  const { pathname } = useLocation();
  return (
    <>
      <Tooltip id="my-tooltip" place="right" />
      <Link to={to} data-tooltip-id="my-tooltip" data-tooltip-content={name}>
        <div
          className={`${
           index ? 'index-href' : pathname.includes(to) ? "bg-blue-400 text-white" : "bg-gray-100 dark:bg-gray-300"
          } rounded-lg p-2 md:p-3 inline-block my-3 md:my-4`}
        >
          {children}
        </div>
      </Link>
    </>
  );
};

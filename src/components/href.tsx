import React from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { useLocation } from "react-router-dom";

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
          className={`${
            pathname.includes(to) ? "bg-blue-400" : "bg-gray-100"
          } rounded-lg p-3 inline-block my-4`}
        >
          {children}
        </div>
      </Link>
    </>
  );
};

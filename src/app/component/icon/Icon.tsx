import { joinClasses } from "@/utils/css";
import { MouseEventHandler } from "react";

interface IconProps {
  className?: string;
  onClick?: MouseEventHandler<SVGSVGElement> | undefined;
}

export const EditIcon = ({ onClick, className = "" }: IconProps) => {
  return (
    <svg
      className={joinClasses("w-6 h-6 ", className)}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 21 21"
      onClick={onClick}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M7.418 17.861 1 20l2.139-6.418m4.279 4.279 10.7-10.7a3.027 3.027 0 0 0-2.14-5.165c-.802 0-1.571.319-2.139.886l-10.7 10.7m4.279 4.279-4.279-4.279m2.139 2.14 7.844-7.844m-1.426-2.853 4.279 4.279"
      />
    </svg>
  );
};

export const PlayIcon = ({ onClick, className = "" }: IconProps) => {
  return (
    <svg
      className={joinClasses("w-6 h-6 ", className)}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 14 16"
      onClick={onClick}
    >
      <path d="M0 .984v14.032a1 1 0 0 0 1.506.845l12.006-7.016a.974.974 0 0 0 0-1.69L1.506.139A1 1 0 0 0 0 .984Z" />
    </svg>
  );
};

export const LeftIcon = ({ onClick, className = "" }: IconProps) => {
  return (
    <svg
      className="w-6 h-6 "
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 10"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 5H1m0 0 4 4M1 5l4-4"
      />
    </svg>
  );
};

export const CloseIcon = ({ onClick, className = "" }: IconProps) => {
  return (
    <svg
      className={joinClasses("w-6 h-6", className)}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 14"
      onClick={onClick}
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
      />
    </svg>
  );
};

export const DeleteIcon = ({ onClick, className = "" }: IconProps) => {
  return (
    <svg
      className={joinClasses("w-6 h-6", className)}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 18 20"
      onClick={onClick}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
      />
    </svg>
  );
};

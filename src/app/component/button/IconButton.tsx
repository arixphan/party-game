import { joinClasses } from "@/utils/css";
import { HTMLAttributes } from "react";

interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
}

export const IconButton = (props: IconButtonProps) => {
  const { icon, className = "", ...restProps } = props;
  return (
    <button
      {...restProps}
      className={joinClasses(
        `border-2 border-gray-800 rounded-md text-gray-800 
      hover:border-indigo-500 hover:text-indigo-500 p-2 w-min h-min`,
        className
      )}
    >
      {icon}
    </button>
  );
};

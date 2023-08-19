import { joinClasses } from "@/utils/css";
import { InputHTMLAttributes, PropsWithChildren } from "react";

interface RadioProps
  extends InputHTMLAttributes<HTMLInputElement>,
    PropsWithChildren {}

export const Radio = (props: RadioProps) => {
  const { children, className = "", ...resProps } = props;
  return (
    <div className={joinClasses("flex items-center ", className)}>
      <input
        {...resProps}
        value=""
        className="w-4 h-4 text-blue-600 bg-gray-500 rounded focus:ring-blue-500 focus:ring-2 "
        type="radio"
      />
      <label
        id={resProps.id}
        className="w-full py-4 ml-2 text-sm font-medium text-gray-900"
      >
        {children}
      </label>
    </div>
  );
};

import { joinClasses } from "@/utils/css";
import { InputHTMLAttributes, LabelHTMLAttributes } from "react";

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    React.PropsWithChildren {}

export const Input = (props: InputProps) => {
  return (
    <input
      {...props}
      className={joinClasses(
        "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-700",
        props.className || ""
      )}
    />
  );
};

export interface LabelProps
  extends LabelHTMLAttributes<HTMLLabelElement>,
    React.PropsWithChildren {}

export const Label = (props: LabelProps) => {
  const { children } = props;
  return (
    <label
      {...props}
      className={joinClasses(
        "block font-bold mb-2",
        props.className || "text-sm"
      )}
    >
      {children}
    </label>
  );
};

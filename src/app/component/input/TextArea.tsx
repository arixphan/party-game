import { joinClasses } from "@/app/utils/css";
import { TextareaHTMLAttributes } from "react";

export interface InputProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    React.PropsWithChildren {}

export const TextArea = (props: InputProps) => {
  return (
    <textarea
      {...props}
      className={joinClasses(
        "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-700",
        props.className || "",
        { "bg-gray-300": Boolean(props.disabled) }
      )}
    />
  );
};

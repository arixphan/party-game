import { joinClasses } from "@/utils/css";
import { InputHTMLAttributes, PropsWithChildren } from "react";

interface CheckboxProps
  extends InputHTMLAttributes<HTMLInputElement>,
    PropsWithChildren {
  boxClassName?: string;
}

export const Checkbox = (props: CheckboxProps) => {
  const {
    children,
    className = "",
    boxClassName = "w-5 h-5",
    ...resProps
  } = props;
  return (
    <div className={joinClasses("flex items-center ", className)}>
      <input {...resProps} value="" className={boxClassName} type="checkbox" />
      <label
        id={resProps.id}
        className="w-full py-4 ml-2 text-sm font-medium text-gray-900"
      >
        {children}
      </label>
    </div>
  );
};

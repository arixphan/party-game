import { joinClasses } from "@/app/utils/css";
import { ButtonHTMLAttributes } from "react";

export type ButtonType = "primary" | "secondary";
export const BUTTON_VARIANT_CLASS_MAP: Record<ButtonType, string> = {
  primary: "text-white bg-indigo-500 hover:bg-indigo-600",
  secondary: "text-black border border-gray-300 hover:border-gray-500",
};

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    React.PropsWithChildren {
  variant?: ButtonType;
}

export const Button = (props: ButtonProps) => {
  const { disabled, className = "", variant = "primary", children } = props;
  return (
    <button
      {...props}
      className={joinClasses(
        "w-full text-sm font-bold py-2 px-4 rounded-md transition duration-300",
        className,
        {
          "bg-gray-400": Boolean(disabled),
        },
        BUTTON_VARIANT_CLASS_MAP[variant] || ""
      )}
    >
      {children}
    </button>
  );
};

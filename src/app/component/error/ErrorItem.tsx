import { joinClasses } from "@/app/utils/css";

interface ErrorMessageProps {
  hasError: boolean;
  errorMessage: string;
  successMessage: string;
}

export const ErrorItem = ({
  errorMessage,
  hasError,
  successMessage,
}: ErrorMessageProps) => {
  return (
    <li className="flex items-center py-1">
      <div
        className={joinClasses("rounded-full p-1 fill-current ", {
          "bg-green-200 text-green-700": !hasError,
          "bg-red-200 text-red-700": hasError,
        })}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {!hasError ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          )}
        </svg>
      </div>
      <span
        className={joinClasses("font-medium text-sm ml-3 ", {
          "text-green-700": !hasError,
          "text-red-700": hasError,
        })}
      >
        {hasError ? errorMessage : successMessage}
      </span>
    </li>
  );
};

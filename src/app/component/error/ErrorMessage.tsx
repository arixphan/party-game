import { joinClasses } from "@/app/utils/css";

interface ErrorMessageProps {
  errorMessage: string;
}

export const ErrorMessage = ({ errorMessage }: ErrorMessageProps) => {
  return (
    <div className="flex items-center py-1">
      <div
        className={joinClasses(
          "rounded-full p-1 fill-current bg-red-200 text-red-700"
        )}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <span className={joinClasses("font-medium text-sm ml-3 text-red-700")}>
        {errorMessage}
      </span>
    </div>
  );
};

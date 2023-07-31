import { joinClasses } from "@/app/utils/css";
import { ErrorItem } from "./ErrorItem";

interface ErrorListProps {
  validationRules: {
    rule: string;
    hasError: boolean;
    errorMessage: string;
    successMessage: string;
  }[];
  className?: string;
}

export const ErrorList = ({
  validationRules,
  className = "",
}: ErrorListProps) => {
  return (
    <div className={joinClasses("flex justify-start p-1", className)}>
      <ul>
        {validationRules.map((rule) => {
          return (
            <ErrorItem
              key={rule.rule}
              hasError={rule.hasError}
              errorMessage={rule.errorMessage}
              successMessage={rule.successMessage}
            />
          );
        })}
      </ul>
    </div>
  );
};

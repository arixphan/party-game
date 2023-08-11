import { joinClasses } from "@/utils/css";

interface DividerProps {
  className?: string;
  size?: 2 | 4 | 8;
}

const SIZE_MAP = {
  2: "border-t-2",
  4: "border-t-4",
  8: "border-t-8",
};

export const Divider = ({
  children,
  className = "",
  size = 2,
}: React.PropsWithChildren<DividerProps>) => {
  const classSize = joinClasses("flex-auto", SIZE_MAP[size]);
  return (
    <div className={joinClasses("flex w-full items-center", className)}>
      <span className={classSize} />
      {children}
      <span className={classSize} />
    </div>
  );
};

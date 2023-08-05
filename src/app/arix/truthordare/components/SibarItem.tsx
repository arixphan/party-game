"use client";
import { joinClasses } from "@/utils/css";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface SideBarItemProps extends React.PropsWithChildren {
  name: string;
  iconPath: string;
  href: string;
}

export const SideBarItem = ({
  href,
  name = "",
  iconPath,
  children,
}: SideBarItemProps) => {
  const params = useSearchParams();
  const kind = params.get("kind") || "common";

  return (
    <Link
      className={joinClasses(
        `flex items-center px-3 py-2 transition-colors 
         duration-300 transform rounded-lg
         hover:bg-gray-200 hover:text-blue-600`,
        {
          "bg-blue-200": name === kind,
        }
      )}
      href={href}
    >
      <Image alt={name} src={iconPath} width={24} height={24} />
      <span className="mx-2 text-sm font-medium">{children}</span>
    </Link>
  );
};

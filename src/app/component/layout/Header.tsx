import { UserIcon } from "./UserIcon";
import Link from "next/link";
import { AppRoute } from "@/app/constants/route";

interface PageHeaderProps extends React.PropsWithChildren {}

const PageHeader = ({ children }: PageHeaderProps) => {
  return (
    <header className="w-full bg-black">
      <ul
        className="h-full lg:w-3/6 mt-0 ml-auto mr-auto flex justify-between 
       items-center
       p-4 rounded-xl "
      >
        <li className="w-1/6">
          <Link href={AppRoute.ROOT}>
            <svg
              className="w-6 h-6  text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </Link>
        </li>
        <li className="text-center">{children}</li>
        <li className="w-1/6 flex justify-end">
          <UserIcon />
        </li>
      </ul>
    </header>
  );
};

export default PageHeader;

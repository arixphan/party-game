import Image from "next/image";
import Link from "next/link";

import { AppRoute } from "@/constants/route";

import { AuthButtons } from "../auth/AuthButtons";

interface PageHeaderProps extends React.PropsWithChildren {}

const PageHeader = ({ children }: PageHeaderProps) => {
  return (
    <header className="w-full bg-black">
      <ul
        className=" 
        h-full lg:w-3/6 mt-0 ml-auto mr-auto flex justify-between 
        items-center p-4 rounded-xl"
      >
        <li className="w-1/6">
          <Link href={AppRoute.ROOT}>
            <Image alt="Home" src="/icon/main.svg" width={36} height={36} />
          </Link>
        </li>
        <li className="text-center">{children}</li>
        <li className="w-1/6 flex justify-end ">
          <AuthButtons />
        </li>
      </ul>
    </header>
  );
};

export default PageHeader;

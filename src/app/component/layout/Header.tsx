import { UserIcon } from "./UserIcon";
import Link from "next/link";
import { AppRoute } from "@/constants/route";
import { MainIcon } from "../icon/Icon";
import Image from "next/image";

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
            <Image alt="Home" src="/icon/main.svg" width={36} height={36} />
          </Link>
        </li>
        <li className="text-center">{children}</li>
        <li className="w-1/6 flex justify-end ">
          <Image
            className="cursor-pointer"
            alt="Home"
            src="/icon/emoji-funny-square.svg"
            width={36}
            height={36}
          />
        </li>
      </ul>
    </header>
  );
};

export default PageHeader;

import Image from "next/image";
import Link from "next/link";

import { AppRoute } from "@/constants/route";

export default function Home() {
  return (
    <div className="flex-auto w-full mt-12 lg:w-3/6 sm:mb-0 px-6 pd:mx-0 flex flex-col gap-4">
      <GameItem
        href={AppRoute.TRUTH_OR_DARE.INDEX}
        description="Get pumped for Truth or Dare, the ultimate party game! Share hilarious truths or conquer epic dares with your awesome pals. Get ready to laugh, bond, and make memories like never before! 🎉😄        "
        title="Truth or Dare"
        cover={
          <Image
            className="rounded-lg"
            alt="art cover"
            src="/cover/truthordare.gif"
            fill
          />
        }
      />
    </div>
  );
}

interface GameItemProps {
  href: string;
  cover: React.ReactNode;
  title: string;
  description: string;
}
const GameItem = ({ cover, description, href, title }: GameItemProps) => {
  return (
    <Link href={href}>
      <div
        className="p-2 justify-center w-full rounded-xl
      group sm:flex space-x-6 bg-white shadow-xl
      hover:shadow-indigo-400"
      >
        <div className="mx-auto block w-full md:w-4/12 h-40  relative">
          {cover}
        </div>

        <div className="sm:w-8/12 h-full  pl-0 p-2">
          <h1 className="text-lg font-black text-cyan-900 text-justify">
            {title}
          </h1>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </Link>
  );
};

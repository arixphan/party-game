import Image from "next/image";
import Link from "next/link";

import { HOME_ENTRIES } from "@/constants/home-entries";

export default function Home() {
  return (
    <div className="flex-auto w-full mt-12 lg:w-3/6 sm:mb-0 px-6 pd:mx-0 flex flex-col gap-4">
      {HOME_ENTRIES.map((entry) => {
        return (
          <GameItem
            key={entry.url}
            href={entry.url}
            description={entry.description}
            title={entry.title}
            cover={
              <Image
                className="rounded-lg"
                alt={entry.cover.alt}
                src={entry.cover.img}
                width={150}
                height={150}
              />
            }
          />
        );
      })}
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
        {cover}

        <div className="sm:w-8/12 h-full pl-0 p-2">
          <h1 className="text-lg font-black text-cyan-900 text-justify">
            {title}
          </h1>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </Link>
  );
};

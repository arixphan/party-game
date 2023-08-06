import Link from "next/link";
import { AppRoute } from "../constants/route";
import { PlayIcon } from "./component/icon/Icon";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex-auto w-full mt-12 lg:w-3/6 sm:mb-0 lg:mb-12 flex flex-col gap-4">
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

//  <div
//     id="dropdown"
//     classNameName="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
//   >
//     <ul
//       className="py-2 text-sm text-gray-700 dark:text-gray-200"
//       aria-labelledby="dropdownDefaultButton"
//     >
//       <li>
//         <a
//           href="#"
//           className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//         >
//           Dashboard
//         </a>
//       </li>
//       <li>
//         <a
//           href="#"
//           className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//         >
//           Settings
//         </a>
//       </li>
//       <li>
//         <a
//           href="#"
//           className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//         >
//           Earnings
//         </a>
//       </li>
//       <li>
//         <a
//           href="#"
//           className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//         >
//           Sign out
//         </a>
//       </li>
//     </ul>
//   </div>

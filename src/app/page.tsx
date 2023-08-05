import Link from "next/link";
import { AppRoute } from "../constants/route";

export default function Home() {
  return (
    <div>
      <Link href={AppRoute.TRUTH_OR_DARE.INDEX}>Truth Or Dare</Link>
    </div>
  );
}
//  <div
//     id="dropdown"
//     className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
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
import { Calistoga } from "next/font/google";

import { CustomCard } from "./components/CustomCard";

const dancingScript = Calistoga({
  subsets: ["latin"],
  weight: "400",
});
export default function CustomTrueOrDare() {
  return (
    <CustomCard
      className={`flex-auto w-full mt-12 lg:w-3/6 sm:mb-0 lg:mb-12 ${dancingScript.className}`}
    ></CustomCard>
  );
}

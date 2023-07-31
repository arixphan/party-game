import { CustomCard } from "@/app/component/truthordare/custom-card/CustomCard";
import { Calistoga } from "next/font/google";

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

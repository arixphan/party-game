import { ConfigCard } from "../component/truthordare/ConfigCard";
import { Calistoga } from "next/font/google";

const dancingScript = Calistoga({
  subsets: ["latin"],
  weight: "400",
});

export default function TruthOrDare() {
  return (
    <ConfigCard
      className={`flex-auto w-full mt-12 lg:w-2/6 sm:mb-0 lg:mb-12 ${dancingScript.className}`}
    ></ConfigCard>
  );
}

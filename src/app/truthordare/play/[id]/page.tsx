import { GameCard } from "@/app/component/truthordare/GameCard";
import { Calistoga } from "next/font/google";

const dancingScript = Calistoga({
  subsets: ["latin"],
  weight: "400",
});

export default function TruthOrDare() {
  return (
    <GameCard
      className={`flex-auto w-full mt-12 lg:w-2/6 sm:mb-0 lg:mb-12 ${dancingScript.className}`}
    ></GameCard>
  );
}

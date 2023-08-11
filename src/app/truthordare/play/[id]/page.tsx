import { Calistoga } from "next/font/google";

import { GameCard } from "./components/GameCard";

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

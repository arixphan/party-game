"use client";

import { TextArea } from "@/app/shares/input/TextArea";
import WheelComponent from "./WheelComponent";
import { Button } from "@/app/shares/button/Button";
import { useEffect, useState } from "react";
import { ErrorMessage } from "@/app/shares/error/ErrorMessage";

type DrinkOption = "drink" | "no";
const DEFAULT_OPTIONS: Array<DrinkOption> = [
  "drink",
  "no",
  "drink",
  "no",
  "drink",
  "no",
  "drink",
  "no",
  "drink",
  "no",
];

const segColors = [
  "#EE4040",
  // "#F0CF50",
  // "#815CD1",
  // "#3DA5E0",
  // "#34A24F",
  // "#F9AA1F",
  // "#EC3F3F",
  // "#FF9000",
  // "#FFA07A",
  // "#CD5C5C",
  // "#FF69B4",
  // "#FFD700",
  // "#FF4500",
  // "#FFDAB9",
  // "#ADFF2F",
  // "#00FF7F",
];
export function SpinnerWheel() {
  const [segments, setSegments] =
    useState<Array<"drink" | "no">>(DEFAULT_OPTIONS);
  const [text, setText] = useState("");
  const [hasError, setHasError] = useState(false);
  const [currentResult, setCurrentResult] = useState<DrinkOption | "">("");

  const onFinished = (winner: DrinkOption) => {
    setCurrentResult(winner);
  };

  const handleGenerateWheel = () => {
    const options = text.trim().split(",");

    const newSegments: Array<DrinkOption> = [];
    options.forEach((op) => {
      if (["drink", "no"].includes(op.trim())) {
        newSegments.push(op?.trim() as DrinkOption);
      }
    });
    if (newSegments.length > 20) {
      setHasError(true);
      return;
    }

    if (newSegments.length === 0) {
      setSegments(DEFAULT_OPTIONS);
      return;
    }
    setSegments(newSegments);
    setHasError(false);
  };

  return (
    <div className="w-full mt-12 lg:w-3/6 sm:mb-0 lg:mb-12 flex flex-col justify-center items-center">
      <WheelComponent
        key={segments.join(", ")}
        segments={segments}
        segColors={segColors}
        onFinished={(winner) => onFinished(winner)}
        onStart={() => setCurrentResult("")}
        primaryColor="#6140B0"
        primaryColoraround="white"
        contrastColor="white"
        buttonText="Drink"
        isOnlyOnce={false}
        size={270}
        upDuration={50}
        downDuration={1000}
        fontFamily={""}
        height={400}
        width={400}
      />
      {currentResult === "drink" && (
        <div className="w-full text-white font-bold text-4xl flex justify-center mb-4">
          Let's drink! 🍻😄
        </div>
      )}
      {currentResult === "no" && (
        <div className="w-full text-white font-bold text-4xl flex justify-center mb-4">
          No beer for you, my friend. 😜
        </div>
      )}
      {hasError && (
        <div className="bg-white rounded-md p-4 w-2/3 mb-2">
          <ErrorMessage errorMessage="You've reached the maximum limit of 20 choices." />
        </div>
      )}
      <div className="w-2/3">
        <div className="bg-white rounded-md p-4">
          Personalize the drink wheel by entering your choices below, separated
          by commas.
          <br /> Input <strong>drink</strong> or <strong>no</strong> to add
          options, with a maximum of <strong>20</strong> allowed.
        </div>
        <TextArea
          style={{ minHeight: 60 }}
          className="mt-2"
          placeholder="no, drink, no, drink, no, drink"
          onChange={(e) => setText(e.target.value)}
          maxLength={150}
          rows={4}
        />
        <div className="flex justify-center">
          <Button onClick={handleGenerateWheel}>Generate wheel</Button>
        </div>
      </div>
    </div>
  );
}

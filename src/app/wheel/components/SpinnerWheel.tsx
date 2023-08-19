"use client";

import WheelComponent from "./WheelComponent";

export function SpinnerWheel() {
  const segments = [
    "Happy",
    "Angry",
    "Sad",
    "Frustration",
    "Emptyness",
    "Nothing",
  ];
  const segColors = [
    "#EE4040",
    "#F0CF50",
    "#815CD1",
    "#3DA5E0",
    "#34A24F",
    "#F9AA1F",
    "#EC3F3F",
    "#FF9000",
  ];
  const onFinished = (winner: string) => {
    console.log(winner);
  };
  return (
    <WheelComponent
      segments={segments}
      segColors={segColors}
      onFinished={(winner) => onFinished(winner)}
      primaryColor="black"
      primaryColoraround="#ffffffb4"
      contrastColor="white"
      buttonText="Spin"
      isOnlyOnce={false}
      size={270}
      upDuration={50}
      downDuration={1500}
      fontFamily={""}
      height={400}
      width={400}
    />
  );
}

"use client";
import { memo, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser } from "reactfire";

import { Divider } from "@/app/shares/divider/Divider";
import { Loading } from "@/app/shares/progress/Loading";
import { AppRoute } from "@/constants/route";

import { MAX_CUSTOM_SUITE } from "@/constants/truthordare";

import { useAddDoc, useCollectionRef } from "@/hooks/firebase";
import { LoadingWrapper } from "@/app/shares/progress/LoadingWrapper";

interface GameCardProps {
  className?: string;
}

enum GameType {
  common = "common",
  adult = "adult",
  couple = "couple",
  custom = "custom",
}

const OPTIONS = [
  {
    label: (
      <div className="w-24 flex gap-2">
        <Image
          alt={"common"}
          src={"/icon/gamepad.svg"}
          width={24}
          height={24}
        />
        Common
      </div>
    ),
    value: GameType.common,
    className: "border-slate-500",
  },
  {
    label: (
      <div className="w-24 flex gap-2">
        <Image
          alt={"adult"}
          src={"/icon/adult-18.svg"}
          width={24}
          height={24}
        />
        Adult
      </div>
    ),
    value: GameType.adult,
    className: "border-red-500 ",
  },
  {
    label: (
      <div className="w-24 flex gap-2">
        <Image alt={"couple"} src={"/icon/heart.svg"} width={24} height={24} />
        Couple
      </div>
    ),
    value: GameType.couple,
    className: "border-pink-500",
  },
];

export const ConfigCard = ({ className }: GameCardProps) => {
  const router = useRouter();
  const { data: user } = useUser();

  const handleOnClick = (value: string) => {
    router.push(`${AppRoute.TRUTH_OR_DARE.PLAY}/${value}`);
  };
  return (
    <div
      className={`bg-white drop-shadow-2xl rounded-xl border-4 border-black p-6 flex flex-col gap-y-4 ${className}`}
    >
      {OPTIONS.map((option) => (
        <ConfigOption
          key={option.value}
          text={option.label}
          value={option.value}
          className={option.className}
          onClick={handleOnClick}
        />
      ))}
      <Divider>Your Game</Divider>
      {!user?.uid ? <LoginOption /> : <CustomOptions userId={user.uid} />}
    </div>
  );
};

const LoginOption = () => {
  const router = useRouter();

  const handleOnClick = () => {
    router.push(AppRoute.AUTH.LOGIN);
  };

  return (
    <ConfigOption
      text="Sign in"
      className="text-black"
      value="signin"
      onClick={handleOnClick}
    />
  );
};

interface CustomOptionsProps {
  userId: string;
}

const CustomOptions = memo(function CustomOptions({
  userId,
}: CustomOptionsProps) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const res = useCollectionRef(userId, ["truthordare", "suites"]);

  const { status, data } = res;

  const addDoc = useAddDoc(userId, "truthordare", "suites");

  const handleCreateNew = async () => {
    setPending(true);
    try {
      const response = await addDoc({
        title: "No title",
      });
      router.push(`${AppRoute.TRUTH_OR_DARE.CUSTOM}/${response.id}`);
    } catch (error) {
      setPending(false);
      console.log(error);
    }
  };

  const handleOnClick = (id: string) => {
    router.push(`${AppRoute.TRUTH_OR_DARE.CUSTOM}/${id}`);
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center">
        <Loading className="h-12 w-12 " />
      </div>
    );
  }

  return (
    <LoadingWrapper loading={pending}>
      {data.map((item) => (
        <ConfigOption
          key={item.id}
          text={<p className="line-clamp-1">{item.title}</p>}
          value={item.id}
          onClick={() => handleOnClick(item.id)}
        />
      ))}
      {data.length < MAX_CUSTOM_SUITE && (
        <ConfigOption
          text={`Create New (${data.length}/${MAX_CUSTOM_SUITE})`}
          className="text-black border-2 border-gray-300 rounded-full"
          value="create"
          onClick={handleCreateNew}
        />
      )}
    </LoadingWrapper>
  );
});

interface ConfigOptionProps {
  className?: string;
  text?: React.ReactNode;
  value: string;
  onClick: (value: string) => void;
}

const ConfigOption = memo(function ConfigOption({
  className = "",
  text = "",
  onClick,
  value,
}: ConfigOptionProps) {
  return (
    <button
      className={`
      group h-12 px-6 select-none
      transition ease-in-out delay-150 
      hover:-translate-y-1
      hover:scale-105 duration-300
      hover:border-blue-400 ${className}`}
      onClick={() => onClick(value)}
    >
      <div
        className="font-semibold flex justify-center
      tracking-wide text-lg transition 
      duration-300 group-hover:text-blue-600"
      >
        {text}
      </div>
    </button>
  );
});

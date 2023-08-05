"use client";
import { AppRoute } from "@/constants/route";
import { useRouter } from "next/navigation";
import { Divider } from "../divider/Divider";
import { useContext } from "react";
import { AppAuthContext } from "../firebase/AuthContext";
import { Loading } from "../progress/Loading";
import { MAX_CUSTOM_SUITE } from "@/constants/truthordare";
import { useCollectionRef } from "@/hooks/useCollectionRef";
import { useAddDoc } from "@/hooks/useAddDoc";

interface GameCardProps {
  className?: string;
}

enum GameType {
  normal = "normal",
  adult = "adult",
  couple = "couple",
  custom = "custom",
}

const OPTIONS = [
  {
    label: "Normal",
    value: GameType.normal,
    className: "bg-gradient-to-r from-slate-500 to-slate-400",
  },
  {
    label: "Adult",
    value: GameType.adult,
    className: " bg-gradient-to-r from-red-500 to-orange-500 ",
  },
  {
    label: "Couple",
    value: GameType.couple,
    className: "bg-gradient-to-r from-pink-500 to-rose-400",
  },
];

export const ConfigCard = ({ className }: GameCardProps) => {
  const router = useRouter();
  const { user } = useContext(AppAuthContext);

  const handleOnClick = (value: string) => {
    router.push(AppRoute.TRUTH_OR_DARE.PLAY);
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
      {!user ? <LoginOption /> : <CustomOptions userId={user?.uid} />}
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

const CustomOptions = ({ userId }: CustomOptionsProps) => {
  const { status, data } = useCollectionRef(userId, ["truthordare", "suites"]);

  const router = useRouter();

  const addDoc = useAddDoc(userId, "truthordare", "suites");

  const handleCreateNew = async () => {
    try {
      const response = await addDoc({
        title: "No title",
      });
      router.push(`${AppRoute.TRUTH_OR_DARE.CUSTOM}/${response.id}`);
    } catch (error) {
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
    <>
      {data.map((item) => (
        <ConfigOption
          key={item.id}
          text={item.title}
          value={item.id}
          onClick={() => handleOnClick(item.id)}
        />
      ))}
      {data.length < MAX_CUSTOM_SUITE && (
        <ConfigOption
          text={`Create New (${data.length}/${MAX_CUSTOM_SUITE})`}
          className="text-black"
          value="create"
          onClick={handleCreateNew}
        />
      )}
    </>
  );
};

interface ConfigOptionProps {
  className?: string;
  text?: React.ReactNode;
  value: string;
  onClick: (value: string) => void;
}

const ConfigOption = ({
  className = "",
  text = "",
  onClick,
  value,
}: ConfigOptionProps) => {
  return (
    <button
      className={`
       group h-12 px-6 border-2
       border-gray-300 
       rounded-full
       transition ease-in-out delay-150 hover:-translate-y-1
        hover:scale-105 duration-300
      hover:border-blue-400 select-none ${className}`}
      onClick={() => onClick(value)}
    >
      <div className="text-center font-semibold tracking-wide text-lg transition duration-300 group-hover:text-blue-600">
        <p className="line-clamp-1">{text}</p>
      </div>
    </button>
  );
};

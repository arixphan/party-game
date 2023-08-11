"use client";

import { useEffect, useMemo, useState } from "react";
import { DocumentData, orderBy } from "firebase/firestore";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useUser } from "reactfire";

import { ErrorAlert } from "@/app/shares/alert/ErrorAlert";
import { BackIcon, CirclePlus, StartIcon } from "@/app/shares/icon/Icon";
import { Input, Label } from "@/app/shares/input/Input";
import { TextArea } from "@/app/shares/input/TextArea";
import { LoadingWrapper } from "@/app/shares/progress/LoadingWrapper";
import { AppRoute } from "@/constants/route";
import { MAX_SUITE_QUESTION } from "@/constants/truthordare";
import {
  useUpdateDoc,
  useUpdateDocById,
  useDeleteDocById,
  useDocumentRef,
} from "@/hooks/firebase";
import { useAddDoc } from "@/hooks/firebase/useAddDoc";

import { useCollectionRef } from "@/hooks/firebase/useCollectionRef";

import { TruthOrDare } from "@/types/truthordare";
import { joinClasses } from "@/utils/css";

import { CustomLine } from "./CustomLine";

const GAME_TYPE = [
  {
    label: "Truth",
    value: TruthOrDare.Type.truth,
    className: "border-r-0 rounded-s-md border-blue-500",
  },
  {
    label: "Dare",
    value: TruthOrDare.Type.dare,
    className: "border-l-0 rounded-e-md border-red-500",
  },
];

export const REQUIRE_QUESTION_ERROR = `Let's come up with lots of fun truth and dare challenges to enjoy together!😄`;

interface GameCardProps {
  className?: string;
}

export const CustomCard = ({ className }: GameCardProps) => {
  const [question, setQuestion] = useState("");
  const [type, setType] = useState(TruthOrDare.Type.truth);
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { data: user } = useUser();
  const { customId } = useParams();

  const suitePath = [
    user?.uid || "does_not_existed",
    "truthordare",
    "suites",
    customId,
  ] as const;

  const { status, data } = useDocumentRef(...suitePath);
  const { status: truthStatus, data: truthData } = useCollectionRef(
    user?.uid || "does_not_existed",
    ["truthordare", "suites", customId, "truth"],
    orderBy("createdAt", "desc")
  );

  const { status: dareStatus, data: dareData } = useCollectionRef(
    user?.uid || "does_not_existed",
    ["truthordare", "suites", customId, "dare"],
    orderBy("createdAt", "desc")
  );

  const addTruthQuestion = useAddDoc(
    user?.uid || "does_not_existed",
    "truthordare",
    "suites",
    customId,
    "truth"
  );

  const updateTruthQuestion = useUpdateDocById(
    user?.uid || "does_not_existed",
    "truthordare",
    "suites",
    customId,
    "truth"
  );

  const deleteTruthQuestion = useDeleteDocById(
    user?.uid || "does_not_existed",
    "truthordare",
    "suites",
    customId,
    "truth"
  );

  const addDareQuestion = useAddDoc(
    user?.uid || "does_not_existed",
    "truthordare",
    "suites",
    customId,
    "dare"
  );

  const updateDareQuestion = useUpdateDocById(
    user?.uid || "does_not_existed",
    "truthordare",
    "suites",
    customId,
    "dare"
  );

  const deleteDareQuestion = useDeleteDocById(
    user?.uid || "does_not_existed",
    "truthordare",
    "suites",
    customId,
    "dare"
  );

  const updateSuiteDoc = useUpdateDoc(
    user?.uid || "does_not_existed",
    "truthordare",
    "suites",
    customId
  );

  const handleCreateQuestion = async () => {
    if (!question?.trim() || !user) return;

    try {
      if (type === TruthOrDare.Type.truth) {
        addTruthQuestion({
          content: question,
          createdAt: new Date(),
        });
      } else {
        addDareQuestion({
          content: question,
          createdAt: new Date(),
        });
      }

      setQuestion("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateTitle = async (title: string) => {
    if (!title?.trim() || !user) return;

    try {
      updateSuiteDoc({
        title,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateItem = (item: DocumentData) => {
    try {
      if (type === TruthOrDare.Type.truth) {
        updateTruthQuestion(item.id, item);
      } else {
        updateDareQuestion(item.id, item);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteItem = (item: DocumentData) => {
    try {
      if (type === TruthOrDare.Type.truth) {
        deleteTruthQuestion(item.id);
      } else {
        deleteDareQuestion(item.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTitle(data?.title);
  }, [data?.title]);

  const questionList = useMemo(() => {
    return (type === TruthOrDare.Type.truth ? truthData : dareData) || [];
  }, [dareData, truthData, type]);

  const router = useRouter();
  const isDisable = questionList.length >= MAX_SUITE_QUESTION;
  const allowPlay = truthData?.length > 0 && dareData?.length > 0;

  const handlePlay = () => {
    if (!allowPlay) {
      setErrorMessage(REQUIRE_QUESTION_ERROR);
      return;
    }
    router.push(`${AppRoute.TRUTH_OR_DARE.PLAY}/${customId}`);
  };

  return (
    <div
      className={`bg-white drop-shadow-2xl rounded-xl border-4 border-black p-6 flex flex-col gap-y-4 ${className}`}
    >
      <div className="flex justify-between">
        <BackIcon
          className="w-10 h-10 cursor-pointer "
          onClick={() => router.push(AppRoute.TRUTH_OR_DARE.INDEX)}
        />
        <StartIcon className="w-12 h-12 cursor-pointer" onClick={handlePlay} />
      </div>
      {errorMessage && (
        <ErrorAlert
          prefix="Oopsie! "
          message={errorMessage}
          onClick={() => setErrorMessage("")}
        />
      )}
      <LoadingWrapper loading={status === "loading"}>
        <div className="flex items-center flex-col">
          <div className="w-full">
            <Input
              value={title}
              placeholder="Title..."
              onChange={(e) => setTitle(e.target.value)}
              onBlur={(e) => handleUpdateTitle(e.target.value)}
              className="w-full outline outline-2 outline-zinc-200 select-none focus:ring-2"
              maxLength={50}
            />
          </div>
          <div className="mt-4 md:w-64 w-full">
            {GAME_TYPE.map((item) => {
              return (
                <button
                  key={item.value}
                  className={joinClasses(
                    `p-2 w-1/2 border-2 font-extrabold 
              `,
                    item.className,
                    {
                      "bg-red-500 text-white":
                        item.value === type &&
                        item.value === TruthOrDare.Type.dare,
                      "text-red-500":
                        item.value !== type &&
                        item.value === TruthOrDare.Type.dare,
                      "bg-blue-500 text-white":
                        item.value === type &&
                        item.value === TruthOrDare.Type.truth,
                      "text-blue-500":
                        item.value !== type &&
                        item.value === TruthOrDare.Type.truth,
                    }
                  )}
                  onClick={() => setType(item.value)}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="w-full flex flex-col gap-2 mt-2">
            <Label className="text-lg text-black text-end">
              ({questionList.length}/{MAX_SUITE_QUESTION})
            </Label>
            <div className="w-full bg-zinc-50 rounded-lg flex justify-between">
              <TextArea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                maxLength={250}
                rows={4}
                disabled={isDisable}
                placeholder="New..."
                className="w-full border-2 border-r-0 rounded-e-none
                  border-zinc-200 min-h-[96px] 
                   outline-none select-none focus:ring-2"
              />
              <div className="w-12">
                <div
                  className={joinClasses(
                    `flex-1 h-full w-full cursor-pointer text-center 
                    p-2 flex items-center rounded-e-md `,
                    isDisable ? "bg-gray-300" : "bg-indigo-700"
                  )}
                  onClick={handleCreateQuestion}
                >
                  <CirclePlus />
                </div>
              </div>
            </div>
            {questionList.map((item) => (
              <CustomLine
                key={item.id}
                item={item}
                updateItem={handleUpdateItem}
                deleteItem={handleDeleteItem}
              />
            ))}
          </div>
        </div>
      </LoadingWrapper>
    </div>
  );
};

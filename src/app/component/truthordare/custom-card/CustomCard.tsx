"use client";

import { TruthOrDare } from "@/app/types/truthordare";
import { useContext, useEffect, useMemo, useState } from "react";
import { AppAuthContext } from "../../firebase/AuthContext";
import { TextArea } from "../../input/TextArea";
import { Input, Label } from "../../input/Input";
import { useFirestoreDoc } from "@/app/hooks/useFirestoreDoc";
import { useParams } from "next/navigation";
import { useUpdateDoc, useUpdateDocById } from "@/app/hooks/useUpdateDoc";
import { useAddDoc } from "@/app/hooks/useAddDoc";
import { Divider } from "../../divider/Divider";
import { joinClasses } from "@/app/utils/css";
import { useFirestoreCollection } from "@/app/hooks/useFirestoreCollection";
import { CustomLine } from "./CustomLine";
import { DocumentData, orderBy } from "firebase/firestore";
import { useDeleteDocById } from "@/app/hooks/useDeleteDoc";
import { IconButton } from "../../button/IconButton";
import { useRouter } from "next/navigation";
import { AppRoute } from "@/app/constants/route";
import { LeftIcon, PlayIcon } from "../../icon/Icon";
import { MAX_SUITE_QUESTION } from "@/app/constants/truthordare";
import { LoadingWrapper } from "../../progress/LoadingWrapper";
import { ErrorAlert } from "../../alert/ErrorAlert";

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

export const REQUIRE_QUESTION_ERROR = `Let's come up with lots of fun truth or dare challenges to enjoy together!😄`;

interface GameCardProps {
  className?: string;
}

export const CustomCard = ({ className }: GameCardProps) => {
  const [question, setQuestion] = useState("");
  const [type, setType] = useState(TruthOrDare.Type.truth);
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { user } = useContext(AppAuthContext);
  const { customId } = useParams();

  const suitePath = [
    user?.uid || "does_not_existed",
    "truthordare",
    "suites",
    customId,
  ] as const;

  const { status, data } = useFirestoreDoc(...suitePath);
  const { status: truthStatus, data: truthData } = useFirestoreCollection(
    user?.uid || "does_not_existed",
    ["truthordare", "suites", customId, "truth"],
    orderBy("createdAt", "desc")
  );

  const { status: dareStatus, data: dareData } = useFirestoreCollection(
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
  const allowPlay = truthData?.length > 0 || dareData?.length > 0;

  const handlePlay = () => {
    if (!allowPlay) {
      setErrorMessage(REQUIRE_QUESTION_ERROR);
      return;
    }
    router.push(AppRoute.TRUTH_OR_DARE.PLAY);
  };

  return (
    <div
      className={`bg-white drop-shadow-2xl rounded-xl border-4 border-black p-6 flex flex-col gap-y-4 ${className}`}
    >
      <div className="flex justify-between">
        <IconButton
          icon={<LeftIcon></LeftIcon>}
          onClick={() => router.push(AppRoute.TRUTH_OR_DARE.INDEX)}
        />
        <IconButton icon={<PlayIcon></PlayIcon>} onClick={handlePlay} />
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
            <Label className="text-2xl">Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={(e) => handleUpdateTitle(e.target.value)}
              className="w-full outline outline-2 outline-gray-500 select-none focus:ring-2"
              maxLength={50}
            />
          </div>
          <Divider size={8} className="mt-4"></Divider>
          <div className="mt-2 md:w-64 w-full">
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
          <div className="w-full mt-4">
            <Label className="text-2xl">New Question</Label>
            <TextArea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              maxLength={250}
              rows={4}
              disabled={isDisable}
              className="w-full outline outline-2 outline-gray-500 select-none focus:ring-2"
            />
            <button
              className={joinClasses(
                `w-full rounded-xl border-0 px-5 py-3 mb-3 text-white font-extrabold text-2xl transition duration-200 `,
                isDisable
                  ? "bg-gray-400"
                  : "bg-indigo-700 hover:text-indigo-500 border-indigo-500 hover:bg-white  hover:border-4"
              )}
              onClick={handleCreateQuestion}
              disabled={isDisable}
            >
              Create
            </button>
          </div>
          <div className="w-full flex flex-col gap-2 mt-4">
            <Label className="text-lg text-right">
              {questionList.length}/{MAX_SUITE_QUESTION}
            </Label>

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

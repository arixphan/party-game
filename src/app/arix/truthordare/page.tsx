"use client";

import { SwitchButton } from "./components/SwitchButton";
import { NewQuestion } from "./components/NewQuestion";
import { Fragment, useEffect, useState } from "react";
import { TruthOrDare } from "@/types/truthordare";
import { useSearchParams } from "next/navigation";
import { useCollectionRef } from "@/hooks/useCollectionRef";
import { useDocumentRef } from "@/hooks/useDocumentRef";
import { limit, orderBy, startAfter } from "firebase/firestore";
import { Button } from "@/app/component/button/Button";

const PAGE_SIZE = 1;

export default function TruthOrDareManagementPage() {
  const [type, setType] = useState(TruthOrDare.Type.truth);
  const [currentOrder, setCurrentOrder] = useState(0);
  const [isLast, setIsLast] = useState(false);
  const [isFirst, setIsFirst] = useState(true);

  const params = useSearchParams();
  const kind = params.get("kind") || "common";
  const questionsRef = useCollectionRef(
    "truthordare",
    [kind, type],
    orderBy("order", "asc"),
    limit(PAGE_SIZE),
    startAfter(currentOrder)
  );
  const suiteRef = useDocumentRef("truthordare", kind);
  const counterKey = `${type}Counter`;
  const counter = suiteRef.data?.[counterKey] || 0;

  const handlePrevious = () => {
    const previousOrder = currentOrder - PAGE_SIZE;
    setCurrentOrder(previousOrder < 0 ? 0 : previousOrder);
    setIsFirst(previousOrder <= 0);
    setIsLast(false);
  };
  const handleNext = () => {
    const nextOrder = currentOrder + PAGE_SIZE;
    if (nextOrder < counter) {
      setCurrentOrder(nextOrder);
    }
    setIsLast(nextOrder + PAGE_SIZE >= counter);
    setIsFirst(false);
  };

  useEffect(() => {
    setCurrentOrder(0);
    setIsLast(false);
    setIsFirst(true);
  }, [type, counter]);

  return (
    <div className=" m-4 p-4">
      <SwitchButton value={type} onChange={setType} />
      <div className="flex gap-2 items-start">
        <div className=" flex-1">
          <table className="bg-white table-fixed border-collapse border border-slate-40 w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="w-1/5 border-2 border-slate-300 p-2">Order</th>
                <th className="w-4/5 border-2 border-slate-300 p-2">Content</th>
              </tr>
            </thead>
            <tbody>
              {questionsRef.data?.map((q) => {
                return (
                  <tr key={q.id} className="border-2 border-slate-300">
                    <td className="text-center">{q.id}</td>
                    <td className="px-2">{q.content}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex justify-center gap-2 mt-2">
            {counter > 0 && !isFirst && (
              <Button
                variant="secondary"
                className="bg-white w-24"
                onClick={handlePrevious}
              >
                Previous
              </Button>
            )}
            {counter > 0 && !isLast && (
              <Button
                variant="secondary"
                className="bg-white  w-24"
                onClick={handleNext}
              >
                Next
              </Button>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center gap-2">
          <NewQuestion kind={kind} type={type} />
        </div>
      </div>
    </div>
  );
}

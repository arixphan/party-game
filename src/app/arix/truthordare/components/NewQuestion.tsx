"use client";
import { Button } from "@/app/component/button/Button";
import { TextArea } from "@/app/component/input/TextArea";
import { ChangeEvent, useCallback, useState } from "react";
import { writeBatch, doc, increment } from "firebase/firestore";

import { useFirestore } from "reactfire";
import { TruthOrDare } from "@/types/truthordare";
import { useDocumentRef } from "@/hooks/useDocumentRef";

interface NewQuestionProps {
  type: TruthOrDare.Type;
  kind: string;
}

export const NewQuestion = ({ type, kind }: NewQuestionProps) => {
  const [questions, setQuestions] = useState("");
  const firestore = useFirestore();
  const batch = writeBatch(firestore);
  const ref = doc(firestore, "truthordare", kind);
  const suiteRef = useDocumentRef("truthordare", kind);

  const counterKey = `${type}Counter`;
  const counter = suiteRef.data?.[counterKey] || 0;

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setQuestions(event.target.value);
    },
    []
  );

  const handleOnClick = () => {
    const newQuestions = questions.split(new RegExp(/\r?\n|\r/g));
    let incrementCounter = counter;

    newQuestions.forEach((question) => {
      if (question?.trim()) {
        incrementCounter += 1;
        const newRef = doc(
          firestore,
          "truthordare",
          kind,
          type,
          String(incrementCounter)
        );

        batch.set(newRef, {
          content: question,
          order: incrementCounter,
          id: String(incrementCounter),
          createdAt: new Date(),
        });
      }
    });

    batch.set(
      ref,
      {
        [counterKey]: increment(incrementCounter - counter),
      },
      {
        merge: true,
      }
    );

    try {
      batch.commit();
      setQuestions("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <TextArea value={questions} rows={10} onChange={handleOnChange} />
      <Button className="w-24" onClick={handleOnClick}>
        Add
      </Button>
    </>
  );
};

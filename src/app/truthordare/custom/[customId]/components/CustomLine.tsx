"use client";

import { memo, useState } from "react";
import { DocumentData } from "firebase/firestore";

import {
  CircleRemoveIcon,
  DoneIcon,
  TextEditIcon,
} from "@/app/shares/icon/Icon";

import { TextArea } from "@/app/shares/input/TextArea";

interface CustomLineProps {
  item: DocumentData;
  updateItem: (item: DocumentData) => void;
  deleteItem: (item: DocumentData) => void;
}

export const CustomLine = memo(function CustomLine({
  item,
  updateItem,
  deleteItem,
}: CustomLineProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleOnDone = (item: DocumentData) => {
    setIsEditing(false);
    updateItem(item);
  };

  if (isEditing) {
    return <EditLine item={item} onDone={handleOnDone} />;
  }

  return (
    <div className="w-full min-h-[96px] bg-zinc-100 rounded-lg flex justify-between">
      <div className="flex-auto font-semibold break-words p-2 break-all">
        {item.content}
      </div>
      <div className="w-11 min-w-[2.75rem] cursor-pointer text-center items-center rounded-e-md">
        <div
          className="h-1/2 w-full bg-indigo-700 cursor-pointer text-center rounded-tr-md flex justify-center items-center"
          onClick={() => setIsEditing(true)}
        >
          <TextEditIcon />
        </div>
        <div
          className="h-1/2 w-full bg-rose-600 cursor-pointer text-center rounded-br-md flex justify-center items-center"
          onClick={() => deleteItem(item)}
        >
          <CircleRemoveIcon />
        </div>
      </div>
    </div>
  );
});

interface EditLineProps {
  item: DocumentData;
  onDone: (item: DocumentData) => void;
}

const EditLine = memo(function EditLine({ item, onDone }: EditLineProps) {
  const [question, setQuestion] = useState(item?.content || "");

  const handleOnDone = () => {
    onDone({ ...item, content: question });
  };

  return (
    <div className="w-full bg-zinc-50 rounded-lg flex justify-between">
      <TextArea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        maxLength={250}
        rows={4}
        placeholder="New..."
        className="w-full border-2 border-r-0 rounded-e-none
      border-zinc-200 min-h-[96px] 
       outline-none select-none focus:ring-2"
      />
      <div className="w-12">
        <div
          className="flex-1 h-full w-full cursor-pointer text-center p-2 flex items-center rounded-e-md bg-indigo-700"
          onClick={handleOnDone}
        >
          <DoneIcon />
        </div>
      </div>
    </div>
  );
});

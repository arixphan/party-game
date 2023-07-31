"use client";

import { DocumentData } from "firebase/firestore";
import { useState } from "react";
import { TextArea } from "../../input/TextArea";
import { DeleteIcon, EditIcon } from "../../icon/Icon";

interface CustomLineProps {
  item: DocumentData;
  updateItem: (item: DocumentData) => void;
  deleteItem: (item: DocumentData) => void;
}

export const CustomLine = ({
  item,
  updateItem,
  deleteItem,
}: CustomLineProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleOnDone = (item: DocumentData) => {
    setIsEditing(false);
    updateItem(item);
  };

  if (isEditing) {
    return <EditLine item={item} onDone={handleOnDone} />;
  }

  return (
    <div className="border-2 border-gray-700 bg-zinc-50 rounded-lg flex justify-between">
      <div className="font-semibold break-words p-2">{item.content}</div>
      <div className="flex flex-col border-l-4 w-12 items-center justify-center">
        <div
          className="flex-1 w-full text-gray-400 hover:text-blue-500 cursor-pointer text-center p-2"
          onClick={() => setIsEditing(true)}
        >
          <EditIcon />
        </div>
        <div
          className="flex-1 w-full text-gray-400 hover:text-red-600 cursor-pointer border-t-4 text-center p-2"
          onClick={() => deleteItem(item)}
        >
          <DeleteIcon />
        </div>
      </div>
    </div>
  );
};

interface EditLineProps {
  item: DocumentData;
  onDone: (item: DocumentData) => void;
}

const EditLine = ({ item, onDone }: EditLineProps) => {
  const [question, setQuestion] = useState(item?.content || "");

  const handleOnDone = () => {
    onDone({ ...item, content: question });
  };

  return (
    <div className="border-2 border-gray-700 bg-zinc-50 rounded-lg flex justify-between">
      <div className="w-full h-full flex">
        <TextArea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          maxLength={250}
          rows={4}
          className="w-full min-h-[96px] outline-none border-0 select-none focus:ring-2"
        />
      </div>
      <div className="w-12 border-l-4">
        <div
          className="flex-1 h-full w-full text-gray-400
         hover:text-blue-500 cursor-pointer text-center p-2 flex items-center"
          onClick={handleOnDone}
        >
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 16 12"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5.917 5.724 10.5 15 1.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

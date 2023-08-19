"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "../shares/button/Button";
import { Input, Label } from "../shares/input/Input";
import { TextArea } from "../shares/input/TextArea";
import { joinClasses } from "@/utils/css";
import shuffle from "lodash/shuffle";
import take from "lodash/take";
import takeRight from "lodash/takeRight";
import flatten from "lodash/flatten";

import chunk from "lodash/chunk";
import { LoadingWrapper } from "../shares/progress/LoadingWrapper";
import { CopyIcon, NumberOrderIcon } from "../shares/icon/Icon";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { Checkbox } from "../shares/input/Checkbox";

export default function RandomPicker() {
  const [type, setType] = useState<"picker" | "group">("picker");
  const [noOfPickedItems, setNoOfPickedItems] = useState<string>("1");
  const [itemPerGroup, setItemPerGroup] = useState<string>("1");
  const [noOfGroup, setNoOfGroup] = useState<string>("1");
  const [groupType, setGroupType] = useState<"item" | "group">("group");

  const [items, setItems] = useState<string[]>([]);
  const [stringItems, setStringItems] = useState("");
  const [result, setResult] = useState<string[]>([]);
  const [groupResult, setGroupResult] = useState<Array<string[]>>([]);

  const [spinning, setSpinning] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [value, copy] = useCopyToClipboard();

  const handleOnChangeNoOfItems = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!value?.trim()) {
      setNoOfPickedItems("");
      return;
    }
    if (!new RegExp(/^\d+$/).test(value)) {
      return;
    }

    setNoOfPickedItems(value);
  };

  const handleOnChangeItemPerGroup = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!value?.trim()) {
      setItemPerGroup("");
      return;
    }
    if (!new RegExp(/^\d+$/).test(value)) {
      return;
    }

    setItemPerGroup(value);
  };

  const handleOnChangeNoOfGroup = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!value?.trim()) {
      setNoOfGroup("");
      return;
    }
    if (!new RegExp(/^\d+$/).test(value)) {
      return;
    }
    setNoOfGroup(value);
  };

  const onTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value?.trim();
    setStringItems(event.target.value);
    const lines = value.split(new RegExp(/\r?\n|\r/g));
    setItems(lines.filter((line) => line?.trim()));
  };

  const handleRandom = () => {
    setSpinning(true);
    const startTime = Date.now();

    if (type === "picker") {
      handlePickerRandom();
    }
    if (type === "group") {
      handleGroupRandom();
    }

    if (Date.now() - startTime < 1000) {
      let timer: NodeJS.Timeout | undefined;
      timer = setTimeout(() => {
        setSpinning(false);
        clearTimeout(timer);
      }, 500);
    } else {
      setSpinning(false);
    }
  };

  const handleGroupRandom = () => {
    let noOfItems = Number(itemPerGroup);
    const shuffleItems = shuffle(items);
    if (groupType === "item") {
      setGroupResult(chunk(shuffleItems, noOfItems));
    }
    if (groupType === "group") {
      noOfItems = Math.floor(items.length / Number(noOfGroup));
      const chunkResult = new Array<string[]>(Number(noOfGroup));

      let startIndex = 0;
      shuffleItems.forEach((item) => {
        if (!chunkResult[startIndex]) {
          chunkResult[startIndex] = [];
        }
        chunkResult[startIndex]?.push(item);

        startIndex += 1;
        if (startIndex >= Number(noOfGroup)) {
          startIndex = 0;
        }
      });
      setGroupResult(chunkResult);
    }
  };

  const handlePickerRandom = () => {
    const shuffleItems = shuffle(items);
    setResult(take(shuffleItems, Number(noOfPickedItems)));
  };

  const handleClipboard = () => {
    if (type === "picker") {
      copy(
        !showOrder
          ? result.join("\r\n")
          : result.map((r, index) => `${index + 1}. ${r}`).join("\r\n")
      );
    }

    if (type === "group") {
      let stringResult = "";
      groupResult.forEach((arr, index) => {
        stringResult += "No." + (index + 1) + "\r\n";
        arr.forEach((item) => {
          stringResult += item + "\r\n";
        });
      });
      copy(stringResult);
    }
  };

  return (
    <div className="flex-auto w-full mt-12 lg:w-4/6 sm:mb-0 lg:mb-12 flex flex-col md:flex-row gap-2 items-start">
      <div className="flex-1 bg-white rounded-md w-full md:w-2/5 py-4 flex flex-col gap-4 px-4">
        <div className="flex justify-center gap-2">
          <div
            className={joinClasses(
              "p-4 bg-slate-200 rounded select-none cursor-pointer font-bold text-purple-700",
              { "ring-4 ring-purple-400": type === "picker" }
            )}
            onClick={() => setType("picker")}
          >
            Picker
          </div>
          <div
            className={joinClasses(
              "p-4 bg-slate-200 rounded select-none cursor-pointer font-bold text-purple-700",
              { "ring-4 ring-purple-400": type === "group" }
            )}
            onClick={() => setType("group")}
          >
            Group
          </div>
        </div>
        {type === "picker" && (
          <div className="flex gap-4 items-center">
            <Label className="w-1/3 py-4 ml-2 text-sm font-medium text-gray-900">
              Number of picked items
            </Label>
            <Input
              className="w-2/3"
              value={noOfPickedItems}
              placeholder="Please input number"
              min={0}
              onChange={handleOnChangeNoOfItems}
            />
          </div>
        )}
        {type === "group" && (
          <>
            <div className="flex gap-2 items-center">
              <Checkbox
                value={"noOfGroup"}
                checked={groupType === "group"}
                onChange={() => setGroupType("group")}
                className="w-1/2"
              >
                Number of groups
              </Checkbox>
              <Input
                className={joinClasses("w-1/2", {
                  "bg-gray-200": groupType !== "group",
                })}
                value={noOfGroup}
                placeholder="Please input number"
                min={0}
                onChange={handleOnChangeNoOfGroup}
                disabled={groupType !== "group"}
              />
            </div>
            <div className="flex gap-2 items-center">
              <Checkbox
                value={"itemPerGroup"}
                checked={groupType === "item"}
                onChange={() => setGroupType("item")}
                className="w-1/2 "
              >
                Items per group
              </Checkbox>
              <Input
                className={joinClasses("w-1/2", {
                  "bg-gray-200": groupType !== "item",
                })}
                value={itemPerGroup}
                placeholder="Please input number"
                min={0}
                onChange={handleOnChangeItemPerGroup}
                disabled={groupType !== "item"}
              />
            </div>
          </>
        )}
        <Button
          className="w-full bg-purple-700 hover:bg-purple-700 text-white select-none"
          onClick={handleRandom}
          variant="custom"
        >
          {type === "picker" && "Pick"}
          {type === "group" && "Generate"}
        </Button>
        {type === "picker" && (
          <LoadingWrapper loading={spinning}>
            {result.length > 1 ? (
              <>
                <div className="flex justify-end gap-2">
                  <NumberOrderIcon
                    className={joinClasses("cursor-pointer h-7 w-7")}
                    onClick={() => setShowOrder(!showOrder)}
                  />
                  <CopyIcon
                    className="cursor-pointer h-7 w-7"
                    onClick={handleClipboard}
                  />
                </div>
                {result.map((r, index) => {
                  return (
                    <div
                      key={index}
                      className="flex text-lg hover:bg-gray-200 hover:rounded px-2"
                    >
                      {showOrder && (
                        <span className="font-semibold">{index + 1}. </span>
                      )}
                      <div className="flex-auto text-center break-all">{r}</div>
                      {showOrder && (
                        <span className="invisible">{index + 1}. </span>
                      )}
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="flex text-lg hover:bg-gray-200 hover:rounded px-2">
                <div className="flex-auto text-center break-all">
                  {result[0] || ""}
                </div>
              </div>
            )}
          </LoadingWrapper>
        )}

        {type === "group" && groupResult.length > 0 && (
          <LoadingWrapper loading={spinning}>
            <div className="flex justify-end gap-2">
              <CopyIcon
                className="cursor-pointer h-7 w-7"
                onClick={handleClipboard}
              />
            </div>
            <div className="divide-y-2">
              {groupResult.map((arr, index) => {
                return (
                  <div
                    key={index}
                    className="text-lg hover:bg-gray-200 hover:rounded px-2 text-center"
                  >
                    <div className="font-bold">No.{index + 1}</div>
                    {arr.map((item, idx) => {
                      return (
                        <div key={idx} className="break-all">
                          {item}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </LoadingWrapper>
        )}
      </div>
      <div className="flex-1 w-full order-first md:order-last md:w-3/5">
        <div className="bg-white rounded-md mb-4 p-4 font-semibold">
          <p>
            Enter everything you want to pick on below input, each on a separate
            line:
          </p>
          <div className="font-semibold text-right text-lg">
            <span className="text-purple-700 font-bold ">{items.length}</span>{" "}
            items
          </div>
        </div>
        <TextArea
          placeholder="Names, numbers, choices... "
          value={stringItems}
          onChange={onTextAreaChange}
          rows={10}
        />
      </div>
    </div>
  );
}

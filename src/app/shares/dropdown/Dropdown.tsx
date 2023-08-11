"use client";
import React from "react";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";

import { useOnClickOutside } from "@/hooks";

interface DropdownProps extends React.PropsWithChildren {
  anchor: React.ReactNode;
}

export const Dropdown = ({ children, anchor }: DropdownProps) => {
  const [referenceElement, setReferenceElement] =
    React.useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] =
    React.useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement);
  const [show, setShow] = React.useState(false);
  useOnClickOutside(popperElement, () => setShow(false));

  // const [style, setStyle] = useState<any>(null);
  // const anchorRef = useRef<HTMLDivElement>(null);
  // const hiddenRef = useRef<HTMLDivElement>(null);
  // const dropdownRef = useRef<HTMLDivElement>(null);

  // const onClickAnchor = () => {
  //   const anchorRect = anchorRef.current?.getBoundingClientRect();
  //   const dropdownRect = hiddenRef.current?.getBoundingClientRect();
  //   const dropdownHeight = dropdownRect?.height || 0;
  //   const dropdownWidth = dropdownRect?.width || 0;
  //   console.log("dropdownHeight", dropdownHeight);
  //   console.log("dropdownWidth", dropdownWidth);

  //   let positionY = (anchorRect?.top || 0) + (anchorRect?.height || 0) + 10;
  //   let positionX = (anchorRect?.left || 0) - Math.floor(dropdownWidth / 2);
  //   console.log("anchorRect?.left", anchorRect?.left);

  //   const contentHeight = window.innerHeight || document.body.clientHeight;
  //   const contentWidth = window.innerWidth || document.body.clientWidth;

  //   if (
  //     contentHeight > dropdownHeight + 10 &&
  //     positionY + dropdownHeight > contentHeight
  //   ) {
  //     positionY -= dropdownHeight + 10;
  //   }

  //   if ((anchorRect?.left || 0) + dropdownWidth > contentWidth) {
  //     positionX = contentWidth - dropdownWidth;
  //   }
  //   console.log("positionX + dropdownWidth", positionX + dropdownWidth);
  //   console.log("contentWidth", contentWidth);
  //   console.log("positionX", positionX);

  //   setStyle({
  //     top: positionY,
  //     left: positionX,
  //   });
  // };

  return (
    <div>
      <div
        ref={(ref) => setReferenceElement(ref)}
        onClick={() => setShow(true)}
      >
        {anchor}
      </div>
      {show &&
        createPortal(
          <div
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
            className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
          >
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              {children}
            </ul>
          </div>,
          document.body
        )}
      {/* {style ? createPortal(element, document.body) : undefined} */}
    </div>
  );
};

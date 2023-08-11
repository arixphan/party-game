import { MouseEventHandler } from "react";

import { joinClasses } from "@/utils/css";

interface IconProps {
  className?: string;
  onClick?: MouseEventHandler<SVGSVGElement> | undefined;
}

export const EditIcon = ({ onClick, className = "" }: IconProps) => {
  return (
    <svg
      className={joinClasses("w-6 h-6 ", className)}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 21 21"
      onClick={onClick}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M7.418 17.861 1 20l2.139-6.418m4.279 4.279 10.7-10.7a3.027 3.027 0 0 0-2.14-5.165c-.802 0-1.571.319-2.139.886l-10.7 10.7m4.279 4.279-4.279-4.279m2.139 2.14 7.844-7.844m-1.426-2.853 4.279 4.279"
      />
    </svg>
  );
};

export const PlayIcon = ({ onClick, className = "" }: IconProps) => {
  return (
    <svg
      className={joinClasses("w-6 h-6 ", className)}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 14 16"
      onClick={onClick}
    >
      <path d="M0 .984v14.032a1 1 0 0 0 1.506.845l12.006-7.016a.974.974 0 0 0 0-1.69L1.506.139A1 1 0 0 0 0 .984Z" />
    </svg>
  );
};

export const LeftIcon = ({ onClick, className = "" }: IconProps) => {
  return (
    <svg
      className="w-6 h-6 "
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 10"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 5H1m0 0 4 4M1 5l4-4"
      />
    </svg>
  );
};

export const CloseIcon = ({ onClick, className = "" }: IconProps) => {
  return (
    <svg
      className={joinClasses("w-6 h-6", className)}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 14"
      onClick={onClick}
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
      />
    </svg>
  );
};

export const DeleteIcon = ({ onClick, className = "" }: IconProps) => {
  return (
    <svg
      className={joinClasses("w-6 h-6", className)}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 18 20"
      onClick={onClick}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
      />
    </svg>
  );
};

export const MainIcon = ({ onClick, className = "" }: IconProps) => {
  return (
    <svg
      className={joinClasses("w-6 h-6", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#ea1010"
      onClick={onClick}
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <g id="Interface / Main_Component">
          <g id="Vector">
            <path
              d="M11.2348 2.37392C10.8672 2.52616 10.5377 2.85565 9.8788 3.51457C9.22003 4.17335 8.8904 4.50298 8.73818 4.87047C8.53519 5.36053 8.53519 5.91121 8.73818 6.40126C8.89042 6.76881 9.21989 7.09828 9.87883 7.75722C10.5374 8.41578 10.8673 8.74568 11.2347 8.89788C11.7248 9.10086 12.2755 9.10086 12.7655 8.89787C13.1331 8.74563 13.4625 8.41616 14.1215 7.75722C14.7804 7.09828 15.1089 6.76881 15.2612 6.40126C15.4641 5.91121 15.4641 5.36053 15.2612 4.87047C15.1089 4.50293 14.7804 4.17351 14.1215 3.51457C13.4625 2.85564 13.1331 2.52616 12.7655 2.37392C12.2755 2.17093 11.7248 2.17093 11.2348 2.37392Z"
              stroke="#6140b0"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M4.8705 8.73769C4.50296 8.88993 4.17348 9.21941 3.51455 9.87834C2.85579 10.5371 2.52614 10.8668 2.37392 11.2342C2.17093 11.7243 2.17093 12.275 2.37392 12.765C2.52616 13.1326 2.85564 13.4621 3.51457 14.121C4.17314 14.7796 4.50303 15.1094 4.87047 15.2616C5.36053 15.4646 5.91121 15.4646 6.40126 15.2616C6.76881 15.1094 7.09828 14.7799 7.75722 14.121C8.41616 13.4621 8.74466 13.1326 8.8969 12.765C9.09989 12.275 9.09989 11.7243 8.8969 11.2342C8.74466 10.8667 8.41616 10.5373 7.75722 9.87834C7.09828 9.2194 6.76881 8.88993 6.40126 8.73769C5.91121 8.5347 5.36056 8.5347 4.8705 8.73769Z"
              stroke="#6140b0"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M16.2431 9.87834C15.5843 10.5371 15.2547 10.8667 15.1024 11.2342C14.8994 11.7243 14.8994 12.275 15.1024 12.765C15.2547 13.1326 15.5842 13.462 16.2431 14.121C16.9016 14.7795 17.2316 15.1094 17.599 15.2616C18.089 15.4646 18.6397 15.4646 19.1298 15.2616C19.4973 15.1094 19.8268 14.7799 20.4857 14.121C21.1447 13.4621 21.4732 13.1326 21.6254 12.765C21.8284 12.275 21.8284 11.7243 21.6254 11.2342C21.4732 10.8667 21.1447 10.5373 20.4857 9.87834C19.8268 9.21941 19.4973 8.88993 19.1298 8.73769C18.6397 8.5347 18.0891 8.5347 17.599 8.73769C17.2315 8.88993 16.902 9.21941 16.2431 9.87834Z"
              stroke="#6140b0"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M11.2348 15.1019C10.8672 15.2542 10.5377 15.5837 9.8788 16.2426C9.22004 16.9014 8.8904 17.231 8.73818 17.5985C8.53519 18.0886 8.53519 18.6392 8.73818 19.1293C8.89042 19.4968 9.21989 19.8263 9.87883 20.4852C10.5374 21.1438 10.8673 21.4737 11.2347 21.6259C11.7248 21.8289 12.2755 21.8289 12.7655 21.6259C13.1331 21.4737 13.4625 21.1442 14.1215 20.4852C14.7804 19.8263 15.1089 19.4968 15.2612 19.1293C15.4641 18.6392 15.4641 18.0886 15.2612 17.5985C15.1089 17.231 14.7804 16.9015 14.1215 16.2426C13.4625 15.5837 13.1331 15.2542 12.7655 15.1019C12.2755 14.899 11.7248 14.899 11.2348 15.1019Z"
              stroke="#6140b0"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  );
};

export const CirclePlus = ({
  onClick,
  className = "",
  color = "#fff",
}: IconProps & { color?: string }) => {
  return (
    <svg
      className={joinClasses("w-6 h-6", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9L11.25 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H11.25V15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.4142 12.75 15L12.75 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12.75V9Z"
          fill={color}
        ></path>
      </g>
    </svg>
  );
};

export const TextEditIcon = ({
  onClick,
  className = "",
  color = "#fff",
}: IconProps & { color?: string }) => {
  return (
    <svg
      className={joinClasses("w-6 h-6", className)}
      onClick={onClick}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
        <path
          d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </g>
    </svg>
  );
};

export const CircleRemoveIcon = ({
  onClick,
  className = "",
  color = "#fff",
}: IconProps & { color?: string }) => {
  return (
    <svg
      className={joinClasses("w-6 h-6", className)}
      onClick={onClick}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10ZM8 11a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8Z"
          fill={color}
        ></path>
      </g>
    </svg>
  );
};

export const DoneIcon = ({
  onClick,
  className = "",
  color = "#fff",
}: IconProps & { color?: string }) => {
  return (
    <svg
      className={joinClasses("w-6 h-6", className)}
      onClick={onClick}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12 21C16.9706 21 21 16.9706 21 12C21 10.1666 20.4518 8.46124 19.5103 7.03891L12.355 14.9893C11.6624 15.7589 10.4968 15.8726 9.66844 15.2513L6.4 12.8C5.95817 12.4686 5.86863 11.8418 6.2 11.4C6.53137 10.9582 7.15817 10.8686 7.6 11.2L10.8684 13.6513L18.214 5.48955C16.5986 3.94717 14.4099 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
          fill={color}
        ></path>
      </g>
    </svg>
  );
};

export const StartIcon = ({
  onClick,
  className = "w-6 h-6",
  color = "#6140B0",
}: IconProps & { color?: string }) => {
  return (
    <svg
      className={joinClasses(className)}
      onClick={onClick}
      fill="#000000"
      viewBox="0 0 24 24"
      id="play"
      data-name="Flat Line"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          id="secondary"
          d="M12,3a9,9,0,1,0,9,9A9,9,0,0,0,12,3ZM10,16V8l6,4Z"
          style={{ fill: color, strokeWidth: 2 }}
        ></path>
        <path
          id="primary"
          d="M16,12l-6,4V8ZM12,3a9,9,0,1,0,9,9A9,9,0,0,0,12,3Z"
          style={{
            fill: "none",
            stroke: "#000000",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: 2,
          }}
        ></path>
      </g>
    </svg>
  );
};

export const BackIcon = ({
  onClick,
  className = "w-6 h-6",
  color = "#6140B0",
}: IconProps & { color?: string }) => {
  return (
    <svg
      className={joinClasses(className)}
      onClick={onClick}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#121212"
      stroke-width="2.4"
      transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke="#CCCCCC"
        stroke-width="0.048"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM13.92 16.13H9C8.59 16.13 8.25 15.79 8.25 15.38C8.25 14.97 8.59 14.63 9 14.63H13.92C15.2 14.63 16.25 13.59 16.25 12.3C16.25 11.01 15.21 9.97 13.92 9.97H8.85L9.11 10.23C9.4 10.53 9.4 11 9.1 11.3C8.95 11.45 8.76 11.52 8.57 11.52C8.38 11.52 8.19 11.45 8.04 11.3L6.47 9.72C6.18 9.43 6.18 8.95 6.47 8.66L8.04 7.09C8.33 6.8 8.81 6.8 9.1 7.09C9.39 7.38 9.39 7.86 9.1 8.15L8.77 8.48H13.92C16.03 8.48 17.75 10.2 17.75 12.31C17.75 14.42 16.03 16.13 13.92 16.13Z"
          fill="#6140B0"
        ></path>{" "}
      </g>
    </svg>
  );
};

export const BackOutlineIcon = ({
  onClick,
  className = "w-6 h-6",
  color = "#6140B0",
}: IconProps & { color?: string }) => {
  return (
    <svg
      className={joinClasses(className)}
      onClick={onClick}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
        <g opacity="0.4">
          <path
            d="M9.00039 15.3802H13.9204C15.6204 15.3802 17.0004 14.0002 17.0004 12.3002C17.0004 10.6002 15.6204 9.22021 13.9204 9.22021H7.15039"
            stroke={color}
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M8.57 10.7701L7 9.19012L8.57 7.62012"
            stroke={color}
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </g>
      </g>
    </svg>
  );
};

export const BackWardIcon = ({
  onClick,
  className = "w-6 h-6",
  color = "#6140B0",
}: IconProps & { color?: string }) => {
  return (
    <svg
      className={joinClasses(className)}
      onClick={onClick}
      fill="#000000"
      viewBox="0 0 24 24"
      id="backward-circle"
      data-name="Flat Line"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          id="secondary"
          d="M12,3a9,9,0,1,0,9,9A9,9,0,0,0,12,3Zm3,12.5L9,12l6-3.5Z"
          style={{ fill: color, strokeWidth: 2 }}
        ></path>
        <path
          id="primary"
          d="M15,8.5v7L9,12ZM9,8v8M12,3a9,9,0,1,0,9,9A9,9,0,0,0,12,3Z"
          style={{
            fill: "none",
            stroke: "#000000",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: 2,
          }}
        ></path>
      </g>
    </svg>
  );
};

export const LoginIcon = ({
  onClick,
  className = "w-6 h-6",
  color = "#6140B0",
}: IconProps & { color?: string }) => {
  return (
    <svg
      className={joinClasses(className)}
      onClick={onClick}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M20.1633 4.09295L15.0612 2.17072C14.1429 1.86721 13.2245 1.96838 12.5102 2.47423C12.2041 2.67657 12 2.87891 11.7959 3.08125H7.91837C6.38776 3.08125 5.06122 4.39646 5.06122 5.91401V6.9257C5.06122 7.33038 5.36735 7.73506 5.87755 7.73506C6.38776 7.73506 6.69388 7.33038 6.69388 6.9257V5.91401C6.69388 5.20582 7.30612 4.69997 7.91837 4.69997H11.2857V19.3696H7.91837C7.20408 19.3696 6.69388 18.7626 6.69388 18.1555V17.1439C6.69388 16.7392 6.38776 16.3345 5.87755 16.3345C5.36735 16.3345 5.06122 16.638 5.06122 17.0427V18.0544C5.06122 19.5719 6.28572 20.8871 7.91837 20.8871H11.7959C12 21.0895 12.2041 21.393 12.4082 21.4942C12.9184 21.7977 13.4286 22 14.0408 22C14.3469 22 14.7551 21.8988 15.0612 21.7977L20.1633 19.8754C21.2857 19.4708 22 18.4591 22 17.245V6.62219C22 5.50933 21.1837 4.39646 20.1633 4.09295Z"
          fill={color}
        ></path>
        <path
          d="M6.38776 13.5017C6.08163 13.8052 6.08163 14.3111 6.38776 14.6146C6.4898 14.7158 6.69388 14.8169 6.89796 14.8169C7.10204 14.8169 7.30612 14.7158 7.40816 14.6146L9.44898 12.5912C9.55102 12.49 9.55102 12.3889 9.65306 12.3889C9.65306 12.2877 9.7551 12.1865 9.7551 12.0854C9.7551 11.9842 9.7551 11.883 9.65306 11.7819C9.65306 11.6807 9.55102 11.5795 9.44898 11.5795L7.40816 9.55612C7.10204 9.25261 6.59184 9.25261 6.28571 9.55612C5.97959 9.85963 5.97959 10.3655 6.28571 10.669L7 11.3772H2.81633C2.40816 11.3772 2 11.6807 2 12.1865C2 12.6924 2.30612 12.9959 2.81633 12.9959H7.10204L6.38776 13.5017Z"
          fill={color}
        ></path>
      </g>
    </svg>
  );
};

export const LogoutIcon = ({
  onClick,
  className = "w-6 h-6",
  color = "#6140B0",
}: IconProps & { color?: string }) => {
  return (
    <svg
      className={joinClasses(className)}
      onClick={onClick}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M22 6.62219V17.245C22 18.3579 21.2857 19.4708 20.1633 19.8754L15.0612 21.7977C14.7551 21.8988 14.449 22 14.0408 22C13.5306 22 12.9184 21.7977 12.4082 21.4942C12.2041 21.2918 11.898 21.0895 11.7959 20.8871H7.91837C6.38776 20.8871 5.06122 19.6731 5.06122 18.0544V17.0427C5.06122 16.638 5.36735 16.2333 5.87755 16.2333C6.38776 16.2333 6.69388 16.5368 6.69388 17.0427V18.0544C6.69388 18.7626 7.30612 19.2684 7.91837 19.2684H11.2857V4.69997H7.91837C7.20408 4.69997 6.69388 5.20582 6.69388 5.91401V6.9257C6.69388 7.33038 6.38776 7.73506 5.87755 7.73506C5.36735 7.73506 5.06122 7.33038 5.06122 6.9257V5.91401C5.06122 4.39646 6.28572 3.08125 7.91837 3.08125H11.7959C12 2.87891 12.2041 2.67657 12.4082 2.47423C13.2245 1.96838 14.1429 1.86721 15.0612 2.17072L20.1633 4.09295C21.1837 4.39646 22 5.50933 22 6.62219Z"
          fill={color}
        ></path>
        <path
          d="M4.85714 14.8169C4.65306 14.8169 4.44898 14.7158 4.34694 14.6146L2.30612 12.5912C2.20408 12.49 2.20408 12.3889 2.10204 12.3889C2.10204 12.2877 2 12.1865 2 12.0854C2 11.9842 2 11.883 2.10204 11.7819C2.10204 11.6807 2.20408 11.5795 2.30612 11.5795L4.34694 9.55612C4.65306 9.25261 5.16327 9.25261 5.46939 9.55612C5.77551 9.85963 5.77551 10.3655 5.46939 10.669L4.7551 11.3772H8.93878C9.34694 11.3772 9.7551 11.6807 9.7551 12.1865C9.7551 12.6924 9.34694 12.7936 8.93878 12.7936H4.65306L5.36735 13.5017C5.67347 13.8052 5.67347 14.3111 5.36735 14.6146C5.26531 14.7158 5.06122 14.8169 4.85714 14.8169Z"
          fill={color}
        ></path>
      </g>
    </svg>
  );
};

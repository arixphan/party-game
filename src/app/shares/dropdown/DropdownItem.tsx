interface DropdownItemProps extends React.PropsWithChildren {}
export const DropdownItem = ({ children }: DropdownItemProps) => {
  return (
    <li className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
      {children}
    </li>
  );
};

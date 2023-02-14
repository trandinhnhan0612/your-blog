import React from "react";
import { useDropdown } from "./dropdown-context";

const Option = (props) => {
  const { onClick } = props;
  const { setShow } = useDropdown();
  const handleClick = () => {
    onClick && onClick();
    // if has onClick, we will call onClick()
    setShow(false);
    // setShow(false) to close drop down
  };
  return (
    <div
      className="py-[15px] px-[25px] cursor-pointer flex items-center justify-between hover:text-textHover transition-all"
      onClick={handleClick}
    >
      {props.children}
    </div>
  );
};

export default Option;

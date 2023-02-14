import React from "react";
import styled from "styled-components";

const LabelStyles = styled.label`
  color: ${(props) => props.theme.gray4B};
  font-weight: 500;
  cursor: pointer;
`;
const Label = ({ htmlFor = "", children, ...props }) => {
  return (
    <LabelStyles htmlFor={htmlFor} {...props}>
      {/* htmlFor is label when we click in, it will focus in input */}
      {/* ...props is properties the rest as onClick, classname,... */}
      {children}
      {/* children is middle part we can input  */}
    </LabelStyles>
  );
};

export default Label;

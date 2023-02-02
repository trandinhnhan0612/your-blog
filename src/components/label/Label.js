import React from "react";
import styled from "styled-components";

const LabelStyles = styled.label`
  color: ${(props) => props.theme.grayDark};
  font-weight: 600;
  cursor: pointer;
`;
const Label = ({ htmlFor = "", children, ...props }) => {
  return (
    <LabelStyles htmlFor={htmlFor} {...props}>
      {/* htmlFor là cái label khi chúng ta nhấn vào nó sẽ được focus vào input */}
      {/* ...props là các properties còn lại như onClick, classname,... */}
      {children}
      {/* children là cái ở giữa chúng ta có thể điền chữ vào  */}
    </LabelStyles>
  );
};

export default Label;

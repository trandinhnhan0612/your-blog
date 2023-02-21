import React from "react";
import styled from "styled-components";
import { useController } from "react-hook-form";

const TextareaStyles = styled.div`
  position: relative;
  width: 100%;
  textarea {
    width: 100%;
    padding: 15px 25px;
    background-color: transparent;
    border: 1px solid ${(props) => props.theme.grayLight};
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.2s linear;
    resize: none;
    min-height: 200px;
  }
  textarea :focus {
    background-color: white;
    border-color: ${(props) => props.theme.notFound};
  }
  textarea ::-webkit-input-placeholder {
    color: #84878b;
  }
  textarea ::-moz-input-placeholder {
    color: #84878b;
  }
`;
/**
 * @param {*} placeholder(optional) - Placeholder of Textarea
 * @param {*} name(optional) - name of Textarea
 * @param {*} control - control from react hook form
 * @returns {*} Textarea
 */
const Textarea = ({
  name = "",
  type = "text",
  children,
  control,
  ...props
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <TextareaStyles>
      <textarea id={name} type={type} {...field} {...props} />
    </TextareaStyles>
  );
};

export default Textarea;

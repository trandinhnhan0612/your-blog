import React from "react";
import styled from "styled-components";
import { Loading } from "../loading";
import PropTypes from "prop-types";

const ButtonStyles = styled.button`
  cursor: pointer;
  padding: 0 20px;
  border-radius: 6px;
  line-height: 1;
  color: white;
  font-size: 18px;
  height: ${(props) => props.height || "66px"};
  font-weight: 600;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.greenLight},
    ${(props) => props.theme.blueLight}
  );
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;
/**
 * @param onClick - handle onClick
 * @requires
 * @param {string} type - Type of "button" | "submit"
 */
const Button = ({
  type = "button",
  onClick = () => {},
  children,
  ...props
}) => {
  const { isLoading } = props;
  const child = !!isLoading ? <Loading></Loading> : children; // 2 dấu !! covert thành boolean
  return (
    <ButtonStyles type={type} onClick={onClick} {...props}>
      {child}
    </ButtonStyles>
  );
};
Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit"]).isRequired,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default Button;

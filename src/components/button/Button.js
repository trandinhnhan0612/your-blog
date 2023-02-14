import React from "react";
import styled, { css } from "styled-components";
import { Loading } from "../loading";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const ButtonStyles = styled.button`
  cursor: pointer;
  padding: 0 20px;
  border-radius: 6px;
  line-height: 1;
  color: white;
  font-size: 18px;
  height: ${(props) => props.height || "66px"};
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.kind === "secondary" &&
    css`
      background-color: white;
      color: ${(props) => props.theme.sidebarHover};
    `}
  ${(props) =>
    props.kind === "primary" &&
    css`
      color: white;
      background-image: linear-gradient(
        to right bottom,
        ${(props) => props.theme.primary1},
        ${(props) => props.theme.secondary1}
      );
    `};
  ${(props) =>
    props.kind === "ghost" &&
    css`
      color: ${(props) => props.theme.sidebarHover};
      background-color: #fff7ed;
    `};
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
  kind = "primary",
  // này là để màu mặc định
  ...props
}) => {
  const { isLoading, to } = props;
  const child = !!isLoading ? <Loading></Loading> : children; // 2 dấu !! covert thành boolean
  if (to !== "" && typeof to === "string") {
    return (
      <NavLink to={to} className="inline-block">
        <ButtonStyles type={type} kind={kind} {...props}>
          {child}
        </ButtonStyles>
      </NavLink>
    );
  }
  return (
    <ButtonStyles type={type} kind={kind} onClick={onClick} {...props}>
      {child}
    </ButtonStyles>
  );
};
Button.propTypes = {
  // dùng để check kiểu
  type: PropTypes.oneOf(["button", "submit"]),
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
  kind: PropTypes.oneOf(["primary", "secondary", "ghost"]),
};

export default Button;

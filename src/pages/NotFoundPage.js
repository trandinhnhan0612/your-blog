import React from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
const NotFoundPageStyles = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .logo {
    display: inline-block;
    margin-bottom: 20px;
  }
  .heading {
    font-size: 60px;
    font-weight: bold;
    margin-bottom: 30px;
  }
  .back {
    display: inline-block;
    font-weight: 500;
    font-size: 25px;
    padding: 15px 30px;
    color: white;
    background-color: ${(props) => props.theme.notFound};
    border-radius: 10px;
  }
`;

const NotFoundPage = () => {
  useEffect(() => {
    document.title = "Not found 404";
  });
  return (
    <NotFoundPageStyles>
      <NavLink to={"/"} className={"logo"}>
        <img
          srcSet="/logo3.png 2x"
          alt="your-blog"
          width={"300px"}
          height={"300px"}
        />
      </NavLink>
      <h1 className="heading">Oops! Page not found</h1>
      <NavLink to={"/"} className={"back"}>
        Back to Home
      </NavLink>
    </NotFoundPageStyles>
  );
};

export default NotFoundPage;

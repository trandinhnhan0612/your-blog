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
  background-color: ${(props) => props.theme.gray4B};
  color: white;
  .page-content {
    max-width: 1000px;
    margin: 0 auto;
    text-align: center;
  }
  .heading {
    font-size: 50px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .desc {
    max-width: 800px;
    font-size: 20px;
    margin-bottom: 20px;
  }
  .back {
    display: inline-block;
    font-weight: 500;
    font-size: 25px;
    padding: 15px 30px;
    background-color: ${(props) => props.theme.notFound};
    border-radius: 8px;
  }
  .image {
    max-width: 250px;
    margin: 0 auto 40px;
  }
`;

const PageNotFound = () => {
  useEffect(() => {
    document.title = "Not found 404";
  });
  return (
    <NotFoundPageStyles>
      <div className="page-content">
        <img src="/404err.png" alt="notfound" className="image" />
        <h1 className="heading">Ooops...Something with wrong!</h1>
        <p className="desc">
          Sorry, the page you're looking for doesn't exist, isn't available or
          was loading incorrectly.
        </p>
      </div>
      <NavLink to={"/"} className={"back"}>
        Back to Home
      </NavLink>
    </NotFoundPageStyles>
  );
};

export default PageNotFound;

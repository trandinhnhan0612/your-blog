import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const AuthPageStyles = styled.div`
  min-height: 100vh;
  padding: 40px;
  .logo {
    margin: 0 auto;
  }
  .heading {
    text-align: center;
    color: transparent;
    background-image: linear-gradient(
      to right bottom,
      ${(props) => props.theme.greenLight},
      ${(props) => props.theme.blueLight}
    );
    -webkit-background-clip: text;
    background-clip: text;
    font-weight: bold;
    font-size: 46px;
    margin-bottom: 60px;
  }
  .form {
    max-width: 600px;
    margin: 0 auto;
  }
  .have-account {
    margin-bottom: 20px;
    a {
      display: inline-block;
      color: ${(props) => props.theme.greenLight};
      font-weight: 500;
    }
  }
`;

const AuthPage = ({ children }) => {
  return (
    <AuthPageStyles>
      <div className="container">
        <NavLink to={"/"}>
          <img srcSet="/logo2.png 2x" alt="your-blog" className="logo" />
        </NavLink>
        <h1 className="heading">Your Blogger</h1>
        {children}
      </div>
    </AuthPageStyles>
  );
};

export default AuthPage;

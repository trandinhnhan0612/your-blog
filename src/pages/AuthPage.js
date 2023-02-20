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
      ${(props) => props.theme.primary1},
      ${(props) => props.theme.secondary1}
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
      color: ${(props) => props.theme.notFound};
      font-weight: 500;
    }
  }
`;

const AuthPage = ({ children }) => {
  return (
    <AuthPageStyles>
      <div className="container">
        <div className="text-center">
          <NavLink to={"/"} className="inline-block">
            <img srcSet="/logo3.png 2x" alt="your-blog" className="logo" />
          </NavLink>
        </div>
        <h1 className="heading">Your Blog</h1>
        {children}
      </div>
    </AuthPageStyles>
  );
};

export default AuthPage;

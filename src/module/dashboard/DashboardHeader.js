import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/button/Button";
const DashboardHeaderStyles = styled.div`
  background-color: white;
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  .logo {
    display: flex;
    align-items: center;
    gap: 15px;
    font-size: 20px;
    font-weight: 600;
    img {
      max-width: 50px;
    }
  }
  .header-avatar {
    width: 52px;
    height: 52px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 100rem;
    }
  }
  .header-right {
    display: flex;
    align-items: center;
    column-gap: 20px;
  }
`;

const DashboardHeader = () => {
  return (
    <DashboardHeaderStyles>
      <NavLink to="/" className="logo">
        <img srcSet="/logo3.png" alt="your-blog" className="logo" />
        <span className="hidden lg:inline-block ">Your Blog</span>
      </NavLink>
      <div className="header-right">
        <Button to="/dashboard" className="header-button" height="52px">
          Viết bài mới
        </Button>
        <div className="header-avatar">
          <img srcSet="/avatars.jpg 2x" alt="" />
        </div>
      </div>
    </DashboardHeaderStyles>
  );
};

export default DashboardHeader;

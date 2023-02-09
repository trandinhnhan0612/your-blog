import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import DashboardHeader from "./DashboardHeader";
import SideBar from "./SideBar";
const DashboardLayoutStyles = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  .dashboard {
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 40px;
      letter-spacing: 1px;
      color: ${(props) => props.theme.primary};
    }
    &-main {
      display: grid;
      grid-template-columns: 300px minmax(0, 1fr);
      padding: 40px 20px;
      gap: 0 40px;
      align-items: start;
    }
  }
`;

const DashboardLayout = ({ children }) => {
  return (
    <DashboardLayoutStyles>
      <DashboardHeader></DashboardHeader>
      <div className="dashboard-main">
        <SideBar></SideBar>
        <div className="dashboard-children">
          <Outlet></Outlet>
        </div>
      </div>
    </DashboardLayoutStyles>
  );
};

export default DashboardLayout;

import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../contexts/auth-context";
import PageNotFound from "../../pages/PageNotFound";
import DashboardHeader from "./DashboardHeader";
import SideBar from "./SideBar";
const DashboardLayoutStyles = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  .dashboard {
    &-heading {
      font-weight: bold;
      font-size: 30px;
      margin-bottom: 5px;
      color: ${(props) => props.theme.textHeadingDash};
    }
    &-short-desc {
      color: ${(props) => props.theme.gray80};
    }
    &-main {
      display: grid;
      grid-template-columns: 300px minmax(0, 1fr);
      padding: 40px 20px;
      gap: 0 40px;
      align-items: start;
    }
    @media screen and(max-width: 1023.98px) {
      &-heading {
        font-size: 20px;
      }
      &-main {
        grid-template-columns: 100%;
        padding: 20px;
      }
    }
  }
`;

const DashboardLayout = () => {
  const { userInfor } = useAuth();
  if (!userInfor) return <PageNotFound></PageNotFound>;
  console.log(userInfor);
  return (
    <DashboardLayoutStyles>
      <DashboardHeader></DashboardHeader>
      <div className="dashboard-main">
        <SideBar></SideBar>
        <div className="dashboard-children">
          <Outlet></Outlet>
          {/* outlet as children in dashboardlayout help display content: (postAddNew,...)  */}
        </div>
      </div>
    </DashboardLayoutStyles>
  );
};

export default DashboardLayout;

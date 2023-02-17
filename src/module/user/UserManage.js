import React from "react";
import { Button } from "../../components/button";

import DashboardHeading from "../dashboard/DashboardHeading";
import UserTable from "./UserTable";

const UserManage = () => {
  return (
    <div>
      <DashboardHeading title="Tài khoản" desc="Quản lý tài khoản người dùng">
        <Button to="/manage/add-user" kind="ghost" height="52px">
          Thêm tài khoản mới
        </Button>
      </DashboardHeading>
      <UserTable></UserTable>
    </div>
  );
};

export default UserManage;

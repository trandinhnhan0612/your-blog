import React from "react";
import { Button } from "../../components/button";
import { useAuth } from "../../contexts/auth-context";
import { userRole } from "../../utils/constants";

import DashboardHeading from "../dashboard/DashboardHeading";
import UserTable from "./UserTable";

const UserManage = () => {
  // const { userInfor } = useAuth();
  // if (userInfor.role !== userRole.ADMIN) return null;
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

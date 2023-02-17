import React from "react";
import { Table } from "../../components/table";
import { useEffect } from "react";
import { useState } from "react";
import { ActionDelete, ActionEdit } from "../../components/action";
import { db } from "../../firebase-data/firebase-config";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { userStatus, userRole } from "../../utils/constants";
import LabelStatus from "../../components/label/LabelStatus";
import { deleteUser } from "firebase/auth";
import Swal from "sweetalert2";

const UserTable = () => {
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const colRef = collection(db, "users");
    onSnapshot(colRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setUserList(results);
    });
  }, []);
  const renderLabelStatus = (status) => {
    switch (status) {
      case userStatus.ACTIVE:
        return <LabelStatus type="success">Active</LabelStatus>;
      case userStatus.PENDING:
        return <LabelStatus type="warning">Pending</LabelStatus>;
      case userStatus.BAN:
        return <LabelStatus type="danger">Ban</LabelStatus>;
      default:
        break;
    }
  };
  const renderUserRole = (role) => {
    switch (role) {
      case userRole.ADMIN:
        return "Admin";
      case userRole.MOD:
        return "Moderator";
      case userRole.USER:
        return "User";
      default:
        break;
    }
  };
  const handleDeleteUser = async (user) => {
    const colRef = doc(db, "users", user.id);
    Swal.fire({
      title: "Bạn muốn xóa tài khoản người dùng này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(colRef);
        await deleteUser(user);
        Swal.fire("Xóa thành công!", "Tài khoản này đã được xóa", "success");
      }
    });
  };
  const renderUSerList = (user) => {
    return (
      <tr key={user.id}>
        <td title={user.id}>{user.id.slice(0, 5) + "..."}</td>
        <td className="whitespace-nowrap">
          <div className="flex items-center gap-x-3">
            <img
              srcSet={user?.avatar}
              alt=""
              className="w-10 h-10 rounded-md object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <h3>{user?.fullname}</h3>
              <time className="text-sm text-gray-400">
                {new Date(user?.createdAt?.seconds * 1000).toLocaleDateString(
                  "vi-Vi"
                )}
              </time>
            </div>
          </div>
        </td>
        <td>{user?.username}</td>
        <td>{user?.email}</td>
        <td>{renderLabelStatus(Number(user?.status))}</td>
        <td>{renderUserRole(Number(user?.role))}</td>
        <td>
          <div className="flex gap-5 text-gray-400">
            <ActionEdit
              onClick={() => navigate(`/manage/update-user?id=${user.id}`)}
            ></ActionEdit>
            <ActionDelete onClick={() => handleDeleteUser(user)}></ActionDelete>
          </div>
        </td>
      </tr>
    );
  };
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Thông tin</th>
            <th>Tên người dùng</th>
            <th>Địa chỉ email</th>
            <th>Trạng thái</th>
            <th>Vai trò</th>
            <th>Hoạt động</th>
          </tr>
        </thead>
        <tbody>
          {userList.length > 0 && userList.map((user) => renderUSerList(user))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserTable;

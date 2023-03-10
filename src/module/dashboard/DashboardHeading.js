import React from "react";

const DashboardHeading = ({ title = "", desc = "", children }) => {
  return (
    <div className="mb-10 flex items-center justify-between">
      <div>
        <h1 className="dashboard-heading">{title}</h1>
        <p className="dashboard-short-desc">{desc}</p>
      </div>
      {children}
      {/* children here is button "Thêm danh mục mới" in CategoryManage.js */}
    </div>
  );
};

export default DashboardHeading;

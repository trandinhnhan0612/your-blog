import React from "react";
import { useForm } from "react-hook-form";
import DashboardHeading from "../dashboard/DashboardHeading";
import { ImageUpload } from "../../components/image";
import { Field } from "../../components/field";
import { Label } from "../../components/label";
import { Input } from "../../components/input";
import { Button } from "../../components/button";

const UserProfile = () => {
  const { control } = useForm({
    mode: "onChange",
  });
  return (
    <div>
      <DashboardHeading
        title="Thông tin tài khoản"
        desc="Cập nhật thông tin tài khoản của bạn"
      ></DashboardHeading>
      <form>
        <div className="text-center mb-10">
          <ImageUpload className="w-[200px] h-[200px] !rounded-full min-h-0 mx-auto"></ImageUpload>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Họ và tên</Label>
            <Input
              control={control}
              name="fullname"
              placeholder="Nhập họ và tên của bạn"
            ></Input>
          </Field>
          <Field>
            <Label>Tên người dùng</Label>
            <Input
              control={control}
              name="username"
              placeholder="Nhập tên người dùng của bạn"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Ngày sinh</Label>
            <Input
              control={control}
              name="birthday"
              placeholder="dd/mm/yy"
            ></Input>
          </Field>
          <Field>
            <Label>Số điện thoại</Label>
            <Input
              control={control}
              name="phone"
              placeholder="Nhập số điện thoại của bạn"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <Input
              control={control}
              name="email"
              type="email"
              placeholder="Nhập địa chỉ email của bạn"
            ></Input>
          </Field>
          <Field></Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Mật khẩu mới</Label>
            <Input
              control={control}
              name="password"
              type="password"
              placeholder="Nhập mật khẩu của bạn"
            ></Input>
          </Field>
          <Field>
            <Label>Xác nhận mật khẩu</Label>
            <Input
              control={control}
              name="confirmPassword"
              type="password"
              placeholder="Nhập mật khẩu xác nhận của bạn"
            ></Input>
          </Field>
        </div>
        <Button kind="primary" className="mx-auto w-[200px]">
          Cập nhật
        </Button>
      </form>
    </div>
  );
};

export default UserProfile;

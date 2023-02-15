import React from "react";
import { useForm } from "react-hook-form";
import DashboardHeading from "../dashboard/DashboardHeading";
import { Field, FieldCheckBox } from "../../components/field";
import { Label } from "../../components/label";
import { Input } from "../../components/input";
import Radio from "../../components/checkbox/Radio";
import { Button } from "../../components/button";

const UserAddNew = () => {
  const { control } = useForm({
    mode: "onChange",
  });
  return (
    <div>
      <DashboardHeading
        title="Tài khoản"
        desc="Thêm tài khoản mới vào hệ thống"
      ></DashboardHeading>
      <form>
        <div className="form-layout">
          <Field>
            <Label>Họ và tên</Label>
            <Input
              name="fullname"
              control={control}
              placeholder="Nhập họ và tên của bạn"
            ></Input>
          </Field>
          <Field>
            <Label>Tên người dùng</Label>
            <Input
              name="username"
              control={control}
              placeholder="Nhập tên người dùng của bạn"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <Input
              name="email"
              control={control}
              placeholder="Nhập email của bạn"
            ></Input>
          </Field>
          <Field>
            <Label>Mật khẩu</Label>
            <Input
              name="password"
              control={control}
              placeholder="Nhập mật khẩu của bạn"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Trạng thái</Label>
            <FieldCheckBox>
              <Radio name="status" control={control}>
                Active
              </Radio>
              <Radio name="status" control={control}>
                Pending
              </Radio>
              <Radio name="status" control={control}>
                Banned
              </Radio>
            </FieldCheckBox>
          </Field>
          <Field>
            <Label>Vai trò</Label>
            <FieldCheckBox>
              <Radio name="role" control={control}>
                Admin
              </Radio>
              <Radio name="role" control={control}>
                Moderate
              </Radio>
              <Radio name="role" control={control}>
                Editor
              </Radio>
              <Radio name="role" control={control}>
                User
              </Radio>
            </FieldCheckBox>
          </Field>
        </div>
        <Button kind="primary" className="mx-auto w-[200px]">
          Thêm mới
        </Button>
      </form>
    </div>
  );
};

export default UserAddNew;

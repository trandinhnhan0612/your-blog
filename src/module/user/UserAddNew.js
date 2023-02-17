import React from "react";
import { useForm } from "react-hook-form";
import DashboardHeading from "../dashboard/DashboardHeading";
import { Field, FieldCheckBox } from "../../components/field";
import { Label } from "../../components/label";
import { Input } from "../../components/input";
import Radio from "../../components/checkbox/Radio";
import { Button } from "../../components/button";
import ImageUpload from "../../components/image/ImageUpload";
import { userRole, userStatus } from "../../utils/constants";
import useFirbaseImage from "../../hooks/useFirebaseImage";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase-data/firebase-config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import slugify from "slugify";
import { toast } from "react-toastify";

const UserAddNew = () => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    getValues,
    reset,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      username: "",
      avatar: "",
      status: userStatus.ACTIVE,
      role: userRole.USER,
      createdAt: new Date(),
    },
  });
  const handleAddUser = async (values) => {
    if (!isValid) return;
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      await addDoc(collection(db, "users"), {
        fullname: values.fullname,
        email: values.email,
        password: values.password,
        username: slugify(values.username || values.fullname, {
          lower: true,
          replacement: " ",
          trim: true,
        }),
        avatar: image,
        status: Number(values.status),
        role: Number(values.role),
        createdAt: serverTimestamp(),
      });
      toast.success(`Thêm người dùng với email: ${values.email} thành công!`);
      reset({
        fullname: "",
        email: "",
        password: "",
        username: "",
        avatar: "",
        status: userStatus.ACTIVE,
        role: userRole.USER,
        createdAt: new Date(),
      });
      handleResetUpload();
    } catch (error) {
      console.log(error);
      toast.error("Không thể thêm mới tài khoản!");
    }
  };
  const watchStatus = watch("status");
  const watchRole = watch("role");
  const {
    image,
    handleResetUpload,
    progress,
    handleSelectImage,
    handleDeleteImage,
  } = useFirbaseImage(setValue, getValues);
  return (
    <div>
      <DashboardHeading
        title="Tài khoản"
        desc="Thêm tài khoản mới vào hệ thống"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleAddUser)}>
        <div className="w-[200px] h-[200px] rounded-full mx-auto mb-6">
          <ImageUpload
            className="!rounded-full h-full"
            image={image}
            onChange={handleSelectImage}
            // onChange here is ...rest in ImageUpload
            handleDeleteImage={handleDeleteImage}
            progress={progress}
          ></ImageUpload>
        </div>
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
              type="email"
              name="email"
              control={control}
              placeholder="Nhập email của bạn"
            ></Input>
          </Field>
          <Field>
            <Label>Mật khẩu</Label>
            <Input
              type="password"
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
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.ACTIVE}
                value={userStatus.ACTIVE}
              >
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.PENDING}
                value={userStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.BAN}
                value={userStatus.BAN}
              >
                Banned
              </Radio>
            </FieldCheckBox>
          </Field>
          <Field>
            <Label>Vai trò</Label>
            <FieldCheckBox>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.ADMIN}
                value={userRole.ADMIN}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.MOD}
                value={userRole.MOD}
              >
                Moderator
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.USER}
                value={userRole.USER}
              >
                User
              </Radio>
            </FieldCheckBox>
          </Field>
        </div>
        <Button
          kind="primary"
          type="submit"
          className="mx-auto w-[200px]"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Thêm mới
        </Button>
      </form>
    </div>
  );
};

export default UserAddNew;

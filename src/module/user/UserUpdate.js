import { doc, getDoc, updateDoc } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../../components/button";
import Radio from "../../components/checkbox/Radio";
import { Field, FieldCheckBox } from "../../components/field";
import ImageUpload from "../../components/image/ImageUpload";
import { Input } from "../../components/input";
import { Label } from "../../components/label";
import { db } from "../../firebase-data/firebase-config";
import { userRole, userStatus } from "../../utils/constants";
import DashboardHeading from "../dashboard/DashboardHeading";
import useFirbaseImage from "../../hooks/useFirebaseImage";
import Textarea from "../../components/textarea/Textarea";

const UserUpdate = () => {
  const {
    control,
    watch,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onchange",
  });
  const [params] = useSearchParams();
  const userId = params.get("id");
  const watchStatus = watch("status");
  const watchRole = watch("role");
  const imageUrl = getValues("avatar");
  const imageRegex = /%2F(\S+)\?/gm.exec(imageUrl);
  const imageName = imageRegex?.length > 0 ? imageRegex[1] : ""; // if have imageRegex and length > 0, we will get
  const { image, setImage, progress, handleSelectImage, handleDeleteImage } =
    useFirbaseImage(setValue, getValues, imageName, deleteAvatar);
  const handleUpdateUser = async (values) => {
    if (!isValid) return;
    try {
      const colRef = doc(db, "users", userId);
      await updateDoc(colRef, {
        ...values,
        avatar: image,
      });
      toast.success("Cập nhật tài khoản thành công");
    } catch (error) {
      console.log(error);
      toast.error("Cập nhật tài khoản không thành công");
    }
  };
  async function deleteAvatar() {
    const colRef = doc(db, "users", userId);
    await updateDoc(colRef, {
      avatar: "",
    });
  }
  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);
  useEffect(() => {
    async function fetchData() {
      if (!userId) return;
      const colRef = doc(db, "users", userId);
      const singleDoc = await getDoc(colRef);
      reset(singleDoc && singleDoc.data());
    }
    fetchData();
  }, [userId, reset]);
  if (!userId) return null;
  return (
    <div>
      <DashboardHeading
        title="Thông tin tài khoản"
        desc="Cập nhật thông tin tài khoản của bạn"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateUser)}>
        <div className="w-[200px] h-[200px] rounded-full mx-auto mb-6">
          <ImageUpload
            className="!rounded-full h-full"
            image={image} // if image have not, we will get imageUrl
            onChange={handleSelectImage}
            progress={progress}
            handleDeleteImage={handleDeleteImage}
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
            <Label>Tên người đùng</Label>
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
        <div className="form-layout">
          <Field>
            <Label>Mô tả về bạn</Label>
            <Textarea name="description" control={control}></Textarea>
          </Field>
        </div>
        <Button
          kind="primary"
          type="submit"
          className="mx-auto w-[200px]"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Cập nhật
        </Button>
      </form>
    </div>
  );
};

export default UserUpdate;

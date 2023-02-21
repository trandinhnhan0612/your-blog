import React, { useEffect } from "react";
import { Input } from "../components/input";
import { Label } from "../components/label";
import { useForm } from "react-hook-form";
import { Field } from "../components/field";
import { Button } from "../components/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase-data/firebase-config";
import { NavLink, useNavigate } from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import AuthPage from "./AuthPage";
import InputPassword from "../components/input/InputPassword";
import slugify from "slugify";
import { userStatus, userRole } from "../utils/constants";

const schema = yup.object({
  fullname: yup.string().required("Vui lòng nhập họ và tên của bạn"),
  email: yup
    .string()
    .email("Vui lòng nhập địa chỉ email hợp lệ")
    .required("Vui lòng nhập địa chỉ email"),
  password: yup
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 kí tự")
    .required("Vui lòng nhập mật khẩu"),
});

const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const handleSignUp = async (values) => {
    // value here is fullname, email, password
    if (!isValid) return;
    const user = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    await updateProfile(auth.currentUser, {
      displayName: values.fullname,
      photoURL:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    });
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      // auth.currentUser.uid here in order to get userId , then display name when we add new post of userId
      // setDoc is set id with hand, addDoc is set id auto
      fullname: values.fullname,
      email: values.email,
      password: values.password,
      username: slugify(values.fullname, { lower: true }),
      avatar:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      status: userStatus.ACTIVE,
      role: userRole.USER,
      createdAt: serverTimestamp(),
    });
    // const colRef = collection(db, "users");
    // await addDoc(colRef, {
    //   fullname: values.fullname,
    //   email: values.email,
    //   password: values.password,
    // });
    toast.success("Đăng kí thành công!");
    navigate("/");
  };
  useEffect(() => {
    const arrError = Object.values(errors);
    if (arrError.length > 0) {
      toast.error(arrError[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);
  useEffect(() => {
    document.title = "Sign up Page";
  });
  return (
    <AuthPage>
      <form
        className="form"
        onSubmit={handleSubmit(handleSignUp)}
        autoComplete="off"
      >
        <Field>
          <Label htmlFor="fullname">Họ và tên</Label>
          <Input
            type="text"
            name="fullname"
            placeholder="Nhập họ và tên của bạn"
            control={control}
          />
        </Field>
        <Field>
          <Label htmlFor="email">Địa chỉ Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="Nhập địa chỉ email của bạn"
            control={control}
          />
        </Field>
        <Field>
          <Label htmlFor="password">Mật khẩu</Label>
          <InputPassword control={control}></InputPassword>
        </Field>
        <div className="have-account">
          Bạn đã có tài khoản rồi?{" "}
          <NavLink to={"/sign-in"}>Đăng nhập ngay</NavLink>
        </div>
        <Button
          type="submit"
          className="w-full max-w-[300px] max-md:w-[200px] mx-auto"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Đăng Kí
        </Button>
      </form>
    </AuthPage>
  );
};

export default SignUpPage;

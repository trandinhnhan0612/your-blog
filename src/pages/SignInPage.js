import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import { Field } from "../components/field";
import { Input } from "../components/input";
import { Label } from "../components/label";
import { useAuth } from "../contexts/auth-context";
import AuthPage from "./AuthPage";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-data/firebase-config";
import InputPassword from "../components/input/InputPassword";

const schema = yup.object({
  email: yup
    .string()
    .email("Vui lòng nhập địa chỉ email hợp lệ")
    .required("Vui lòng nhập địa chỉ email"),
  password: yup
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 kí tự")
    .required("Vui lòng nhập mật khẩu"),
});
const SignInPage = () => {
  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    const arrError = Object.values(errors);
    if (arrError.length > 0) {
      toast.error(arrError[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);
  const { userInfor } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Login Page";
    if (userInfor?.email) navigate("/");
    // if has userInfor and userInfor.email, you will go to homepage
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfor]);
  const handleSignIn = async (values) => {
    if (!isValid) return;
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      navigate("/");
    } catch (error) {
      if (error.message.includes("Sai mật khẩu"))
        toast.error("Có vẻ như mật khẩu của bạn đã sai");
    }
  };
  return (
    <AuthPage>
      <form
        className="form"
        onSubmit={handleSubmit(handleSignIn)}
        autoComplete="off"
      >
        <Field>
          <Label htmlFor="email">Địa chỉ Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="Nhập địa chỉ email của bạn"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="password">Mật khẩu</Label>
          <InputPassword control={control}></InputPassword>
        </Field>
        <div className="have-account">
          Bạn chưa có tài khoản? <NavLink to={"/sign-up"}>Đăng kí ngay</NavLink>{" "}
        </div>
        <Button
          type="submit"
          className="w-full max-w-[300px] mx-auto"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Đăng Nhập
        </Button>
      </form>
    </AuthPage>
  );
};

export default SignInPage;

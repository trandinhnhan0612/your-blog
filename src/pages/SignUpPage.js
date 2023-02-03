import React, { useEffect } from "react";
import styled from "styled-components";
import { Input } from "../components/input";
import { Label } from "../components/label";
import { useForm } from "react-hook-form";
import { IconEyeClose, IconEyeOpen } from "../components/icon";
import { Field } from "../components/field";
import { useState } from "react";
import { Button } from "../components/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loading } from "../components/loading";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase-data/firebase-config";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";

const SignUpPageStyles = styled.div`
  min-height: 100vh;
  padding: 40px;
  .logo {
    margin: 0 auto;
  }
  .heading {
    text-align: center;
    color: transparent;
    background-image: linear-gradient(
      to right bottom,
      ${(props) => props.theme.greenLight},
      ${(props) => props.theme.blueLight}
    );
    -webkit-background-clip: text;
    background-clip: text;
    font-weight: bold;
    font-size: 46px;
    margin-bottom: 60px;
  }
  .form {
    max-width: 600px;
    margin: 0 auto;
  }
`;

const schema = yup.object({
  fullname: yup.string().required("Please enter your fullname"),
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Please enter your email address"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters or greater")
    .required("Please enter your password"),
});

const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const handleSignUp = async (values) => {
    // value ở đây là fullname, email, password
    if (!isValid) return;
    const user = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    await updateProfile(auth.currentUser, {
      displayName: values.fullname,
    });
    const colRef = collection(db, "users");
    addDoc(colRef, {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
    });
    toast.success("Register successfully!");
    navigate("/");
  };
  const [togglePassword, setTogglePassword] = useState(false);
  useEffect(() => {
    const arrError = Object.values(errors);
    if (arrError.length > 0) {
      toast.error(arrError[0]?.message, {
        pauseOnHover: false,
      });
    }
  }, [errors]);
  return (
    <SignUpPageStyles>
      <div className="container">
        <img srcSet="/logo2.png 2x" alt="your-blog" className="logo" />
        <h1 className="heading">Your Blogger</h1>
        {/* <h2 className="sologan">Đăng nội dung thể hiện niềm đam mê của bạn</h2> */}
        <form
          className="form"
          onSubmit={handleSubmit(handleSignUp)}
          autoComplete="off"
        >
          <Field>
            <Label htmlFor="fullname">FullName</Label>
            <Input
              type="text"
              name="fullname"
              placeholder="Enter your full name"
              control={control}
            />
          </Field>
          <Field>
            <Label htmlFor="email">Email Address</Label>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              control={control}
            />
          </Field>
          <Field>
            <Label htmlFor="password">Password</Label>
            <Input
              type={togglePassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              control={control}
            >
              {!togglePassword ? (
                <IconEyeClose
                  onClick={() => setTogglePassword(true)}
                ></IconEyeClose>
              ) : (
                <IconEyeOpen
                  onClick={() => setTogglePassword(false)}
                ></IconEyeOpen>
              )}
            </Input>
          </Field>
          <Button
            type="submit"
            style={{
              maxWidth: 300,
              margin: "0 auto",
            }}
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </SignUpPageStyles>
  );
};

export default SignUpPage;

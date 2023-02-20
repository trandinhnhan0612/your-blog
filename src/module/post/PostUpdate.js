import React from "react";
import { useForm } from "react-hook-form";
import Label from "../../components/label/Label";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import Radio from "../../components/checkbox/Radio";
import { postStatus } from "../../utils/constants";
import { ImageUpload } from "../../components/image";
import useFirbaseImage from "../../hooks/useFirebaseImage";
import Toggle from "../../components/toggle/Toggle";
import { db } from "../../firebase-data/firebase-config";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { Dropdown } from "../../components/dropdown";
import { useAuth } from "../../contexts/auth-context";
import { toast } from "react-toastify";
import DashboardHeading from "../dashboard/DashboardHeading";
import { Field, FieldCheckBox } from "../../components/field";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { async } from "@firebase/util";

const PostUpdate = () => {
  const [params] = useSearchParams();
  const postId = params.get("id");
  const [selectCategory, setSelectCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const watchHot = watch("hot");
  const watchStatus = watch("status");
  const imageUrl = getValues("image");
  const imageName = getValues("image_name"); // if have imageRegex and length > 0, we will get
  const { image, setImage, progress, handleSelectImage, handleDeleteImage } =
    useFirbaseImage(setValue, getValues, imageName, deletePostImage);
  async function deletePostImage() {
    const colRef = doc(db, "posts", postId);
    await updateDoc(colRef, {
      avatar: "",
    });
  }
  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);
  useEffect(() => {
    async function fetchData() {
      if (!postId) return;
      const docRef = doc(db, "posts", postId);
      const docSnapshot = await getDoc(docRef);
      console.log(docSnapshot.data());
      if (docSnapshot.data()) {
        reset(docSnapshot.data());
        setSelectCategory(docSnapshot.data()?.category || "");
      }
    }
    fetchData();
  }, [postId, reset]);
  useEffect(() => {
    async function getCategoriesData() {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", 1));
      const querySnapshot = await getDocs(q);
      let result = [];
      querySnapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories(result);
    }
    getCategoriesData();
  }, []);
  const handleClickOption = async (item) => {
    const colRef = doc(db, "categories", item.id);
    const docData = await getDoc(colRef);
    setValue("category", {
      id: docData.id,
      ...docData.data(),
    });
    setSelectCategory(item);
  };
  const updatePostHandle = (values) => {
    console.log(values);
  };
  if (!postId) return null;
  return (
    <div>
      <DashboardHeading
        title="Bài viết"
        desc="Cập nhật bài viết của bạn"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(updatePostHandle)}>
        <div className="form-layout">
          <Field>
            <Label>Tiêu đề</Label>
            <Input
              control={control}
              name="title"
              placeholder="Enter your title"
            ></Input>
            <p className="text-red-500">{errors.title?.message}</p>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Hình ảnh</Label>
            <ImageUpload
              onChange={handleSelectImage}
              // onChange here is ...rest in ImageUpload
              handleDeleteImage={handleDeleteImage}
              className="h-[250px]"
              progress={progress}
              image={image}
            ></ImageUpload>
          </Field>
          <Field>
            <Label>Danh mục</Label>
            <Dropdown>
              <Dropdown.Select placeholder="Chọn danh mục"></Dropdown.Select>
              <Dropdown.List>
                {categories.length > 0 &&
                  categories.map((item) => (
                    <Dropdown.Option
                      key={item.id}
                      onClick={() => handleClickOption(item)}
                    >
                      {item.name}
                    </Dropdown.Option>
                  ))}
                {/* <Dropdown.Option>FrontEnd</Dropdown.Option> here is props.children in Option.js */}
              </Dropdown.List>
            </Dropdown>
            {selectCategory?.name && (
              <span className="inline-block p-3 rounded-lg bg-orange-50 text-sm text-orange-600 font-medium">
                {selectCategory?.name}
                {/* ?. if the right has, we will take (selectCategory.name), if have not is it's ok */}
              </span>
            )}
          </Field>
        </div>
        <div className="mb-10">content is here</div>
        <div className="form-layout">
          <Field>
            <Label>Bài viết nổi bật</Label>
            <Toggle
              on={watchHot === true}
              onClick={() => setValue("hot", !watchHot)}
            ></Toggle>
          </Field>
          <Field>
            <Label>Trạng thái</Label>
            <FieldCheckBox>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.APPROVED}
                value={postStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.PENDING}
                value={postStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.REJECTED}
                value={postStatus.REJECTED}
              >
                Reject
              </Radio>
            </FieldCheckBox>
          </Field>
        </div>
        <Button
          type="submit"
          className="mx-auto w-[200px]"
          isLoading={loading}
          disabled={loading}
        >
          Thêm mới
        </Button>
      </form>
    </div>
  );
};

export default PostUpdate;

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Label from "../../components/label/Label";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import Radio from "../../components/checkbox/Radio";
import slugify from "slugify";
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
  where,
} from "firebase/firestore";
import { Dropdown } from "../../components/dropdown";
import { useAuth } from "../../contexts/auth-context";
import { toast } from "react-toastify";
import DashboardHeading from "../dashboard/DashboardHeading";
import { Field, FieldCheckBox } from "../../components/field";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  title: yup.string().required("Tiêu đề không được để trống"),
});

const PostAddNew = () => {
  const { userInfor } = useAuth();
  // console.log(userInfor);
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      category: {},
      hot: false,
      image: "",
      user: {},
    },
  });
  const watchStatus = watch("status");
  const watchHot = watch("hot");
  const {
    image,
    handleResetUpload,
    progress,
    handleSelectImage,
    handleDeleteImage,
  } = useFirbaseImage(setValue, getValues);
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchDataUser() {
      if (!userInfor.email) return;
      const q = query(
        collection(db, "users"),
        where("email", "==", userInfor.email)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setValue("user", {
          id: doc.id,
          ...doc.data(),
        });
      });
    }
    fetchDataUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfor.email]);
  const addPostHandle = async (values) => {
    try {
      setLoading(true);
      const cloneValues = { ...values };
      cloneValues.slug = slugify(values.slug || values.title, { lower: true });
      cloneValues.status = Number(values.status);
      const colRef = collection(db, "posts");
      console.log(cloneValues);
      await addDoc(colRef, {
        ...cloneValues,
        categoryId: cloneValues.category.id,
        userId: cloneValues.user.id,
        image,
        createdAt: serverTimestamp(),
        // ...cloneValues here is:  title: cloneValues.title, slug: cloneValues.slug, hot: cloneValues.hot, status: cloneValues.status, categoryId: cloneValues.categoryId,
      });
      toast.success("Thêm bài viết thành công!");
      reset({
        title: "",
        slug: "",
        status: 2,
        category: {},
        hot: false,
        image: "",
        user: {},
      });
      handleResetUpload();
      setSelectCategory({});
      console.log(cloneValues); // check value what include to put in db
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    async function getData() {
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
    getData();
  }, []);
  useEffect(() => {
    document.title = "Your Blog - Add new post";
  });
  const handleClickOption = async (item) => {
    const colRef = doc(db, "categories", item.id);
    const docData = await getDoc(colRef);
    setValue("category", {
      id: docData.id,
      ...docData.data(),
    });
    setSelectCategory(item);
  };

  return (
    <>
      <DashboardHeading
        title="Thêm bài viết mới"
        desc="Thêm bài viết mới thể hiện niềm đam mê của bạn"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(addPostHandle)}>
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
              <Dropdown.Select
                // placeholder={`${selectCategory.name || "Select the category"}`}
                placeholder="Chọn danh mục"
              ></Dropdown.Select>
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
    </>
  );
};

export default PostAddNew;

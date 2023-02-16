import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import DashboardHeading from "../dashboard/DashboardHeading";
import { Field, FieldCheckBox } from "../../components/field";
import { Label } from "../../components/label";
import { Input } from "../../components/input";
import Radio from "../../components/checkbox/Radio";
import { categoryStatus } from "../../utils/constants";
import { Button } from "../../components/button";
import { useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-data/firebase-config";
import slugify from "slugify";
import { toast } from "react-toastify";

const CategoryUpdate = () => {
  const {
    control,
    watch,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: 1,
      createdAt: new Date(),
    },
  });
  const [params] = useSearchParams();
  const watchStatus = watch("status");
  const categoryId = params.get("id");
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "categories", categoryId);
      const singleDoc = await getDoc(colRef);
      reset(singleDoc.data());
      // reset in order to reset defaultValue to signleDoc
    }
    fetchData();
  }, [categoryId, reset]);
  const handleUpdateCategory = async (values) => {
    const colRef = doc(db, "categories", categoryId);
    await updateDoc(colRef, {
      name: values.name,
      slug: slugify(values.slug || values.name, { lower: true }),
      status: Number(values.status),
    });
    toast.success("Cập nhật danh mục thành công!");
    navigate("/manage/category");
  };
  if (!categoryId) return null;
  return (
    <div>
      <DashboardHeading
        title="Danh mục"
        // desc={`Cập nhật danh mục id: ${categoryId}`}
        desc="Cập nhật danh mục"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateCategory)} autoComplete="off">
        <div className="form-layout">
          <Field>
            <Label>Tên danh mục</Label>
            <Input
              control={control}
              name="name"
              placeholder="Nhập tên danh mục"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Nhập slug"
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
                checked={Number(watchStatus) === categoryStatus.APPROVED}
                value={categoryStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.UNAPPROVED}
                value={categoryStatus.UNAPPROVED}
              >
                Unapproved
              </Radio>
            </FieldCheckBox>
          </Field>
        </div>
        <Button
          kind="primary"
          className="mx-auto w-[200px]"
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Cập Nhật
        </Button>
      </form>
    </div>
  );
};

export default CategoryUpdate;

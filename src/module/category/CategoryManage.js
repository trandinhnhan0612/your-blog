import React, { useEffect } from "react";
import DashboardHeading from "../dashboard/DashboardHeading";
import { Button } from "../../components/button";
import { Table } from "../../components/table";
import { LabelStatus } from "../../components/label";
import { ActionView, ActionEdit, ActionDelete } from "../../components/action";
import { useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../../firebase-data/firebase-config";
import { categoryStatus } from "../../utils/constants";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

const CATEGORY_PER_PAGE = 10;

const CategoryManage = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [lastDoc, setLastDoc] = useState();
  const [total, setTotal] = useState();
  const [search, setSearch] = useState(undefined);
  const navigate = useNavigate();
  const handleLoadMoreCategory = async () => {
    const nextRef = query(
      collection(db, "categories"),
      startAfter(lastDoc || 0),
      limit(CATEGORY_PER_PAGE)
    );
    onSnapshot(nextRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategoryList([...categoryList, ...results]);
    });
    const documentSnapshots = await getDocs(nextRef);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "categories");
      // search function
      const searchRef = search
        ? query(
            colRef,
            where("name", ">=", search),
            where("name", "<=", search + "utf8")
          )
        : query(colRef, limit(CATEGORY_PER_PAGE));
      const documentSnapshots = await getDocs(searchRef);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      onSnapshot(colRef, (snapshot) => {
        setTotal(snapshot.size);
      });
      onSnapshot(searchRef, (snapshot) => {
        // onSnapshot is realtime, meaning when we delete, it will delete in db and update immediately in ui
        let results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setCategoryList(results);
      });
      setLastDoc(lastVisible);
    }
    fetchData();
  }, [search]);
  const handleInputSearch = debounce((e) => {
    setSearch(e.target.value);
  }, 500);
  // Delete function
  const handleDeleteCategory = async (docId) => {
    // console.log(docId); //check get id
    const colRef = doc(db, "categories", docId);
    Swal.fire({
      title: "Bạn muốn xóa danh mục này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(colRef);
        Swal.fire("Xóa thành công!", "Danh mục này đã được xóa", "success");
      }
    });
  };
  return (
    <div>
      <DashboardHeading title="Danh mục" desc="Quản lý danh mục">
        <Button to="/manage/add-category" kind="ghost" height="52px">
          Thêm danh mục mới
        </Button>
      </DashboardHeading>
      <div className="mb-6 flex justify-end">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className="py-4 px-5 border border-solid border-gray-300 rounded-lg"
          onChange={handleInputSearch}
        />
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Tên danh mục</th>
            <th>Slug</th>
            <th>Trạng thái</th>
            <th>Hoạt động</th>
          </tr>
        </thead>
        <tbody>
          {categoryList.length > 0 &&
            categoryList.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>
                  <em className="text-gray-400">{category.slug}</em>
                </td>
                <td>
                  {Number(category.status) === categoryStatus.APPROVED && (
                    <LabelStatus type="success">Approved</LabelStatus>
                  )}
                  {Number(category.status) === categoryStatus.UNAPPROVED && (
                    <LabelStatus type="warning">Unapproved</LabelStatus>
                  )}
                </td>
                <td>
                  <div className="flex gap-5 text-gray-400">
                    <ActionView></ActionView>
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/update-category?id=${category.id}`)
                      }
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() => handleDeleteCategory(category.id)}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {total > categoryList.length && (
        <div className="mt-10">
          <Button
            onClick={handleLoadMoreCategory}
            kind="ghost"
            className="mx-auto"
          >
            Tải thêm
          </Button>
          {/* {total} */}
        </div>
      )}
    </div>
  );
};

export default CategoryManage;

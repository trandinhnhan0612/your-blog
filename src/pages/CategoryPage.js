import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Heading from "../components/layout/Heading";
import Layout from "../components/layout/Layout";
import { db } from "../firebase-data/firebase-config";
import PostItem from "../module/post/PostItem";

const CategoryPage = () => {
  const [post, setPost] = useState([]);
  const params = useParams();
  useEffect(() => {
    async function fetchData() {
      const docRef = query(
        collection(db, "posts"),
        where("category.slug", "==", params.slug)
      );
      onSnapshot(docRef, (snapshot) => {
        const results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPost(results);
      });
    }
    fetchData();
  }, [params.slug]);

  if (post.length <= 0) return null;
  console.log(post);
  return (
    <Layout>
      <div className="container">
        <div className="pt-5"></div>
        <Heading>Danh mục {params.slug}</Heading>
        <div className="grid-layout grid-layout--primary">
          {post.map((item) => (
            <PostItem key={item.id} data={item}></PostItem>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;

import { collection, onSnapshot, query, where } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Heading from "../../components/layout/Heading";
import { db } from "../../firebase-data/firebase-config";
import PostItem from "./PostItem";

const PostRelated = ({ categoryId = "" }) => {
  const [post, setPost] = useState([]);
  useEffect(() => {
    const docRef = query(
      collection(db, "posts"),
      where("categoryId", "==", categoryId)
    );
    onSnapshot(docRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPost(results);
    });
  }, [categoryId]);
  if (!categoryId || post.length <= 0) return null;
  return (
    <div className="post-related">
      <Heading>Bài Viết Liên Quan</Heading>
      <div className="grid-layout grid-layout--primary">
        {post.map((item) => (
          <PostItem key={item.id} data={item}></PostItem>
        ))}
      </div>
    </div>
  );
};

export default PostRelated;

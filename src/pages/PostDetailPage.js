import React, { useEffect } from "react";
import styled from "styled-components";
import Layout from "../components/layout/Layout";
import PostImage from "../module/post/PostImage";
import PostCategory from "../module/post/PostCategory";
import PostMeta from "../module/post/PostMeta";
import PageNotFound from "../pages/PageNotFound";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase-data/firebase-config";
import parse from "html-react-parser";
import AuthorBox from "../components/author/AuthorBox";
import PostRelated from "../module/post/PostRelated";
import slugify from "slugify";

const PostDetailPageStyles = styled.div`
  padding-bottom: 100px;
  .post {
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 40px;
      margin: 40px 0;
    }
    &-feature {
      width: 100%;
      border-radius: 16px;
      max-width: 640px;
      height: 466px;
    }
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 16px;
    }
    &-info {
      flex: 1;
    }
    &-content {
      max-width: 700px;
      margin: 80px auto;
    }
  }
  .author {
    margin-top: 40px;
    margin-bottom: 80px;
    display: flex;
    border-radius: 20px;
    background-color: ${(props) => props.theme.grayF3};
    &-image {
      width: 200px;
      height: 200px;
      border-radius: inherit;
      flex-shrink: 0;
      img {
        width: 100%;
        height: 100%;
        border-radius: inherit;
        object-fit: cover;
      }
    }
    &-content {
      flex: 1;
      padding: 20px;
    }
    &-name {
      font-weight: bold;
      margin-bottom: 10px;
      font-size: 20px;
    }
    &-desc {
      font-size: 14px;
      line-height: 2;
    }
  }
  @media screen and (max-width: 1023.98px) {
    padding-bottom: 40px;
    .post {
      &-header {
        flex-direction: column;
      }
      &-feature {
        height: auto;
      }
      &-heading {
        font-size: 26px;
      }
      &-content {
        margin: 40px 0;
      }
    }
    .author {
      flex-direction: column;
      &-image {
        width: 100%;
        height: auto;
      }
    }
  }
`;

const PostDetailPage = () => {
  const { slug } = useParams();
  const [postInfor, setPostInfor] = useState({});
  useEffect(() => {
    async function fetchData() {
      if (!slug) return;
      const colRef = query(collection(db, "posts"), where("slug", "==", slug));
      onSnapshot(colRef, (snapshot) => {
        snapshot.forEach((doc) => {
          doc.data() && setPostInfor(doc.data());
        });
      });
    }
    fetchData();
  }, [slug]);
  useEffect(() => {
    // window.scroll(0, 0); // when click in post related, it will move up
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [slug]); // [slug] when slug change, it will move up
  const date = postInfor?.createdAt?.seconds
    ? new Date(postInfor?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  if (!slug) return <PageNotFound></PageNotFound>;
  if (!postInfor.title) return null;
  const { user } = postInfor; // destructuring
  return (
    <PostDetailPageStyles>
      <Layout>
        <div className="container">
          <div className="post-header">
            <PostImage
              url={postInfor.image}
              className="post-feature"
            ></PostImage>
            <div className="post-info">
              <PostCategory to={postInfor.category?.slug}>
                {postInfor.category?.name}
              </PostCategory>
              <h1 className="post-heading">{postInfor.title}</h1>
              <PostMeta
                to={slugify(postInfor.user?.fullname || "", { lower: true })}
                auhthorName={postInfor.user?.fullname}
                date={formatDate}
              ></PostMeta>
            </div>
          </div>
          <div className="post-content">
            <div className="entry-content">
              {parse(postInfor.content || "")}
            </div>
            <AuthorBox userId={user.id}></AuthorBox>
          </div>
          <PostRelated categoryId={postInfor?.categoryId}></PostRelated>
        </div>
      </Layout>
    </PostDetailPageStyles>
  );
};

export default PostDetailPage;

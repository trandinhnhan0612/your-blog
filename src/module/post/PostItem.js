import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";

const PostItemStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .post {
    &-image {
      height: 202px;
      margin-bottom: 20px;
      display: block;
      width: 100%;
      border-radius: 16px;
    }
    &-category {
      margin-bottom: 10px;
    }
    &-title {
      margin-bottom: 10px;
    }
  }
`;
const PostItem = () => {
  return (
    <PostItemStyles>
      <PostImage
        url="https://images.unsplash.com/photo-1570993492881-25240ce854f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2290&q=80"
        alt=""
        className="post-image"
        to="/"
      ></PostImage>
      <PostCategory className="post-category">ReactJS</PostCategory>
      <PostTitle className="post-title">
        Hướng dẫn học ReactJs từ cơ bản tới nâng cao cho người mới bắt đầu
      </PostTitle>
      <PostMeta></PostMeta>
    </PostItemStyles>
  );
};

export default PostItem;

import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";

const PostNewLargerStyles = styled.div`
  .post {
    &-image {
      display: block;
      margin-bottom: 20px;
      height: 433px;
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

const PostNewestLarge = () => {
  return (
    <PostNewLargerStyles>
      <PostImage
        url="https://images.unsplash.com/photo-1510519138101-570d1dca3d66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2294&q=80"
        alt=""
        className="post-image"
        to="/"
      ></PostImage>
      <PostCategory className="post-category">ReactJS</PostCategory>
      <PostTitle size="big" className="post-title">
        Hướng dẫn redux từ cơ bản tới nâng cao cho người mới bắt đầu
      </PostTitle>
      <PostMeta></PostMeta>
    </PostNewLargerStyles>
  );
};

export default PostNewestLarge;

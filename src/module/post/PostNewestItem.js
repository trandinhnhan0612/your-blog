import React from "react";
import slugify from "slugify";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";

const PostNewItemStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid #ccc;
  &:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: 0;
  }
  .post {
    &-image {
      display: block;
      flex-shrink: 0;
      width: 180px;
      height: 130px;
      border-radius: 12px;
    }
    &-category {
      margin-bottom: 8px;
    }
    &-title {
      margin-bottom: 8px;
    }
  }
`;

const PostNewestItem = ({ data }) => {
  if (!data.id) return null;
  const date = data?.createdAt?.seconds
    ? new Date(data?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  return (
    <PostNewItemStyles>
      <PostImage
        url={data?.image}
        alt=""
        className="post-image"
        to={data?.slug}
      ></PostImage>
      <div className="post-content">
        <PostCategory
          className="post-category"
          type="secondary"
          to={data?.category?.slug}
        >
          {data?.category?.name}
        </PostCategory>
        <PostTitle className="post-title" to={data?.slug}>
          {data?.title}
        </PostTitle>
        <PostMeta
          to={slugify(data?.user?.username || "", { lower: true })}
          auhthorName={data?.user?.fullname}
          date={formatDate}
        ></PostMeta>
      </div>
    </PostNewItemStyles>
  );
};

export default PostNewestItem;

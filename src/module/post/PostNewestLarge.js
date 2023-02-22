import React from "react";
import slugify from "slugify";
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

const PostNewestLarge = ({ data }) => {
  if (!data.id) return null;
  const date = data?.createdAt?.seconds
    ? new Date(data?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  return (
    <PostNewLargerStyles>
      <PostImage
        url={data?.image}
        alt=""
        className="post-image"
        to={data?.slug}
      ></PostImage>
      <PostCategory className="post-category" to={data?.category?.slug}>
        {data?.category?.name}
      </PostCategory>
      <PostTitle size="big" className="post-title" to={data?.slug}>
        {data?.title}
      </PostTitle>
      <PostMeta
        to={slugify(data?.user?.username || "", { lower: true })}
        auhthorName={data?.user?.fullname}
        date={formatDate}
      ></PostMeta>
    </PostNewLargerStyles>
  );
};

export default PostNewestLarge;

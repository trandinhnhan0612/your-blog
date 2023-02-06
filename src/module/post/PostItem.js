import React from "react";
import styled from "styled-components";

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
      img {
        width: 100%;
        height: 100%;
        border-radius: 16px;
        object-fit: cover;
      }
    }
    &-category {
      display: inline-block;
      font-size: 14px;
      font-weight: 600;
      background-color: #f3edff;
      color: currentColor;
      margin-bottom: 12px;
      border-radius: 8px;
      padding: 8px;
    }
    &-title {
      font-size: 18px;
      font-weight: bold;
      line-height: 1.5;
      display: block;
      margin-bottom: 8px;
    }
    &-info {
      display: flex;
      gap: 12px;
      font-size: 14px;
      align-items: center;
      font-weight: 600;
      color: #6b6b6b;
      margin-top: auto;
    }
    &-dot {
      display: inline-block;
      width: 4px;
      height: 4px;
      background-color: currentColor;
      border-radius: 100rem;
    }
  }
`;
const PostItem = () => {
  return (
    <PostItemStyles>
      <div className="post-image">
        <img
          src="https://images.unsplash.com/photo-1570993492881-25240ce854f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2290&q=80"
          alt=""
        />
      </div>
      <div className="post-category">Kiến Thức</div>
      <div className="post-title">Hướng dẫn thiết kế phòng cực chill</div>
      <div className="post-info">
        <span className="post-time">March 3</span>
        <span className="post-dot"></span>
        <span className="post-author">Như Ý</span>
      </div>
    </PostItemStyles>
  );
};

export default PostItem;

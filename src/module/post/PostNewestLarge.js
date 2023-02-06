import React from "react";
import styled from "styled-components";

const PostNewLargerStyles = styled.div`
  .post {
    &-image {
      display: block;
      margin-bottom: 16px;
      height: 433px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 16px;
      }
    }
    &-category {
      display: inline-block;
      padding: 8px 12px;
      border-radius: 8px;
      color: #6b6b6b;
      background-color: #f3edff;
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 12px;
    }
    &-title {
      display: block;
      font-size: 22px;
      font-weight: 600;
      line-height: 1.5;
      margin-bottom: 12px;
    }
    &-info {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 14px;
      font-weight: 600;
      margin-left: auto;
    }
    &-dot {
      display: inline-block;
      width: 4px;
      height: 4px;
      border-radius: 100rem;
      background-color: currentColor;
    }
  }
`;

const PostNewestLarge = () => {
  return (
    <PostNewLargerStyles>
      <div className="post-image">
        <img
          src="https://images.unsplash.com/photo-1510519138101-570d1dca3d66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2294&q=80"
          alt=""
        />
      </div>
      <div className="post-category">Kiến Thức</div>
      <h3 className="post-title">Hướng dẫn setup phòng dành cho dân Blogger</h3>
      <div className="post-info">
        <span className="post-time">March 3</span>
        <span className="post-dot"></span>
        <span className="post-author">Như Ý</span>
      </div>
    </PostNewLargerStyles>
  );
};

export default PostNewestLarge;

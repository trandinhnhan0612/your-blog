import React from "react";
import styled from "styled-components";
import Button from "../../components/button/Button";

const HomeBannerStyles = styled.div`
  min-height: 520px;
  padding: 40px 0;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary1},
    ${(props) => props.theme.secondary1}
  );
  margin-bottom: 50px;
  .banner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-content {
      max-width: 600px;
      color: white;
    }
    &-heading {
      font-size: 36px;
      margin-bottom: 20px;
      font-weight: bold;
    }
    &-desc {
      line-height: 1.75;
      margin-bottom: 30px;
      font-size: 18px;
    }
  }
  @media screen and (max-width: 1023.98px) {
    .banner {
      flex-direction: column;
      min-height: unset;
      &-heading {
        font-size: 30px;
        margin-bottom: 10px;
      }
      &-desc {
        font-size: 14px;
        margin-bottom: 20px;
      }
      &-image {
        margin-top: 25px;
      }
      &-button {
        font-size: 14px;
        height: auto;
        padding: 10px;
      }
    }
  }
`;

const HomeBanner = () => {
  return (
    <HomeBannerStyles>
      <div className="container">
        <div className="banner">
          <div className="banner-content">
            <h1 className="banner-heading">Your Blog</h1>
            <p className="banner-desc">
              Đăng nội dung thể hiện niềm đam mê theo cách của bạn. Nơi lưu giữ
              các khoảnh khắc và kỉ niệm, nơi chia sẽ các thông tin về kiến
              thức, học tập, chuyên môn,...Đăng kí ngay để bắt đầu một blogger
              mới thôi nào!
            </p>
            <Button to="/sign-up" kind="secondary">
              Bắt đầu
            </Button>
          </div>
          <div className="banner-image">
            <img srcSet="/img-banner.png" alt="banner" />
          </div>
        </div>
      </div>
    </HomeBannerStyles>
  );
};

export default HomeBanner;

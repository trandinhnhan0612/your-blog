import React from "react";
import styled from "styled-components";
import Heading from "../../components/layout/Heading";
import PostFeatureItem from "../post/PostFeatureItem";

const HomeFeatureSytles = styled.div``;

const HomeFeature = () => {
  return (
    <HomeFeatureSytles className="home-block">
      <div className="container">
        <Heading>Bài Viết Nổi Bật</Heading>
        <div className="grid-layout">
          <PostFeatureItem></PostFeatureItem>
          <PostFeatureItem></PostFeatureItem>
          <PostFeatureItem></PostFeatureItem>
        </div>
      </div>
    </HomeFeatureSytles>
  );
};

export default HomeFeature;

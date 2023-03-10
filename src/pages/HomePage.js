import { signOut } from "firebase/auth";
import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import Header from "../components/layout/Header";
import Layout from "../components/layout/Layout";
import { auth } from "../firebase-data/firebase-config";
import HomeBanner from "../module/home/HomeBanner";
import HomeFeature from "../module/home/HomeFeature";
import HomeNewest from "../module/home/HomeNewest";

const HomePageStyles = styled.div``;

const HomePage = () => {
  useEffect(() => {
    document.title = "Your Blog - Homepage";
  });
  return (
    <HomePageStyles>
      <Layout>
        <HomeBanner></HomeBanner>
        <HomeFeature></HomeFeature>
        <HomeNewest></HomeNewest>
      </Layout>
    </HomePageStyles>
  );
};

export default HomePage;

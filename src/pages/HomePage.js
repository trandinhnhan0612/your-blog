import { signOut } from "firebase/auth";
import React from "react";
import styled from "styled-components";
import Header from "../components/layout/Header";
import Layout from "../components/layout/Layout";
import { auth } from "../firebase-data/firebase-config";
import HomeBanner from "../module/home/HomeBanner";

const HomePageStyles = styled.div``;

const HomePage = () => {
  return (
    <HomePageStyles>
      <Layout>
        <HomeBanner></HomeBanner>
      </Layout>
    </HomePageStyles>
  );
};

export default HomePage;

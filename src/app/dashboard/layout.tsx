"use client";
import DashboardSideBar from "@/components/DashboardSidebar";
import Navbar from "@/components/Navbar";
import React from "react";
import styled from "styled-components";

const Root = styled.div`
  position: relative;
  display: flex;
`;

const MainContentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100vh;

  overflow-y: auto;
`;

const Content = styled.div`
  height: 100%;
  flex: 1 1 auto;
  padding: 2rem;

  background-color: var(--bg-color-primary);
`;

interface IDashboardLayout {
  children: React.ReactNode;
}
const DashboardLayout: React.FC<IDashboardLayout> = ({ children }) => {
  return (
    <Root>
      <DashboardSideBar />
      <MainContentContainer>
        <Navbar />
        <Content>{children}</Content>
      </MainContentContainer>
    </Root>
  );
};

export default DashboardLayout;

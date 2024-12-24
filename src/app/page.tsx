"use client";
import React from "react";
import { MacScrollbar } from "mac-scrollbar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Home: React.FC = () => {
  return (
    <MacScrollbar>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex-1">{/* 主要内容区域 */}</main>
        <Footer />
      </div>
    </MacScrollbar>
  );
};

export default Home;

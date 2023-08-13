"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import React, { useState } from "react";
import { NavbarContext } from "./context/NavbarContext";

import Navbar from "./(NavBar)/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stickerfinder -BETA-",
  description: "Stickerfinder -BETA-",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isNavbarVisible, setNavbarVisible] = useState(true);

  return (
    <NavbarContext.Provider value={{ isNavbarVisible, setNavbarVisible }}>
      <html lang="en">
        <body>
          {isNavbarVisible && <Navbar />}
          {children}
        </body>
      </html>
    </NavbarContext.Provider>
  );
}

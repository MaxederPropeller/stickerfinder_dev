"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Mock user data
  const user = {
    name: "John Doe",
    role: "Administrator",
    avatar: "../public/next.svg",
  };

  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="navbar">
      <Link href="/" className="ClassLink">
        <h1>Stickerfinder.ch</h1>
      </Link>
      <div className="Searchbar">
        <input type="text" placeholder="Suche" />
        <button>
          <span>
            <SearchIcon />
          </span>
        </button>
      </div>

      <button className="text-black" onClick={toggleMenu}>
        <MenuIcon />
      </button>

      <div
        ref={menuRef}
        style={{
          position: "fixed",
          top: 0,
          right: isOpen ? 0 : "-33.3333%",
          height: "100%",
          width: "33.3333%",
          backgroundColor: "white",
          color: "black",
          transition: "all 0.3s",
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                flex: "1",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <img
                src={user.avatar}
                alt="avatar"
                style={{ borderRadius: "50%", width: "100px", height: "100px" }}
              />
            </div>
            <div style={{ flex: "1" }}>
              <p>{user.name}</p>
              <p>{user.role}</p>
            </div>
          </div>
          <hr />
          <ul>
            <li style={{ display: "flex", alignItems: "center" }}>
              <AccountCircleIcon />
              {/* Ersetzen Sie diesen Teil mit dem tatsächlichen Icon-Import */}
              <Link href="/profile">Profile</Link>
            </li>
            <li style={{ display: "flex", alignItems: "center" }}>
              <TravelExploreIcon />
              {/* Ersetzen Sie diesen Teil mit dem tatsächlichen Icon-Import */}
              <Link href="/discovery">Discovery</Link>
            </li>
            <li style={{ display: "flex", alignItems: "center" }}>
              <FavoriteIcon />
              {/* Ersetzen Sie diesen Teil mit dem tatsächlichen Icon-Import */}
              <Link href="/favorites">Favorites</Link>
            </li>
          </ul>
          <div style={{ flex: "1" }} />
          <hr />
          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <li style={{ display: "flex", alignItems: "center" }}>
              <InfoIcon />

              <Link href="/about">About</Link>
            </li>
            <li style={{ display: "flex", alignItems: "center" }}>
              <SettingsIcon />

              <Link href="/settings">Settings</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

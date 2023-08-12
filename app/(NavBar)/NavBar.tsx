"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

import "./navBar.css";

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
    avatar: "https://img.freepik.com/freie-ikonen/benutzer_318-159711.jpg",
  };

  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: any) => {
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
        <h1 className="Logo">Stickerfinder.ch</h1>
      </Link>
      <div className="mobilNav">
        <div className="Searchbar">
          <input type="text" placeholder="Suche" />
        </div>

        <button className="menuButton" onClick={toggleMenu}>
          <MenuIcon />
        </button>
      </div>

      <div
        ref={menuRef}
        className={`navbar-flyout ${isOpen ? "open" : "closed"}`}
        style={{
          position: "fixed",
          top: 0,
          right: isOpen ? 0 : "-80%",
          height: "100%",
          width: "80%",
          backgroundColor: "rgba(255, 255, 255, 1)",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
          color: "black",
          transition: "all 0.3s",
          padding: "20px",
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                flex: "1",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                alignContent: "center",
                margin: " 10px 0",
              }}
            >
              <img
                src={user.avatar}
                alt="User Avatar"
                style={{
                  borderRadius: "50%",
                  width: "100px",
                  height: "100px",
                  backgroundColor: "grey",
                }}
              />
            </div>
            <div style={{ flex: "1" }}>
              <p className="UserNameMenu">{user.name}</p>
              <p className="RoleNameMenu">{user.role}</p>
            </div>
          </div>
          <hr className="SeperatorLine" />
          <ul>
            <li style={{ display: "flex", alignItems: "center" }}>
              <AccountCircleIcon />

              <Link className="ClassLink2" href="/profile">
                Profile
              </Link>
            </li>
            <li style={{ display: "flex", alignItems: "center" }}>
              <TravelExploreIcon />

              <Link className="ClassLink2" href="/">
                Home
              </Link>
            </li>
            <li style={{ display: "flex", alignItems: "center" }}>
              <FavoriteIcon />
              <Link className="ClassLink2" href="/favorites">
                Favorites
              </Link>
            </li>
          </ul>
          <div style={{ flex: "1" }} />
          <hr className="SeperatorLine" />
          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <li style={{ display: "flex", alignItems: "center" }}>
              <InfoIcon />

              <Link className="ClassLink2" href="/about">
                About
              </Link>
            </li>
            <li style={{ display: "flex", alignItems: "center" }}>
              <SettingsIcon />

              <Link className="ClassLink2" href="/settings">
                Settings
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

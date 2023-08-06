"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";

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
        <div>
          <div>
            <img src={user.avatar} alt="avatar" />
            <div>
              <p>{user.name}</p>
              <p>{user.role}</p>
            </div>
          </div>
          <hr />
          <ul>
            <li>
              <Link href="/profile">Profile</Link>
            </li>
            <li>
              <Link href="/discovery">Discovery</Link>
            </li>
            <li>
              <Link href="/favorites">Favorites</Link>
            </li>
          </ul>
          <hr />
          <ul>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/settings">Settings</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

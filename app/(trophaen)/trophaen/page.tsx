"use client";

import Link from "next/link";

import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import trophiesData from "./trophaen.json";
import "./trophaen.css";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import "leaflet/dist/leaflet.css";
import React, { useState } from "react";

export default function Trophaen({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [selectedTrophy, setSelectedTrophy] = useState(null);

  const handleClose = () => {
    setSelectedTrophy(null);
  };

  const getBorderClass = (level) => {
    switch (level) {
      case 1:
        return "bronze";
      case 2:
        return "silver";
      case 3:
        return "gold";
      case 4:
        return "platinum";
      default:
        return "";
    }
  };

  return (
    <div className="trophaenPage">
      <div className="trophaenPage__headerBox">
        <h1 className="trophaenPage__title">Trophäen</h1>
        <p className="trophaenPage__p">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
          nesciunt dolorem nulla repudiandae officia. Id consequatur tempore
          sed. Veritatis numquam ipsam impedit dolorem! Officia dignissimos amet
          totam optio adipisci alias.
        </p>
      </div>

      <div className="trophaenPage__sectionBox">
        {trophiesData.trophies.map((trophy, index) => (
          <div
            key={index}
            className="trophaenPage__sectionBox_single"
            onClick={() => setSelectedTrophy(trophy)}
          >
            <TravelExploreIcon className={getBorderClass(trophy.level)} />
            <span className="trophaenPage__sectionBox">{trophy.title}</span>
          </div>
        ))}

        <hr />
      </div>
      <Dialog
        open={selectedTrophy !== null}
        onClose={handleClose}
        className="Dialog"
      >
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle>
          <TravelExploreIcon
            className={`DialogIcon ${
              selectedTrophy ? getBorderClass(selectedTrophy.level) : ""
            }`}
          />

          {selectedTrophy?.title}
        </DialogTitle>
        <DialogContent>
          <p>{selectedTrophy?.description}</p>
          <div className="progressBar">
            {[1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`progressBar__dot ${
                  selectedTrophy?.level >= level ? "active" : ""
                }`}
              ></div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

"use client";
import React, { useState } from "react";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import trophiesData from "./trophaen.json";
import "./trophaen.css";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function Trophaen({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [selectedTrophy, setSelectedTrophy] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);

  const handleClose = () => {
    setSelectedTrophy(null);
    setSelectedLevel(null);
  };

  const getBorderClass = (level: number) => {
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
        {trophiesData.trophies.map((trophy) =>
          trophy.levels
            .filter((level) => level.active) // Filtert die Levels auf diejenigen, die "active" sind
            .map((level, index) => (
              <div
                key={index}
                className="trophaenPage__sectionBox_single"
                onClick={() => {
                  setSelectedTrophy(trophy);
                  setSelectedLevel(level);
                }}
              >
                <TravelExploreIcon className={getBorderClass(level.level)} />
                <span className="trophaenPage__sectionBox">{trophy.title}</span>
              </div>
            ))
        )}

        <hr />
      </div>
      <Dialog
        open={selectedTrophy !== null}
        onClose={handleClose}
        className="Dialog"
      >
        <IconButton
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          style={{ display: "flex", justifyContent: "flex-start" }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle>
          <TravelExploreIcon
            className={`DialogIcon ${
              selectedLevel ? getBorderClass(selectedLevel.level) : ""
            }`}
          />
          {selectedTrophy?.title}
        </DialogTitle>
        <DialogContent>
          <p>{selectedLevel?.description}</p>
          <div className="progressBar">
            {[1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`progressBar__dot ${
                  selectedLevel?.level >= level ? "active" : ""
                }`}
              ></div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

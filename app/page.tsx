"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";

import "./page.css";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const DynamicMap = dynamic(() => import("../components/(Map)/Map"), {
  ssr: false,
});

export default function Home() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="DynamicMap">
      <div className="BottomControll">
        <Fab className="AddButton" onClick={() => {}}>
          <AddIcon style={{ fill: "white" }} />
        </Fab>
      </div>
      <DynamicMap />
    </div>
  );
}

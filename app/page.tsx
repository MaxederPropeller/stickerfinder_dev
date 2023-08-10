"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";
import "./globals.css";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const DynamicMap = dynamic(() => import("../components/Map"), { ssr: false });

export default function Home() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="DynamicMap">
      <div className="BottomControll">
        <div className="BottomControllLeft">
          <FormControlLabel
            control={<Switch checked={isOn} onChange={() => setIsOn(!isOn)} />}
            label={isOn ? "An" : "Aus"}
          />
        </div>
        <div className="BottomControllRight">
          <Fab
            color="primary"
            onClick={() => {
              /* Ihre Logik hier */
            }}
          >
            <AddIcon />
          </Fab>
        </div>
      </div>
      <DynamicMap />
    </div>
  );
}

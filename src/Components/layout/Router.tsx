import React from "react";
import { Routes, Route } from "react-router-dom";

//
import { Layout } from "./Layout.jsx";
// import "./Router.scss";

// Страницы
import { Prob0 } from "../pages/Prob0";
import { Prob1 } from "../pages/Prob1";
import { Prob2 } from "../pages/Prob2";
import { AboutMe } from "../pages/AboutMe";
// НОВ.ПРОЕКТ
import { NewPro } from "../../projects/NewPro/NewPro";
// CardMemoryGameCodePen
import { MemoryCardGames } from "../../projects/MemoryCardGames/MemoryCardGames";
import { MemoryReact } from "../../projects/MemoryCardGames/src/pages/MemoryReact";
// Fifteen
import { Fifteen } from "../../projects/Fifteen/Fifteen";
import { FifteenFromEL } from "../../projects/Fifteen/src/pages/FifteenFromEL";
import { FifteenFromBM } from "../../projects/Fifteen/src/pages/FifteenFromBM";
// 2048
import { Block2048 } from "../../projects/Block2048/Block2048.jsx";
import { Block2048YT1 } from "../../projects/Block2048/src/pages/Block2048YT1.jsx";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<NewPro />} />
        <Route path="NewPro" element={<NewPro />} />
        {/* MemoryCardGames */}
        <Route path="MemoryCardGames/*" element={<MemoryCardGames />} />
        <Route path="MemoryReact" element={<MemoryReact />} />
        {/* Fifteen */}
        <Route path="Fifteen/*" element={<Fifteen />} />
        <Route path="FifteenFromEL" element={<FifteenFromEL />} />
        <Route path="FifteenFromBM" element={<FifteenFromBM />} />
        {/* Block2048 */}
        <Route path="Block2048/*" element={<Block2048 />} />
        <Route path="Block2048YT1" element={<Block2048YT1 />} />
        {/* <Route path="FifteenFromBM" element={<FifteenFromBM />} /> */}
        {/* стандарт */}
        <Route path="Prob0/*" element={<Prob0 />} />
        <Route path="Prob1" element={<Prob1 />} />
        <Route path="Prob2" element={<Prob2 />} />
        <Route path="AboutMe" element={<AboutMe />} />
      </Route>
    </Routes>
  );
}

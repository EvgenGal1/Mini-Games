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

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<NewPro />} />
        <Route path="NewPro" element={<NewPro />} />
        <Route path="MemoryCardGames/*" element={<MemoryCardGames />} />
        <Route path="MemoryReact" element={<MemoryReact />} />
        <Route path="Prob0/*" element={<Prob0 />} />
        <Route path="Prob1" element={<Prob1 />} />
        <Route path="Prob2" element={<Prob2 />} />
        <Route path="AboutMe" element={<AboutMe />} />
      </Route>
    </Routes>
  );
}

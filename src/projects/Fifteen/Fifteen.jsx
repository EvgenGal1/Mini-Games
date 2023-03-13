import React, { useState, useEffect } from "react";
import { Routes, Route, NavLink } from "react-router-dom";

import { FifteenFromEL } from "./src/pages/FifteenFromEL";
import { FifteenFromBM } from "./src/pages/FifteenFromBM";

import "./Fifteen.scss";

export const Fifteen = () => {
  return (
    <div className="Fifteen">
      <div className="Fifteen__descript">
        <ul>
          {/* Елена Литвинова */}
          <li>
            <a
              href="https://www.youtube.com/watch?v=U4E8ubLnGvI"
              target="_blank"
              rel="noreferrer"
            >
              по видео <b>Елены Литвиновой</b> (на JS)
            </a>
          </li>
          <li>
            <a href="!" target="_blank" rel="noreferrer">
              Из GitHub <b>biggieman</b> на React, Redux
            </a>
          </li>
          <li>
            <a
              href="https://www.cat-in-web.ru/pyatnashki-na-javascript-i-canvas/"
              target="_blank"
              rel="noreferrer"
            >
              Ещё один код на JS и Canvas
            </a>
          </li>
        </ul>
      </div>
      {/* <div className="Fifteen__content"></div> */}
      <hr />
      <div className="Fifteen__nav">
        <nav>
          <NavLink to="FifteenFromEL">FifteenFromEL</NavLink>
          <NavLink to="FifteenFromBM">FifteenFromBM</NavLink>
        </nav>
      </div>
      <hr />
      <div className="Fifteen__pages">
        <Routes>
          <Route path="FifteenFromEL" element={<FifteenFromEL />} />
          <Route path="FifteenFromBM" element={<FifteenFromBM />} />
        </Routes>
      </div>
    </div>
  );
};
// export {Fifteen}

import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";

import { Block2048YT1 } from "./src/pages/Block2048YT1/Block2048YT1";
import { MatSz } from "./src/pages/MatSz/MatSz.tsx";

export const Block2048 = () => {
  return (
    <div className="Block2048">
      <div className="Block2048__descript">
        <ul>
          <li>
            <a
              href="https://www.youtube.com/watch?v=Mhb910JSD4U"
              target="_blank"
              rel="noreferrer"
            >
              По видео <b>Yura Koch</b> <b>2048 на JS</b> - <b>начато</b>
            </a>
          </li>
          <li>
            <a
              href="https://habr.com/ru/company/skillfactory/blog/588356/"
              target="_blank"
              rel="noreferrer"
            >
              По блогу <b>2048 на React</b> - <b>не сделано</b>
            </a>
          </li>
          <li>
            <a
              href="https://demo.matsz.dev/2048/"
              target="_blank"
              rel="noreferrer"
            >
              По игре <b>Mat Sz</b> <b>2048 на React, Redux и TS</b> -{" "}
              <b>начато</b>
            </a>
          </li>
        </ul>
      </div>
      {/* <div className="2048__content">2048 2</div> */}
      <hr />
      <div className="Block2048__nav">
        <nav>
          <NavLink to="Block2048YT1">Block2048YT1</NavLink>
          <NavLink to="MatSz">MatSz</NavLink>
        </nav>
      </div>
      <hr />
      <div className="Block2048__pages">
        <Routes>
          <Route path="Block2048YT1" element={<Block2048YT1 />} />
          <Route path="MatSz" element={<MatSz />} />
        </Routes>
      </div>
    </div>
  );
};
// export {Block2048}

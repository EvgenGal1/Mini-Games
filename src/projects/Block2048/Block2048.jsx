import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";

import { Block2048YT1 } from "./src/pages/Block2048YT1";

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
              По видео <b>2048 на JS</b>
            </a>
          </li>
        </ul>
      </div>
      {/* <div className="2048__content">2048 2</div> */}
      <hr />
      <div className="Block2048__nav">
        <nav>
          <NavLink to="Block2048YT1">Block2048YT1</NavLink>
          {/* <NavLink to="Prob2">Prob2</NavLink> */}
        </nav>
      </div>
      <hr />
      <div className="Block2048__pages">
        <Routes>
          <Route path="Block2048YT1" element={<Block2048YT1 />} />
          {/* <Route path="Prob2" element={<Prob2 />} /> */}
        </Routes>
      </div>
    </div>
  );
};
// export {Block2048}

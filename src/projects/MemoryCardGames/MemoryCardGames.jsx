import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";

import { MemoryReact } from "./src/pages/MemoryReact";

export const MemoryCardGames = () => {
  return (
    <div className="MemoryCardGames">
      <div className="MemoryCardGames__descript">
        <ul>
          <li>
            <a href="/#" target="_blank" rel="noreferrer">
              по ресурсу <b>надо найти</b> (на JS)
            </a>
          </li>
          <li>
            <a href="/#" target="_blank" rel="noreferrer">
              посмотреть другие варианты <b>надо найти</b> (на JS, React, )
            </a>
          </li>
        </ul>
      </div>
      {/* <div className="MemoryCardGames__content">MemoryCardGames 2</div> */}
      <hr />
      <div className="MemoryCardGames__nav">
        <nav>
          <NavLink to="MemoryReact">MemoryReact</NavLink>
          {/* <NavLink to="Prob2">Prob2</NavLink> */}
        </nav>
      </div>
      <hr />
      <div className="MemoryCardGames__pages">
        <Routes>
          <Route path="MemoryReact" element={<MemoryReact />} />
          {/* <Route path="Prob2" element={<Prob2 />} /> */}
        </Routes>
      </div>
    </div>
  );
};
// export {MemoryCardGames}

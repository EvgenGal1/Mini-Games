import React, { useState } from "react";

import { ArrowAccordionFnComp } from "../../../../../Components/ui/accordion/ArrowAccordion.jsx";

import "./MatSz.scss";

// import GithubCorner from 'react-github-corner';
// import './App.scss';

import { animationDuration, gridGap } from "./config.ts";
import Banner from "./components/Banner.tsx";
import Board from "./components/Board.tsx";
import Info from "./components/Info.tsx";
import BoardSizePicker from "./components/BoardSizePicker.tsx";

export const MatSz: React.FC = () => {
  const [openArrowAccord, setOpenArrowAccord] = useState(false);
  const handleClickRef = () => {
    setOpenArrowAccord(!openArrowAccord);
  };

  return (
    <div className="MatSz accordion">
      <div className="MatSz__descript">
        <h1
          className={openArrowAccord ? "_active" : ""}
          onClick={() => {
            handleClickRef();
          }}
        >
          MatSz
        </h1>
        <div className={openArrowAccord ? "openDop" : ""}>
          <div>
            Проект на основе{" "}
            <span>
              <a
                href="https://demo.matsz.dev/2048/"
                target="_blank"
                rel="noreferrer"
              >
                По игре <b>Mat Sz</b> <b>2048 на React, Redux и TS</b>
              </a>
            </span>
          </div>
          {/* <br />
          <ol>
            <li>
              123
              <ul>
                <li>456</li>
              </ul>
            </li>
          </ol> */}
        </div>
        <ArrowAccordionFnComp
          openArrowAccord={openArrowAccord}
          setOpenArrowAccord={setOpenArrowAccord}
        />
      </div>
      <div
        // className={`MatSz__content--${openArrowAccord ? " openCont" : ""}`}
        className="MatSz__content openCont"
        style={
          {
            "--animation-duration": animationDuration + "ms",
            "--grid-gap": gridGap,
          } as any
        }
      >
        <div className="page">
          <Banner />
          <Board />
          <BoardSizePicker />
          <Info />
        </div>
      </div>
    </div>
  );
};
//export {MatSz}

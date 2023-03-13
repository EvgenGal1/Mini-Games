import React, { useState, useEffect, useLayoutEffect } from "react";

import { ArrowAccordionFnComp } from "../../../../Components/ui/accordion/ArrowAccordion.jsx";

import "./Block2048YT1.scss";

export const Block2048YT1 = () => {
  const [openArrowAccord, setOpenArrowAccord] = useState(false);
  const handleClickRef = () => {
    setOpenArrowAccord(!openArrowAccord);
  };

  return (
    <div className="Block2048YT1 accordion">
      <div className="ToDoReactIcon__descript">
        <h1
          className={openArrowAccord ? "_active" : ""}
          onClick={() => {
            handleClickRef();
          }}
        >
          Block2048YT1
        </h1>
        <div className={openArrowAccord ? "openDop" : ""}>
          <div>
            Проект на основе{" "}
            <span>
              <a
                href="https://www.youtube.com/watch?v=Mhb910JSD4U"
                target="_blank"
                rel="noreferrer"
              >
                По видео <b>2048 на JS</b>
              </a>
            </span>
          </div>
          <br />
          <ol>
            <li>
              123
              <ul>
                <li>456</li>
              </ul>
            </li>
          </ol>
        </div>
        <ArrowAccordionFnComp
          openArrowAccord={openArrowAccord}
          setOpenArrowAccord={setOpenArrowAccord}
        />
      </div>
      <div className="Block2048YT1__content openCont">
        <div id="boadr2048">
          {/* добавл ч/з js */}
          {/* <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="tile">2</div> */}
        </div>
      </div>
    </div>
  );
};
//export {Block2048YT1}

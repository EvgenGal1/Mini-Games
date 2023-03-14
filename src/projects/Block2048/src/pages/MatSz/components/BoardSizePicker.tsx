import React from "react";
import { useDispatch } from "react-redux";
import { resetAction } from "../actions/index.ts";

import { supportedBoardSizes } from "../config.ts";

const BoardSizePicker: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className="board-size-picker">
      <h2>Размер доски</h2>
      <div className="size-picker">
        {supportedBoardSizes.map((size) => (
          <button key={size} onClick={() => dispatch(resetAction(size))}>
            {size}x{size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BoardSizePicker;

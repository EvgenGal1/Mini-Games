import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { dismissAction, resetAction } from "../actions/index.ts";
import { StateType } from "../reducers/index.ts";

const Overlay: React.FC = () => {
  const dispatch = useDispatch();
  const reset = useCallback(() => dispatch(resetAction()), [dispatch]);
  const dismiss = useCallback(() => dispatch(dismissAction()), [dispatch]);

  const defeat = useSelector((state: StateType) => state.defeat);
  const victory = useSelector(
    (state: StateType) => state.victory && !state.victoryDismissed
  );

  if (victory) {
    return (
      <div className="overlay overlay-victory">
        <h1>Ты победил!</h1>
        <div className="overlay-buttons">
          <button onClick={dismiss}>Продолжать играть</button>
          <button onClick={reset}>Попробуйте еще раз</button>
        </div>
      </div>
    );
  }

  if (defeat) {
    return (
      <div className="overlay overlay-defeat">
        <h1>Игра закончена!</h1>
        <div className="overlay-buttons">
          <button onClick={reset}>Попробуйте еще раз</button>
        </div>
      </div>
    );
  }

  return null;
};

export default Overlay;

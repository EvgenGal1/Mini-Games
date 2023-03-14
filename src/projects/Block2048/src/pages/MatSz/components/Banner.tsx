import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetAction, undoAction } from "../actions/index.ts";
import { StateType } from "../reducers/index.ts";

const Banner: React.FC = () => {
  const dispatch = useDispatch();
  const reset = useCallback(() => dispatch(resetAction()), [dispatch]);
  const undo = useCallback(() => dispatch(undoAction()), [dispatch]);

  const score = useSelector((state: StateType) => state.score);
  const scoreIncrease = useSelector((state: StateType) => state.scoreIncrease);
  const moveId = useSelector((state: StateType) => state.moveId);
  const best = useSelector((state: StateType) => state.best);
  const previousBoard = useSelector((state: StateType) => state.previousBoard);

  return (
    <div className="banner">
      <div className="banner-row">
        <h1>2048</h1>
        <div className="banner-scores">
          <div className="banner-scores-score">
            <div>Счет</div>
            <div>{score}</div>
            {!!scoreIncrease && (
              <div className="banner-scores-score-increase" key={moveId}>
                +{scoreIncrease}
              </div>
            )}
          </div>
          <div className="banner-scores-score">
            <div>Лучший</div>
            <div>{best}</div>
          </div>
        </div>
      </div>
      <div className="banner-row">
        <div>
          Соедините числа и доберитесь до <b>плитки 2048!</b>
        </div>
        <div className="banner-buttons">
          <button onClick={undo} disabled={!previousBoard}>
            Отменить
          </button>
          <button onClick={reset}>Новая игра</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;

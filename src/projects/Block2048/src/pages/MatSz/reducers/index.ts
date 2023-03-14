import { Store } from "redux";

import { ActionType } from "../types/ActionType.ts";
import { ActionModel } from "../types/Models.ts";
import {
  initializeBoard,
  BoardType,
  updateBoard,
  movePossible,
} from "../functions/board.ts";
import { Direction } from "../types/Direction.ts";
import { getStoredData, setStoredData } from "../functions/localStorage.ts";
import { Animation } from "../types/Animations.ts";
import { defaultBoardSize, victoryTileValue } from "../config.ts";

export interface StateType {
  /** Размер доски.В настоящее время всегда 4. */
  boardSize: number;

  /** Текущая доска. */
  board: BoardType;

  /** Предыдущий доска. */
  previousBoard?: BoardType;

  /** Было ли найдено 2048 плиток? */
  victory: boolean;

  /** Игра окончена? */
  defeat: boolean;

  /** Если экран победы будет скрыт? */
  victoryDismissed: boolean;

  /** Текущий счет. */
  score: number;

  /** Увеличение очков после последнего обновления. */
  scoreIncrease?: number;

  /** Лучший результат. */
  best: number;

  /** Используется для определенных анимаций. В основном как значение свойства "key". */
  moveId?: string;

  /** Анимации после последнего обновления. */
  animations?: Animation[];
}

const storedData = getStoredData();

function initializeState(): StateType {
  const update = initializeBoard(defaultBoardSize);

  return {
    boardSize: storedData.boardSize || defaultBoardSize,
    board: storedData.board || update.board,
    defeat: storedData.defeat || false,
    victory: false,
    victoryDismissed: storedData.victoryDismissed || false,
    score: storedData.score || 0,
    best: storedData.best || 0,
    moveId: new Date().getTime().toString(),
  };
}

let initialState: StateType = initializeState();

export type StoreType = Store<StateType, ActionModel>;

function applicationState(state = initialState, action: ActionModel) {
  const newState = { ...state };

  switch (action.type) {
    case ActionType.RESET:
      {
        const size = action.value || newState.boardSize;
        const update = initializeBoard(size);
        newState.boardSize = size;
        newState.board = update.board;
        newState.score = 0;
        newState.animations = update.animations;
        newState.previousBoard = undefined;
        newState.victory = false;
        newState.victoryDismissed = false;
      }
      break;
    case ActionType.MOVE:
      {
        if (newState.defeat) {
          break;
        }

        const direction = action.value as Direction;
        const update = updateBoard(newState.board, direction);
        newState.previousBoard = [...newState.board];
        newState.board = update.board;
        newState.score += update.scoreIncrease;
        newState.animations = update.animations;
        newState.scoreIncrease = update.scoreIncrease;
        newState.moveId = new Date().getTime().toString();
      }
      break;
    case ActionType.UNDO:
      if (!newState.previousBoard) {
        break;
      }

      newState.board = newState.previousBoard;
      newState.previousBoard = undefined;

      if (newState.scoreIncrease) {
        newState.score -= newState.scoreIncrease;
      }
      break;
    case ActionType.DISMISS:
      newState.victoryDismissed = true;
      break;
    default:
      return state;
  }

  if (newState.score > newState.best) {
    newState.best = newState.score;
  }

  newState.defeat = !movePossible(newState.board);
  newState.victory = !!newState.board.find(
    (value) => value === victoryTileValue
  );
  setStoredData(newState);

  return newState;
}

export default applicationState;

import { BoardType } from "../functions/board";
import { ActionType } from "./ActionType";

// `модель действия`
export interface ActionModel {
  type: ActionType;
  value?: any;
}

// `модель хранения`
export interface StorageModel {
  best?: number;
  score?: number;
  board?: BoardType;
  boardSize?: number;
  defeat?: boolean;
  victoryDismissed?: boolean;
}

// `точка`
export interface Point {
  x: number;
  y: number;
}

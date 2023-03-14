import { ActionModel } from "../types/Models.ts";
import { ActionType } from "../types/ActionType.ts";
import { Direction } from "../types/Direction.ts";

export function resetAction(size = 4): ActionModel {
  return {
    type: ActionType.RESET,
    value: size,
  };
}

export function undoAction(): ActionModel {
  return {
    type: ActionType.UNDO,
  };
}

export function moveAction(direction: Direction): ActionModel {
  return {
    type: ActionType.MOVE,
    value: direction,
  };
}

export function dismissAction(): ActionModel {
  return {
    type: ActionType.DISMISS,
  };
}

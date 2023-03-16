import { ActionModel } from "../types/Models.ts";
import { ActionType } from "../types/ActionType.ts";
import { Direction } from "../types/Direction.ts";

// `сброс действия`
export function resetAction(size = 4): ActionModel {
  return {
    type: ActionType.RESET,
    value: size,
  };
}

// `отменить действие`
export function undoAction(): ActionModel {
  return {
    type: ActionType.UNDO,
  };
}

// `действие движения`
export function moveAction(direction: Direction): ActionModel {
  return {
    type: ActionType.MOVE,
    value: direction,
  };
}

// `отклонить действие`
export function dismissAction(): ActionModel {
  return {
    type: ActionType.DISMISS,
  };
}

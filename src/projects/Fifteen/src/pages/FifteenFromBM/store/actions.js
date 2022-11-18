export const ACTION_MOVE = "ACTION_MOVE";
export const ACTION_NEW_GAME = "ACTION_NEW_GAME";
export const ACTION_RESET = "ACTION_RESET";

export const doMove = (from) => {
  return {
    type: ACTION_MOVE,
    payload: from,
  };
};

export const doNewGame = () => {
  return {
    type: ACTION_NEW_GAME,
    payload: null,
  };
};

export const doReset = () => {
  return {
    type: ACTION_RESET,
    payload: null,
  };
};

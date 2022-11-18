const STORAGE_KEY = "15puzzle:state";

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState === null) {
      return;
    }

    return JSON.parse(serializedState);
  } catch (e) {
    return;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);

    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (e) {}
};

export const clearState = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {}
};

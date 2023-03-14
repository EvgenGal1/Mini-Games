import { createStore } from "redux";

import reducers, { StoreType } from "../reducers/index.ts";

const newStore = (): StoreType => createStore(reducers);
export default newStore;

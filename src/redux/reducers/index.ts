import { combineReducers } from "redux";
import sessionReducer from "./session";

const rootReducer = combineReducers({
  sessionReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export { rootReducer };

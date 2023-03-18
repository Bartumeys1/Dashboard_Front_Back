import { combineReducers } from "redux";
import BlogReducer from "./blogReducer";
import UserReducer from "./userReducer";

export const rootReducer = combineReducers({
  UserReducer,
  BlogReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

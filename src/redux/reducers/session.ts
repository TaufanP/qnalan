import { LOGIN, LOGOUT, UPDATE_PROFILE } from "../actionTypes";
import { ReduxSessionStateProps } from "../../config/types";

const initialState: ReduxSessionStateProps = {
  displayName: "",
  email: "",
  uid: "",
  photoURL: "",
};

const sessionReducer = (
  state: ReduxSessionStateProps = initialState,
  action: { type: string; payload: ReduxSessionStateProps }
): ReduxSessionStateProps => {
  switch (action.type) {
    case LOGIN:
      return { ...state, ...action.payload };

    case LOGOUT:
      return { ...state, displayName: "", email: "", uid: "", photoURL: "" };

    case UPDATE_PROFILE:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export default sessionReducer;

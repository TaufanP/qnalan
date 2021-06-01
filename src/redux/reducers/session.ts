import { LOGIN, LOGOUT } from "../actionTypes";
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

    default:
      return state;
  }
};

export default sessionReducer;

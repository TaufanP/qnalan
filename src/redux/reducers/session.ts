import { LOGIN } from "../actionTypes";
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
      return { ...action.payload };

    default:
      return state;
  }
};

export default sessionReducer;

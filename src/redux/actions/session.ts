import { LOGIN, LOGOUT } from "../actionTypes";
import { ReduxSessionStateProps } from "../../config/types";

const loggingIn = (payload: ReduxSessionStateProps) => ({
  type: LOGIN,
  payload,
});

const loggingOut = () => ({
  type: LOGOUT,
});

export { loggingIn, loggingOut };

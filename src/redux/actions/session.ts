import { LOGIN, LOGOUT, UPDATE_PROFILE } from "../actionTypes";
import { ReduxSessionStateProps } from "../../config/types";

const loggingIn = (payload: ReduxSessionStateProps) => ({
  type: LOGIN,
  payload,
});

const updateProfile = (payload: {
  uid?: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
}) => ({
  type: UPDATE_PROFILE,
  payload,
});

const loggingOut = () => ({
  type: LOGOUT,
});

export { loggingIn, loggingOut, updateProfile };

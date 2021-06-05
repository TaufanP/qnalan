import { LOGIN, LOGOUT, UPDATE_PROFILE } from "../actionTypes";
import { HobbyProps, ReduxSessionStateProps } from "../../config/types";

const loggingIn = (payload: ReduxSessionStateProps) => ({
  type: LOGIN,
  payload,
});

const updateProfile = (payload: {
  uid?: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
  hobbies?: HobbyProps[];
  gender?: number;
  dob?: string;
  batch?: string;
}) => ({
  type: UPDATE_PROFILE,
  payload,
});

const loggingOut = () => ({
  type: LOGOUT,
});

export { loggingIn, loggingOut, updateProfile };

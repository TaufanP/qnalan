import { LOGIN } from "../actionTypes";
import { ReduxSessionStateProps } from "../../config/types";

const loggingIn = (payload: ReduxSessionStateProps) => ({
  type: LOGIN,
  payload,
});

export { loggingIn };
